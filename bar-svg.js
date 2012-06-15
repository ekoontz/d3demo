var region_load_report = 
    [
	{"hostname":"rs1","regions":5},
	{"hostname":"rs2","regions":10},
	{"hostname":"rs3","regions":2},
	{"hostname":"rs4","regions":3}
	,{"hostname":"rs5","regions":25}
//	,{"hostname":"rs6","regions":150}
    ];

// TODO: make these depend on the client's browser window dimensions.
var bar_chart_height = 200;
var bar_chart_width = 600;
var max_value = d3.max(region_load_report, function(regionserver) { return regionserver.regions});

var vertical_scaling = bar_chart_height / max_value;
var bar_width = bar_chart_width / (region_load_report.length * 1.05);
var max_height = vertical_scaling * d3.max(region_load_report,
					   function(regionserver) { return regionserver.regions});

var chart = d3.select("#rsload").append("svg")
    .attr("class", "chart")
    .attr("width", bar_width * region_load_report.length)
    .attr("height", max_height);

var x = function(regionserver, i) { return i * bar_width; }
var y = function(regionserver) { return max_height - (vertical_scaling * regionserver.regions);}

// 1. the actual bar chart
chart.selectAll("rect")
    .data(region_load_report)
    .enter().append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("height", function(regionserver, i) { return regionserver.regions * vertical_scaling; })
    .attr("width", bar_width);

// 2. show regionserver hostname.
chart.selectAll("text")
    .data(region_load_report)
    .enter().append("text")
    .attr("x", function(regionserver, i) { return ((i) * (bar_width)); })
    .attr("y", function(regionserver) { return  max_height - 10;})
    .attr("dx", 30)
    .attr("dy", ".35em") // vertical-align: middle
    .attr("text-anchor", "right")
    .text(function(regionserver){ return regionserver.hostname + ":" + regionserver.regions;});
 

// 3. ticks
// ..

// 4. bottom line
chart.append("line")
    .attr("x1", 0)
    .attr("x2", bar_width * region_load_report.length)
    .attr("y1", max_height)
    .attr("y2", max_height)

    .style("stroke", "black");