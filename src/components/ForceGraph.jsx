import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ForceGraph = ({ openmodal, scenario }) => {
  const svgRef = useRef(null);

  const handleClickStory = (d) => {
    console.log("d: ", d);
    // console.log("d.depth: ", d.depth);
    const story_id = d.data.story_id;
    const page = d.depth + 1;
    openmodal(story_id, page);
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
      // Remove any existing SVG
      d3.select(svgRef.current).selectAll("*").remove();

      // d3.hierarchy()를 사용하기 위해 데이터 구조 변경
      const treeData = transformData(scenario, scenario[0].story.story_id); // 가장 첫번째 데이터를 시작점으로 하는 트리 생성

      // 너비와 높이 설정
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;

      // Add margins
      const margin = { top: 300, left: 500, right: 0, bottom: 0 };
      // const margin = { top: 300, left: 600, right: 0, bottom: 0 };
      const innerWidth = width - margin.right - margin.left;
      const innerHeight = height - margin.top - margin.bottom;

      // tree() sets x and y value
      const tree = d3
        .tree()
        .size([innerHeight, innerWidth])
        .nodeSize([200, 390]); //각각 노드의 수평 및 수직 크기

      const root = d3.hierarchy(treeData[0]); // 트리구조
      const links = tree(root).links();
      const lineGenerator = d3
        .line()
        .x((d) => d.y)
        .y((d) => d.x);

      // Update zoom based on the number of nodes
      // const totalNodes = root.descendants().length;
      const totalHeight = root.descendants()[0].height;
      // const scale = 1.5 / Math.log2(totalHeight + 1.7); // 로그 기반 스케일
      // const scale = 2 / Math.log2(totalNodes + 1.5); // 로그 기반 스케일
      const scale = 1.5 / Math.log2(totalHeight + 1.8); // 수정

      // SVG 요소 생성
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      const zoomG = svg.append("g");

      const g = zoomG.append("g").attr(
        "transform",
        `translate(${margin.left - 130 * totalHeight}, ${height / 2})`
        // `translate(${margin.left - 70 * totalNodes}, ${height / 2})`
        // `translate(${margin.left - 180 * totalHeight}, ${height / 2})`
      );

      // // Add Zooming
      // svg.call(
      //   d3
      //     .zoom()
      //     .scaleExtent([0.45, 3.3]) // 최소 스케일과 최대 스케일을 설정
      //     .on("zoom", ({ transform }) => {
      //       zoomG.attr("transform", transform);
      //     })
      // );

      // // 마우스 이동에 따라 트리 이동
      // svg.call(
      //   d3.drag().on("drag", (event) => {
      //     const newX = event.x - margin.left;
      //     const newY = event.y - margin.top;
      //     g.attr("transform", `translate(${newX}, ${newY})`);
      //   })
      // );

      // Add Zooming
      const zoom = d3
        .zoom()
        .scaleExtent([0.2, 3.3]) // 최소 스케일과 최대 스케일을 설정
        .on("zoom", ({ transform }) => {
          zoomG.attr("transform", transform);
        });

      svg.transition().call(zoom.scaleTo, scale);

      svg.call(zoom);

      // // 마우스 위치에 따라 트리 이동
      // svg.on("mousemove", (event) => {
      //   const [mouseX, mouseY] = d3.pointer(event);
      //   const treeX = (mouseX - margin.left) / scale;
      //   const treeY = (mouseY - margin.top) / scale;

      //   g.attr("transform", `translate(${-treeX}, ${height / 2 - treeY})`);
      // });

      // // 마우스 위치에 따라 부드럽게 트리 이동
      // svg.on("mousemove", (event) => {
      //   const [mouseX, mouseY] = d3.pointer(event);
      //   const treeX = (mouseX - margin.left) / scale;
      //   const treeY = (mouseY - margin.top) / scale;

      //   g.transition()
      //     .duration(300) // 이동에 걸리는 시간 (밀리초)
      //     .attr("transform", `translate(${-treeX}, ${height / 2 - treeY})`);
      // });

      // // 마우스 위치에 따라 일정한 속도로 트리 이동
      // let mouseX = 0;
      // let mouseY = 0;

      // svg.on("mousemove", (event) => {
      //   const [newMouseX, newMouseY] = d3.pointer(event);

      //   // 일정한 비율로 이동
      //   const speed = 0.03;
      //   mouseX += (newMouseX - mouseX) * speed;
      //   mouseY += (newMouseY - mouseY) * speed;

      //   const treeX = (mouseX - margin.left) / scale;
      //   const treeY = (mouseY - margin.top) / scale;

      //   g.attr("transform", `translate(${-treeX}, ${height / 2 - treeY})`);
      // });

      update();

      // eslint 경고 무시하는 주석
      // eslint-disable-next-line no-inner-declarations
      function update() {
        g.selectAll("path")
          .data(links)
          .enter()
          .append("path")
          .attr("d", (d) => lineGenerator(d)) // 직선으로 변경
          .attr("fill", "none")
          .style("stroke", "white")
          .style("transform", "rotateX(20deg) rotateY(8deg) rotateZ(-8deg)")
          .transition()
          .duration(500)
          .attr("stroke-width", 18)
          .style("stroke-dasharray", "18, 10") // dashed 스타일 설정
          .style("filter", "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))")
          .attr("d", (d) => lineGenerator([d.source, d.target])) // 직선으로 변경
          .delay((d) => 500 + 250 * d.source.depth);

        g.selectAll("rect") // 이미지 뒤에 rect를 추가
          .data(root.descendants())
          .enter()
          .append("rect")

          .attr("x", (d) => d.y - 80)
          .attr("y", (d) => d.x - 80)
          .style("transform", "rotateX(20deg) rotateY(8deg) rotateZ(-8deg)")
          .style("fill", "none")
          .transition()
          .duration(400)
          .attr("width", 160)
          .attr("height", 160)
          .style("filter", "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))")
          .style("fill", "rgba(255, 255, 255, 0.9)")
          .delay((d) => 250 + 300 * d.depth);

        g.selectAll("image")
          .data(root.descendants())
          .enter()
          .append("image")
          .attr("x", (d) => d.y - 75)
          .attr("y", (d) => d.x - 75)
          .style("transform", "rotateX(20deg) rotateY(8deg) rotateZ(-8deg)")
          .style("fill", "none")
          .transition()
          .duration(400)
          .attr("xlink:href", (d) => d.data.image_url)
          .attr("width", 150)
          .attr("height", 150)
          .delay((d) => 250 + 300 * d.depth);

        g.selectAll("image").on("click", (event, d) => handleClickStory(d)); // 클릭 이벤트 핸들러 추가
      }
    }
  }, [scenario]);

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default ForceGraph;
