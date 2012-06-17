var regionload_over_time = [
    // regionserver 1: a reliable workhorse that never goes down.
    [{x:0, y:5, y0:0}, 
     {x:1, y:5, y0:0}, 
     {x:2, y:6, y0:0}, 
     {x:3, y:4, y0:0},
     {x:4, y:7, y0:0},
     {x:5, y:8, y0:0}],

    // regionserver 2: the "comeback kid"
    [{x:0, y:7, y0:0}, 
     {x:1, y:7, y0:0}, 
     {x:2, y:2, y0:0}, 
     {x:3, y:0, y0:0},
     {x:4, y:8, y0:0},
     {x:5, y:12, y0:0}],

    // regionserver 3: a box that started off well but sadly, crashes.
    // the other machines, regionservers 1 and 2, had to pick up its load.
    [{x:0, y:10, y0:0}, 
     {x:1, y:10, y0:0}, 
     {x:2, y:11, y0:0},
     {x:3, y:0, y0:0}, 
     {x:4, y:0, y0:0},
     {x:5, y:0, y0:0}]

];

var layers = regionload_over_time.length;
var samples = regionload_over_time[0].length;

//"The stack layout takes a two-dimensional array of data and computes a
//baseline; the baseline is then propagated to the above layers, so as
// to produce a stacked graph." 
// - https://github.com/mbostock/d3/wiki/Stack-Layout#wiki-stack
//
// stack()
//"Constructs a new stack layout with the default offset (zero) and order (null)."
// - https://github.com/mbostock/d3/wiki/Stack-Layout#wiki-stack

// offset()
// "sets the stack offset algorithm to the specified value:
//    zero - use a zero baseline, i.e., the y-axis."
// - https://github.com/mbostock/d3/wiki/Stack-Layout#wiki-offset
var data1 = d3.layout.stack().offset("zero")(regionload_over_time);

// "Returns an RGB color space interpolator between the two colors a
// and b. The colors a and b need not be in RGB, but they will be
// converted to RGB using d3.rgb. The red, green and blue channels are
// interpolated linearly in a manner equivalent to interpolateRound,
// as fractional channel values are not allowed. The return value of
// the interpolator is always a string representing the RGB color,
// such as "rgb(255,0,0)" for red."
// - https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_interpolateRgb
var color = d3.interpolateRgb("#3a0", "#ddd");

var width = 560;
var height = 200;
var number_of_samples = samples - 1;
var aggregated_regionload = regionload_over_time.concat(data1);
var maximum_y = d3.max(aggregated_regionload,
		       function(d) {
			   return d3.max(d, function(d) {
			       return d.y0 + d.y;
			   });
		       });

// "Constructs a new area generator with the default x-, y0- and
// y1-accessor functions (that assume the input data is a two-element
// array of numbers; see below for details), and linear
// interpolation. The returned function generates path data for a
// closed piecewise linear curve, or polygon, as in an area chart"
// - https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area
var area = d3.svg.area()
    .x(function(d) { return d.x * width / number_of_samples; })
    .y0(function(d) { return height - d.y0 * height / maximum_y; })
    .y1(function(d) { return height - (d.y + d.y0) * height / maximum_y; });

var chart = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

chart.selectAll("path")
    .data(regionload_over_time)
    .enter().append("path")
    .style("fill", function() {
	return color(Math.random());
    })
    .attr("d", area);

