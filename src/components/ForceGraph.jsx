import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ForceGraph = ({ openmodal, scenario }) => {
  const svgRef = useRef(null);

  const [ratio, setRatio] = useState(0.9); // 줌in/out비율 조작
  // 초기 위치 및 이동 거리 설정
  const initialPosition = { left: 0, top: 0 };
  const moveDistance = 50;
  // StockContainer의 위치 상태
  const [position, setPosition] = useState(initialPosition);

  // zoom in/out 기능
  const wheelHandler = (e) => {
    if (ratio <= 2.5) {
      setRatio((ratio) => (ratio >= 0.7 ? ratio + 0.001 * e.deltaY : 0.7));
    } else {
      setRatio(2.5);
    }
  };
  // 키보드 이벤트 핸들러
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        setPosition((prevPosition) => ({
          ...prevPosition,
          top: prevPosition.top + moveDistance,
        }));
        break;
      case "ArrowDown":
        setPosition((prevPosition) => ({
          ...prevPosition,
          top: prevPosition.top - moveDistance,
        }));
        break;
      case "ArrowLeft":
        setPosition((prevPosition) => ({
          ...prevPosition,
          left: prevPosition.left + moveDistance,
        }));
        break;
      case "ArrowRight":
        setPosition((prevPosition) => ({
          ...prevPosition,
          left: prevPosition.left - moveDistance,
        }));
        break;
      default:
        break;
    }
  };

  // 키보드 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // [] 안에 아무 의존성도 없으므로 컴포넌트가 처음 마운트될 때만 실행

  const handleClickStory = (story_id) => {
    openmodal(story_id);
  };

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
        child_content: node.story.child_content,
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
    if (scenario && scenario.length > 0) {
      // d3.hierarchy()를 사용하기 위해 데이터 구조 변경

      const treeData = transformData(scenario, scenario[0].story.story_id); // 가장 첫번째 데이터를 시작점으로 하는 트리 생성
      console.log("treeData: ", treeData); // 결과 확인

      // Remove any existing SVG
      d3.select(svgRef.current).selectAll("*").remove();

      // 너비와 높이 설정
      const width = 1700;
      const height = 3000;
      let i = 0;

      const tree = d3.tree().nodeSize([190, 0]); //각각 노드의 수평 및 수직 크기

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
        .attr("transform", `translate(${width / 8}, ${height / 4})`); // 루트 노드 기준

      const root = d3.hierarchy(treeData[0]); // 트리구조

      update();

      // eslint 경고 무시하는 주석
      // eslint-disable-next-line no-inner-declarations
      function update() {
        const nodes = tree(root).descendants();
        const links = tree(root).links();

        nodes.forEach((d) => {
          d.y = d.depth * 300;
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
          .attr("x", -75)
          .attr("y", -75)
          .attr("width", 150)
          .attr("height", 150)
          .style("filter", "drop-shadow(3px 3px 5px #ffffffb6)")
          .on("click", (event, d) => handleClickStory(d.data.story_id)); // 클릭 이벤트 핸들러 추가

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
    <div
      className="w-full h-full overflow-hidden transition-all duration-5000"
      onWheel={wheelHandler}
    >
      <svg
        ref={svgRef}
        style={{
          position: "relative",
          top: "-400px",
          left: "-150px",
          width: `${200 / ratio}%`,
          height: `${200 / ratio}%`,
          // transition: "all 0.3s",
          transform: `translate(${position.left}px, ${position.top}px) scale(${ratio}) rotateX(20deg) rotateY(8deg) rotateZ(-8deg)`,
          // transformOrigin: "left top",
          // transform: "rotateX(20deg) rotateY(8deg) rotateZ(-8deg)",
          // perspectiveOrigin: "center",
        }}
      />
    </div>
  );
};

export default ForceGraph;
