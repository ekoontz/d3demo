var region_load_report = 
    [
	{"hostname":"rs1","regions":5},
	{"hostname":"rs2","regions":10},
	{"hostname":"rs3","regions":2},
	{"hostname":"rs4","regions":3}
    ];

var vertical_scaling = 10;          
var bar_width = 100;
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
    .attr("text-anchor", "middle")
    .text(function(regionserver){ return regionserver.hostname;});

// 3. ticks
