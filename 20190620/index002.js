var svgHeight=500;
var svgWidth=800;

var svg=d3.select("svg")
    .attr("height",svgHeight)
    .attr("width",svgWidth)
    .attr("class", "svg-color");

// var rec=svg.append("rect")
//     .attr('x',100)
//     .attr('y',150)
//     .attr("width", 200)
//     .attr("height", 100)
//     .attr('fill',"red")
var rect = svg.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("width", 200)
    .attr("height", 100)
    .attr("fill", "#9B95FF");