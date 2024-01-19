import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForceGraph = () => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    // 데이터 정의
    const treeData = [
      {
        "story": {
          "user_nickname": "Kanguk",
          "story_id": 9,
          "content": "고양이가 질투할 때 집사에게 보이는 행동",
          "image_url": "https://nextpage-bucket.s3.ap-northeast-2.amazonaws.com/85df3ea3-791b-4015-8fef-6910afe0c9d1.jpeg",
          "child_id": [
            11,
            10
          ],
          "child_content": [
            "난 알아",
            "그런거 몰라"
          ]
        }
      },
      {
        "story": {
          "user_nickname": "Kanguk",
          "story_id": 10,
          "content": "그런거 몰라",
          "image_url": "https://nextpage-bucket.s3.ap-northeast-2.amazonaws.com/9b93d112-d60c-4829-bf70-c90da1d7881f.jpeg",
          "child_id": [
            14,
            12
          ],
          "child_content": [
            "10의 두번째",
            "대신 난 강아지가 좋아"
          ]
        }
      },
      {
        "story": {
          "user_nickname": "Kanguk",
          "story_id": 12,
          "content": "대신 난 강아지가 좋아",
          "image_url": "https://nextpage-bucket.s3.ap-northeast-2.amazonaws.com/87f6b052-4073-45e6-973d-740cff70c725.jpeg",
          "child_id": [
            13
          ],
          "child_content": [
            "강아지도 몰라"
          ]
        }
      },
      {
        "story": {
          "user_nickname": "Kanguk",
          "story_id": 13,
          "content": "강아지도 몰라",
          "image_url": "https://nextpage-bucket.s3.ap-northeast-2.amazonaws.com/fa9db235-a9c8-4a33-9ef3-55b31b18a976.jpeg",
          "child_id": null,
          "child_content": null
        }
      },
      {
        "story": {
          "user_nickname": "Kanguk",
          "story_id": 14,
          "content": "10의 두번째",
          "image_url": "https://nextpage-bucket.s3.ap-northeast-2.amazonaws.com/504f0e89-4236-41ad-9bd6-c043d1ac8dda.jpeg",
          "child_id": null,
          "child_content": null
        }
      },
      {
        "story": {
          "user_nickname": "Kanguk",
          "story_id": 11,
          "content": "난 알아",
          "image_url": "https://nextpage-bucket.s3.ap-northeast-2.amazonaws.com/49b3f472-c298-493a-930f-93ac4ac39858.jpeg",
          "child_id": null,
          "child_content": null
        }
      }
    ];

    // 너비와 높이 설정
    const width = 800;
    const height = 700;

    // 초기 위치 설정
    treeData.forEach(d => {
      d.x = width / 2;
      d.y = height / 2;
    });

    // D3 Force Simulation 생성
    const simulation = d3
      .forceSimulation()
      .nodes(treeData)
      .force('link', d3.forceLink().id(d => d.story.story_id))
      .force('charge', d3.forceManyBody().strength(-30))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // SVG 요소 생성
    const svg = d3.select(svgRef.current)
      .attr('width', `${width}px`)
      .attr('height', `${height}px`)

    // 링크 데이터 생성
    function createLinks(treeData) {
      const linklist = [];
      treeData.forEach(node => {
        const sourceNode = node;
        const childIds = node.story.child_id || [];
        childIds.forEach(childId => {
          // 자식 노드를 찾아서 링크 생성
          const childNode = treeData.find(node => node.story.story_id === childId);
          if (childNode) {
            const link = { source: sourceNode, target: childNode };
            linklist.push(link);
          }
        });
      });
      console.log('linklist:', linklist)
      return linklist;
    }

    // 링크 생성
    const links = svg
      .selectAll('line')
      .data(createLinks(treeData))
      .enter()
      .append('line')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 3);

    // 노드 생성
    const nodes = svg
      .selectAll('image')
      .data(treeData)
      .enter()
      .append('image')
      .attr('xlink:href', d => d.story.image_url)
      .attr('width', '80px')
      .attr('height', '80px')
      .attr('x', d => d.x - 40) // 이미지의 가로 크기의 절반만큼 왼쪽으로 이동
      .attr('y', d => d.y - 40) // 이미지의 세로 크기의 절반만큼 위쪽으로 이동

    // Force Simulation 업데이트 함수 정의
    function ticked() {
      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      // 이미지의 위치를 업데이트
      nodes
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    }

    // Force Simulation에 tick 이벤트 리스너 등록
    simulation.on('tick', ticked);

    // return () => {
    //   // 컴포넌트 언마운트 시 시뮬레이션 정리
    //   simulation.stop();
    // };

  }, []);
  
  return (
    <div className='relative w-full h-full'>
      <svg ref={svgRef} style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform:
          "translate(-50%, -50%)",
      }}></svg>
    </div>);
};

export default ForceGraph;