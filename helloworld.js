// I declared these external so that I can refer to them from the Web Console for Firefox
// (or equivalent with other browsers).
var chart;
var mycircles;

function hello_world(dom_id) {
    // console.info() is very useful for debugging.
    console.info("HELLO WORLD!");

    chart = d3.select(dom_id).append("svg")
	.attr("class", "chart")
	.attr("width", 500)
	.attr("height", 300);

    mycircles = [
	{"r": 50, "x": 100, "y":100, "id": "earth"},
	{"r": 25, "x": 150, "y":100, "id": "mars"},
	{"r": 15, "x": 175, "y":100, "id": "moon"},
    ];

    var get_x_from_circle = function(circle) {return circle.x;};
    var get_y_from_circle = function(circle) {return circle.y;};
    var get_radius_from_circle = function(circle) {return circle.r;};

    chart.selectAll("circle").data(mycircles).enter().
	append("circle").attr("cx",get_x_from_circle).
	attr("cy",get_y_from_circle).
	attr("r",get_radius_from_circle).
	attr("id",function(c) {return c.id;});


    console.info("exiting the stage.");

    chart.selectAll("circle").exit();

}
