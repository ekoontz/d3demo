
var svg = d3.select("gameboard").append("svg")
    .attr("class", "chart")
    .attr("width", 500)
    .attr("height", 200);

function entry_point_from_dom(dom_id) {
    svg = d3.select("svg");

    var circle = svg.selectAll("circle")
	.data([100, 200, 300, 400, 500]);
    
    var circleEnter = circle.enter().append("circle");
    circleEnter.attr("cy", 100);
    circleEnter.attr("cx", function(d, i) { return (i * 50) + 30; });
    circleEnter.attr("r", function(d) { return Math.sqrt(d); });

}
