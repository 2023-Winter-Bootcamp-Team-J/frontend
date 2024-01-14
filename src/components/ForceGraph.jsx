import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ForceGraph = () => {
  const svgRef = useRef();

  // Define your treeData somewhere in your code
  const treeData = [
    {
      name: "Top Level",
      parent: "null",
      children: [
        {
          name: "Level 2: A",
          parent: "Top Level",
          children: [
            {
              name: "Son of A",
              parent: "Level 2: A",
              children: [
                {
                  name: "Baby of A",
                  parent: "Son of A",
                  children: [{ parent: "Baby of A" }],
                },
                {
                  name: "Bbaby of A",
                  parent: "Son of A",
                  children: [{ parent: "Bbaby of A" }],
                },
              ],
            },
            {
              name: "Daughter of A",
              parent: "Level 2: A",
              children: [
                {
                  name: "Baby of A",
                  parent: "Daughter of A",
                  children: [{ parent: "Baby of A" }],
                },
                {
                  name: "Bbaby of A",
                  parent: "Daughter of A",
                  children: [{ parent: "Bbaby of A" }],
                },
              ],
            },
          ],
        },
        {
          name: "Level 2: B",
          parent: "Top Level",
          children: [
            {
              name: "Son of B",
              parent: "Level 2: B",
              children: [
                {
                  name: "Baby of B",
                  parent: "Son of B",
                  children: [{ parent: "Baby of B" }],
                },
                {
                  name: "Bbaby of B",
                  parent: "Son of B",
                  children: [{ parent: "Bbby of B" }],
                },
              ],
            },
            {
              name: "Daughter of B",
              parent: "Level 2: B",
              children: [
                {
                  name: "Baby of B",
                  parent: "Daughter of B",
                  children: [{ parent: "Baby of B" }],
                },
                {
                  name: "Bbaby of B",
                  parent: "Daughter of B",
                  children: [{ parent: "Bbby of B" }],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  useEffect(() => {
    // Remove any existing SVG
    d3.select(svgRef.current).selectAll("*").remove();
    const margin = { top: 345, right: 5, bottom: 5, left: 45 };
    const width = 1200 - margin.right - margin.left;
    const height = 1080 - margin.top - margin.bottom;
    let i = 0;

    const tree = d3.tree().size([width, height]).nodeSize([45, 140]); //각각 노드의 수평 및 수직 크기

    // const diagonal = d3
    //   .linkHorizontal()
    //   .x((d) => d.y)
    //   .y((d) => d.x);

    const line = d3
      .line()
      .x((d) => d.y)
      .y((d) => d.x);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(treeData[0]);

    update(root);

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
        .attr(
          "xlink:href",
          "https://nextpage-bucket.s3.ap-northeast-2.amazonaws.com/uploadTest.png"
        )
        .attr("x", -40)
        .attr("y", -30)
        .attr("width", 60)
        .attr("height", 60)
        .style("filter", "drop-shadow(3px 3px 5px #ffffffb6)");

      nodeEnter
        .append("text")
        .attr("x", (d) => (d.children || d.children ? -13 : 13))
        .attr("dy", ".35em")
        .attr("text-anchor", (d) =>
          d.children || d.children ? "end" : "start"
        )
        .text((d) => d.data.name)
        .style("fill", "white");
      // .style("fill-opacity", 1);

      const link = svg.selectAll("path.link").data(links, (d) => d.target.id);

      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) => line([d.source, d.target]))
        .attr("stroke-width", 2)
        .style("fill", "none")
        .style("stroke", "#7aff8e2f");
    }
  }, []);

  return (
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
          "translate(-50%, -50%) perspective(1500px) rotateX(30deg) rotateY(1deg) rotateZ(-1deg)",
      }}
    ></svg>
  );
};

export default ForceGraph;
