import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import StoryModal from "./StoryModal";
import CreateStoryModal from "./CreateStoryModal";

const ForceGraph = ({ storyId }) => {
  const svgRef = useRef(null);
  const [scenario, setScenario] = useState([]);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [clickStoryId, setClickStoryId] = useState(storyId);
  // const [parentStoryId, setParentStoryId] = userState(0);

  const handleClickStory = (story_id) => {
    // 스토리 생성 or 조회
    if (story_id < 0) {
      // 생성
      setIsStoryModalOpen(false);
      setIsCreateModalOpen(true);
    } else {
      setClickStoryId(story_id);
    }
  };

  const openModal = (d) => {
    setClickStoryId(d.data.story_id);
    setIsStoryModalOpen(true);
  };

  const closeModal = () => {
    setIsStoryModalOpen(false);
    setIsCreateModalOpen(false);
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
    const scenarioAPI = async () => {
      try {
        const response = await axios.get(`api/v1/stories/branches/${storyId}/`);
        // console.log("response: ", response.data.data);
        if (response.data.data.length > 0) {
          setScenario(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching scenario data:", error);
      }
    };

    scenarioAPI();
  }, [isCreateModalOpen]);

  useEffect(() => {
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

      const tree = d3.tree().size([width, height]).nodeSize([150, 90]); //각각 노드의 수평 및 수직 크기

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
        .attr("transform", `translate(${width / 7},${height / 2.5})`); // 루트 노드 기준

      const root = d3.hierarchy(treeData[0]); // 트리구조

      update();

      // eslint 경고 무시하는 주석
      // eslint-disable-next-line no-inner-declarations
      function update() {
        const nodes = tree(root).descendants();
        const links = tree(root).links();

        nodes.forEach((d) => {
          d.y = d.depth * 220;
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
          .style("filter", "drop-shadow(3px 3px 5px #ffffffb6)")
          .on("click", (event, d) => openModal(d)); // 클릭 이벤트 핸들러 추가

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
    <div className="flex flex-col relative w-full h-full">
      <div>
        <svg
          ref={svgRef}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform:
              "translate(-50%, -50%) perspective(1500px) rotateX(20deg) rotateY(8deg) rotateZ(-8deg)",
          }}
        ></svg>
      </div>
      {isStoryModalOpen && (
        <div className="z-10 w-full h-full">
          <StoryModal
            storyId={clickStoryId}
            isOpen={isStoryModalOpen}
            onClose={closeModal}
            handleClickStory={handleClickStory}
          />
        </div>
      )}
      {isCreateModalOpen && (
        <div className="z-20">
          <CreateStoryModal
            parentStoryID={clickStoryId}
            isOpen={isCreateModalOpen}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default ForceGraph;
