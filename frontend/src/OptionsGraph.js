import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const OptionsGraph = ({ securities, graphType }) => {
  const graphRef = useRef();

  // Define the mapping of user color options to hex codes
  const colorMapping = {
    Green: "#90be6d",
    Orange: "#f3722c",
    Saffron: "#f9c74f",
    "Dark Blue": "#003488",
    Purple: "#93799a",
    "Light Blue": "#00bde8",
  };

  useEffect(() => {
    // Clear existing content
    const svg = d3.select(graphRef.current);
    svg.selectAll("*").remove();

    // Graph dimensions
    const width = 700;
    const height = 550;
    const margin = { top: 10, right: 15, bottom: 10, left: 55 };

    // Create scales
    const xScale = d3.scaleLinear().domain([0, 200]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-100, 100]).range([height, 0]);

    // Create SVG container
    const graph = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Adding gridlines
    const xGrid = d3.axisBottom(xScale)
      .tickValues(d3.range(10, 201, 10))
      .tickSize(-height)
      .tickFormat("");

    const yGrid = d3.axisLeft(yScale)
      .tickValues(d3.range(-100, 101, 10))
      .tickSize(-width)
      .tickFormat("");

    graph.append("g") //minor lines on the x axis
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(xGrid)
      .selectAll("line")
      .attr("stroke", "grey")
      .attr("stroke-dasharray", "1,1"); //can change this (1,1) for larger dashes

    graph.append("g") //minor lines on the y axis
      .attr("class", "grid")
      .call(yGrid)
      .selectAll("line")
      .attr("stroke", "grey")
      .attr("stroke-dasharray", "1,1");

    // Add X-axis
    graph
      .append("g")
      .attr("transform", `translate(0,${yScale(0)})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(10)
          .tickFormat((d) => (d === 0 ? "" : d))
      )
      .selectAll("text")
      .style("font-size", "14px");

    // Add Y-axis
    graph
      .append("g")
      .call(d3.axisLeft(yScale).ticks(10))
      .selectAll("text")
      .style("font-size", "14px");

    // Add X-axis label
    graph
      .append("text")
      .attr("x", width - 95)
      .attr("y", height / 2 - 5)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Value of Underlying Asset");

    // Add Y-axis label
    graph
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Value of Security");

    // Generate and plot individual securities
    const allData = [];
    securities.forEach((security) => {
      const { type, position, fvBond } = security;

      if (type == "Bond") { //have not checked && fvBond --> can throw exception
        // Draw horizontal line for bonds
        const yValue = position === "Long" ? parseFloat(fvBond) : -parseFloat(fvBond);

        // Add bond data to allData for combined payoff
        const bondData = Array.from({ length: 201 }, (_, x) => ({
          x,
          y: yValue,
        }));
        allData.push(bondData);

        graph //add to graph
          .append("line")
          .attr("x1", xScale(0))
          .attr("x2", xScale(200))
          .attr("y1", yScale(yValue))
          .attr("y2", yScale(yValue))
          .attr("stroke", colorMapping[security.color] || "black") //black means something went wrong with security color
          .attr("stroke-width", 2);
      } else { //call/put/stock

        const data = generateGraphData(security, graphType);
        allData.push(data);

        const line = d3
          .line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y));

        graph //add to graph
          .append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", colorMapping[security.color] || "black")
          .attr("stroke-width", 2)
          .attr("d", line);
      }
    });

    // Generate combined payoff data (red line)
    if (securities.length > 1) {
      const combinedPayoffData = [];
      for (let x = 0; x <= 200; x += 1) {
        let combinedY = 0;
        allData.forEach((data) => {
          const point = data.find((d) => d.x === x);
          if (point) {
            combinedY += point.y;
          }
        }); //basically adding all y values at all x values --> 1200 operations max, should be fast
        combinedPayoffData.push({ x, y: combinedY });
      }

      // Plot the combined payoff line
      const combinedLine = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

      graph
        .append("path")
        .datum(combinedPayoffData)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("d", combinedLine);
    }
  }, [securities, graphType]);

  // Helper function to generate graph data for each security
  const generateGraphData = (security, graphType) => {
    const { type, position, strikePrice, premium } = security;

    const points = [];
    for (let x = 0; x <= 200; x += 1) {
      let y = 0;

      if (type === "Call") {
        y = position === "Long" ? Math.max(0, x - strikePrice) : Math.min(0, strikePrice - x);
      } else if (type === "Put") {
        y = position === "Long" ? Math.max(0, strikePrice - x) : Math.min(0, x - strikePrice);
      } else if (type === "Stock") {
        y = position === "Long" ? x : -x;
      }

      // Subtract premium if graphType is Profit
      if (graphType === "Profit") {
        y -= position === "Long" ? premium : -premium;
      }

      points.push({ x, y });
    }
    return points;
  };

  return <svg ref={graphRef} />;
};

export default OptionsGraph;
