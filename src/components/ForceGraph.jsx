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
          .append("rect") // 테두리를 나타낼 사각형을 추가
          .attr("width", 150) // 노드 이미지의 크기와 일치하는 가로 크기 설정
          .attr("height", 150) // 노드 이미지의 크기와 일치하는 세로 크기 설정
          .style("stroke", "white") // 테두리의 색상 설정
          .style("stroke-width", 10) // 테두리의 두께 설정
          .style("filter", "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))") // 테두리에 그림자 효과 추가
          .on("mouseover", handleNodeHover) // 호버 이벤트 추가
          .on("mouseout", handleNodeMouseout); // 마우스 아웃 이벤트 추가

        nodeEnter
          .append("image")
          .attr("xlink:href", (d) => d.data.image_url)
          .attr("width", 150)
          .attr("height", 150)
          .on("click", (event, d) => handleClickStory(d.data.story_id)); // 클릭 이벤트 핸들러 추가

        function handleNodeHover(event, d) {
          console.log("호버");
          d3.select(this) // 현재 호버된 노드 선택
            .select("rect") // 노드의 테두리 선택
            .style("stroke", "red"); // 테두리 색상을 빨간색으로 변경
        }

        function handleNodeMouseout(event, d) {
          d3.select(this) // 현재 마우스 아웃된 노드 선택
            .select("rect") // 노드의 테두리 선택
            .style("stroke", "white"); // 테두리 색상을 원래 색상으로 변경
        }

        const link = svg.selectAll("path.link").data(links, (d) => d.target.id);

        link
          .enter()
          .insert("path", "g")
          .attr("class", "link")
          .attr("d", (d) =>
            line([
              { x: d.source.x + 75, y: d.source.y + 75 },
              { x: d.target.x + 75, y: d.target.y + 75 },
            ])
          )
          .attr("stroke-width", 8)
          .style("stroke", "white")
          .style("stroke-dasharray", "8, 5") // dashed 스타일 설정
          .style("filter", "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))");
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
