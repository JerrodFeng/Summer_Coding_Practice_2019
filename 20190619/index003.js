var dataset=[30,20,30,38,29,22,15];
var svgHeight=300, svgWidth=500, barPadding=5;
var barWidth=(svgWidth/dataset.length);

var svg=d3.select('svg')
.attr("width",svgWidth)
.attr("height",svgHeight);


var yScale=d3.scaleLinear()
    .range([0,svgHeight-10])
    .domain([0,d3.max(dataset)])




var barChart=svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("y",function (d) {
    return svgHeight-yScale(d);
})
.attr("height",function (d) {
    return yScale(d);
})
.attr("width",barWidth-barPadding)
.attr("transform",function (d,i) {
    var translate=[barWidth*i,0];
    return "translate("+translate+")";
});

var text=svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
        return d
    })
    .attr('y',function (d) {
        return svgHeight-yScale(d)-5;
    })

    .attr('x',function (d,i) {
        return i*barWidth+15
    })

