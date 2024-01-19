import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const ForceGraph = ({ storyId }) => {
  const svgRef = useRef(null);
  const story_id = storyId;
  console.log("story_id: ", story_id);

  const [scenario, setScenario] = useState([]);

  function transformData(treeData, startNodeId) {
    const result = []; // 결과를 담을 배열
    const startNode = treeData.find(
      (node) => node.story.story_id === startNodeId
    ); // 시작 노드 찾기
    function findChildren(node) {
      // 재귀적으로 자식 노드 찾기
      const transformedNode = {
        // 자식 노드 정보를 담을 객체
        story_id: node.story.story_id,
        user_nickname: node.story.user_nickname,
        content: node.story.content,
        image_url: node.story.image_url,
        children: null, // 기본값으로 null 설정
      };
      // 자식 노드가 있는 경우 재귀적으로 호출하여 children 배열에 추가
      if (node.story.child_id && node.story.child_id.length > 0) {
        transformedNode.children = node.story.child_id.map((childId) => {
          const childNode = treeData.find(
            (child) => child.story.story_id === childId
          );
          return findChildren(childNode);
        });
      }
      return transformedNode;
    }

    const transformedStartNode = findChildren(startNode); // 시작 노드부터 재귀적으로 데이터 변환 시작
    result.push(transformedStartNode);
    return result;
  }

  useEffect(() => {
    const scenarioAPI = async () => {
      try {
        const response = await axios.get(
          `api/v1/stories/branches/${story_id}/`
        );
        console.log("response: ", response.data.data);
        if (response.data.data.length > 0) {
          setScenario(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching scenario data:", error);
      }
    };

    scenarioAPI();
  }, [story_id]);

  useEffect(() => {
    // response.data.data
    // const tempData = [
    //   {
    //     story: {
    //       user_nickname: "Kanguk",
    //       story_id: 9,
    //       content: "고양이가 질투할 때 집사에게 보이는 행동",
    //       image_url:
    //         "https://file.notion.so/f/f/3d9b9f9e-9a20-42c5-8881-7bc70c0005ba/c386bcbe-2a0f-4230-95f3-1a38b891038e/test.png?id=6da9d6ce-0947-47bd-8978-1a5a55a5c30a&table=block&spaceId=3d9b9f9e-9a20-42c5-8881-7bc70c0005ba&expirationTimestamp=1705694400000&signature=NOT8U-H34L_7PHovuMLFddCWyDTpSZAuT04_ffR9WI8&downloadName=test.png",
    //       child_id: [11, 10],
    //       child_content: ["난 알아", "그런거 몰라"],
    //     },
    //   },
    //   {
    //     story: {
    //       user_nickname: "Kanguk",
    //       story_id: 10,
    //       content: "그런거 몰라",
    //       image_url:
    //         "https://file.notion.so/f/f/3d9b9f9e-9a20-42c5-8881-7bc70c0005ba/41243535-19fe-4a17-82a4-395a1af471d8/img-WwDt3Ajgj3CqxYosdH8hPxa0.png?id=8660b3d5-3e3b-4e0d-ac97-c04558be6c10&table=block&spaceId=3d9b9f9e-9a20-42c5-8881-7bc70c0005ba&expirationTimestamp=1705694400000&signature=35Oj0mbfZM2tfLMnd3_EG4NDxAqJV1oDuopHjRYmjjg&downloadName=img-WwDt3Ajgj3CqxYosdH8hPxa0.png",
    //       child_id: [14, 12],
    //       child_content: ["10의 두번째", "대신 난 강아지가 좋아"],
    //     },
    //   },
    //   {
    //     story: {
    //       user_nickname: "Kanguk",
    //       story_id: 12,
    //       content: "대신 난 강아지가 좋아",
    //       image_url:
    //         "https://kanguk-room.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fd4100395-8284-4ec8-b3f2-7197973b39ee%2F61a0b328-10f7-41ed-8920-cc9966f17516%2FUntitled.png?table=block&id=7cfca114-ecee-41b6-94cd-b98ed034eb90&spaceId=d4100395-8284-4ec8-b3f2-7197973b39ee&width=2000&userId=&cache=v2",
    //       child_id: [13],
    //       child_content: ["강아지도 몰라"],
    //     },
    //   },
    //   {
    //     story: {
    //       user_nickname: "Kanguk",
    //       story_id: 13,
    //       content: "강아지도 몰라",
    //       image_url:
    //         "https://file.notion.so/f/f/3d9b9f9e-9a20-42c5-8881-7bc70c0005ba/5871c4d4-817a-4ce7-9071-ceb1c70de1b3/Untitled.png?id=3bdd4922-b8ee-4eaa-aa5b-9c868238e34c&table=block&spaceId=3d9b9f9e-9a20-42c5-8881-7bc70c0005ba&expirationTimestamp=1705694400000&signature=3kf064OC_5MJu5ajoxVIJSNWK5duOJFEIq8ZyawK4vc&downloadName=Untitled.png",
    //       child_id: null,
    //       child_content: null,
    //     },
    //   },
    //   {
    //     story: {
    //       user_nickname: "Kanguk",
    //       story_id: 14,
    //       content: "10의 두번째",
    //       image_url:
    //         "https://file.notion.so/f/f/3d9b9f9e-9a20-42c5-8881-7bc70c0005ba/7561f5fc-3501-432c-bdb5-1ddf045e0eaf/img-J09jTFVIkena0Y839dfHZnfQ.png?id=cd57a440-ead7-4c95-81be-6cae408c59fa&table=block&spaceId=3d9b9f9e-9a20-42c5-8881-7bc70c0005ba&expirationTimestamp=1705694400000&signature=-cvBCdjjmVC6ngRssHqfX5gtgFYSJSHaH157wlJNZZQ&downloadName=img-J09jTFVIkena0Y839dfHZnfQ.png",
    //       child_id: null,
    //       child_content: null,
    //     },
    //   },
    //   {
    //     story: {
    //       user_nickname: "Kanguk",
    //       story_id: 11,
    //       content: "난 알아",
    //       image_url:
    //         "https://file.notion.so/f/f/3d9b9f9e-9a20-42c5-8881-7bc70c0005ba/9d63bd20-dac3-41be-9379-0e39c9c3856e/test2.png?id=db4f117e-200e-47c7-a206-8808658a37aa&table=block&spaceId=3d9b9f9e-9a20-42c5-8881-7bc70c0005ba&expirationTimestamp=1705694400000&signature=KHzPhezQxveFSNoCPh1J3Em3JFOULkaUL3Ae4Lc0Dxw&downloadName=test2.png",
    //       child_id: null,
    //       child_content: null,
    //     },
    //   },
    // ];

    if (scenario && scenario.length > 0) {
      // d3.hierarchy()를 사용하기 위해 데이터 구조 변경

      const treeData = transformData(scenario, scenario[0].story.story_id); // 가장 첫번째 데이터를 시작점으로 하는 트리 생성
      console.log("test: ", treeData); // 결과 확인

      // Remove any existing SVG
      d3.select(svgRef.current).selectAll("*").remove();

      // 너비와 높이 설정
      const width = 1200;
      const height = 700;
      let i = 0;

      const tree = d3.tree().size([width, height]).nodeSize([220, 200]); //각각 노드의 수평 및 수직 크기

      const line = d3
        .line()
        .x((d) => d.y)
        .y((d) => d.x);

      // SVG 요소 생성
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 8},${height / 2.5})`); // 루트 노드 기준

      const root = d3.hierarchy(treeData[0]); // 트리구조

      update(root);

      // eslint 경고 무시하는 주석
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function update(source) {
        const nodes = tree(root).descendants();
        const links = tree(root).links();

        nodes.forEach((d) => {
          d.y = d.depth * 260;
        });

        const node = svg
          .selectAll("g.node")
          .data(nodes, (d) => d.id || (d.id = ++i));

        const nodeEnter = node
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => `translate(${d.y},${d.x})`);

        nodeEnter
          .append("image")
          .attr("xlink:href", (d) => d.data.image_url)
          .attr("x", -55)
          .attr("y", -55)
          .attr("width", 110)
          .attr("height", 110)
          .style("filter", "drop-shadow(3px 3px 5px #ffffffb6)");

        // 텍스트 넣기
        // nodeEnter
        //   .append("text")
        //   .attr("x", (d) => (d.children || d.children ? -1 : 1))
        //   .attr("dy", ".35em")
        //   .attr("text-anchor", (d) =>
        //     d.children || d.children ? "end" : "start"
        //   )
        //   .text((d) => d.data.content)
        //   .style("fill", "white");

        const link = svg.selectAll("path.link").data(links, (d) => d.target.id);

        link
          .enter()
          .insert("path", "g")
          .attr("class", "link")
          .attr("d", (d) => line([d.source, d.target]))
          .attr("stroke-width", 1)
          .style("stroke", "white");
      }
    }
  }, [scenario]);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform:
            "translate(-50%, -50%) perspective(1500px) rotateX(20deg) rotateY(5deg) rotateZ(-5deg)",
        }}
      ></svg>
    </div>
  );
};

export default ForceGraph;
