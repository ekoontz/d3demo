
function entry_point_from_dom(dom_id) {
    svg = d3.select("svg");

    var droplets = svg.selectAll("circle")
	.data([{"sc": 100,
		"y":50},
	       {"sc":200,
		"y":75},
	       {"sc":300,
		"y":100},
	       {"sc":400,
		"y":150},
	       {"sc":500,
		"y":200},
	       {"sc":400,
		"y":150},
	       {"sc":300,
		"y":100},
	      ]);
    
    var dropletEnter = droplets.enter().append("circle");
    dropletEnter.attr("cy", function(d) { return d.y;});
    dropletEnter.attr("cx", function(d, i) { return (i * 50) + 30; });
    dropletEnter.attr("r", function(d) { return Math.sqrt(d.sc*1.7); });




}
