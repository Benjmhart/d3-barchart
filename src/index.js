/* global fetch */
import * as d3 from "d3";
import "d3-selection-multi";

import "./index.scss";

const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;

const svg = d3
  .select("div.root")
  .append("svg")
  .attrs({
    width,
    height
  });
const parseYM = d3.timeParse("%Y-%m-%d");
const formatY = d3.timeFormat("%b, %Y");

fetch(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then(r => r.json())
  .then(j => {
    const pad = 60;
    const justGDP = j.data.map(i => i[1]);
    const itemWidth = Math.ceil((width - pad * 2) / j.data.length);

    const heightscale = d3
      .scaleLinear()
      .domain([d3.min(justGDP) * 0.7, d3.max(justGDP) + 1])
      .range([5, height - pad * 2]);

    const yscale = d3
      .scaleLinear()
      .domain([d3.min(justGDP) * 0.7, d3.max(justGDP) + 1])
      .range([height - pad, pad]);

    const yearsArr = j.data.map(i => parseYM(i[0]));
    const xscale = d3
      .scaleTime()
      .domain([d3.min(yearsArr), d3.max(yearsArr)])
      .range([pad, width - pad]);

    const dataset = j.data.map((d, i) => [yearsArr[i], d[1]]);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attrs({
        id: (d, i) => `rect${i}`,
        height: d => heightscale(d[1]),
        width: itemWidth,
        fill: "blue",
        x: d => xscale(d[0]),
        y: d => height - heightscale(d[1]) - pad,
        "data-ref": d => d
      });
    const xaxis = d3.axisBottom(xscale);
    svg
      .append("g")
      .attrs({
        transform: `translate(${[0, height - pad]})`
      })
      .call(xaxis);

    const yaxis = d3.axisLeft(yscale).tickFormat(d3.format(",.2r"));
    svg
      .append("g")
      .attrs({
        transform: `translate(${[pad, 0]})`
      })
      .call(yaxis);

    svg
      .append("text")
      .attrs({
        class: "ylabel",
        x: -200,
        y: pad * 1.5,
        fill: "black",
        transform: "rotate(-90)"
      })
      .text("USA GDP (Billions)");

    function handleMouseOver(d, i) {
      svg.append("rect").attrs({
        id: `tooltip${i}`,
        class: "tooltip",
        x: xscale(d[0]) - 50,
        y: height - heightscale(d[1]) - pad - 50,
        fill: "gray",
        height: 40,
        width: 70
      });
      svg
        .append("text")
        .attrs({
          id: `toolYear${i}`,
          class: "tooltip",
          x: xscale(d[0]) - 45,
          y: height - heightscale(d[1]) - pad - 35,
          fill: "white"
        })
        .text(`${formatY(d[0])}`);
      svg
        .append("text")
        .attrs({
          id: `toolTotal${i}`,
          class: "tooltip",
          x: xscale(d[0]) - 45,
          y: height - heightscale(d[1]) - pad - 18,
          fill: "white"
        })
        .text(`${d[1]}B`);

      d3.select(`#rect${i}`).attrs({
        fill: "pink"
      });
    }

    function handleMouseOut(d, i) {
      d3.selectAll(".tooltip").remove();
      d3.select(`#rect${i}`).attrs({
        fill: "blue"
      });
    }
    const rects = d3.selectAll("rect");
    rects.on("mouseover", (d, i) => handleMouseOver(d, i));
    rects.on("mouseout", (d, i) => handleMouseOut(d, i));
  });
