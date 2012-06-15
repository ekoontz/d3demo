var region_load_report = 
    [
	{"hostname":"rs1","regions":4},
	{"hostname":"rs2","regions":10},
	{"hostname":"rs3","regions":2},
	{"hostname":"rs4","regions":3}
    ];

var vertical_scaling = 10;          
var bar_width = 30;
var max_height = vertical_scaling * d3.max(region_load_report,
					   function(regionserver) { return regionserver.regions});

var chart = d3.select("#rsload").append("svg")
    .attr("class", "chart")
    .attr("width", bar_width * region_load_report.length)
    .attr("height", max_height);

chart.selectAll("rect")
    .data(region_load_report)
    .enter().append("rect")
    .attr("x", function(regionserver, i) { return i * bar_width; })
    .attr("y", function(regionserver) { return max_height - (vertical_scaling * regionserver.regions);})
    .attr("height", function(regionserver, i) { return regionserver.regions * vertical_scaling; })
    .attr("width", bar_width);
