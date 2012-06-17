var layers = 3; // number of layers
var samples = 5; // number of samples per layer

//"The stack layout takes a two-dimensional array of data and computes a
//baseline; the baseline is then propagated to the above layers, so as
// to produce a stacked graph." 
// - https://github.com/mbostock/d3/wiki/Stack-Layout#wiki-stack

//"Constructs a new stack layout with the default offset (zero) and order (null)."
// - https://github.com/mbostock/d3/wiki/Stack-Layout#wiki-stack
var stack = d3.layout.stack();


// "sets the stack offset algorithm to the specified value:
//    silhouette - center the stream, as in ThemeRiver.
//    wiggle - minimize weighted change in slope.
//    expand - normalize layers to fill the range [0,1].
//    zero - use a zero baseline, i.e., the y-axis."
// - https://github.com/mbostock/d3/wiki/Stack-Layout#wiki-offset
var offset = stack.offset("zero");

var regionload_over_time = [

    [{x:0, y:0, y0:0}, 
     {x:1, y:15, y0:0}, 
     {x:2, y:5, y0:0}, 
     {x:3, y:8, y0:0},
     {x:4, y:0, y0:0}],

    [{x:0, y:0, y0:0}, 
     {x:1, y:7, y0:0}, 
     {x:2, y:2, y0:0}, 
     {x:3, y:4, y0:0},
     {x:4, y:0, y0:0}],

    [{x:0, y:0, y0:0}, 
     {x:1, y:5, y0:0}, 
     {x:2, y:1, y0:0}, 
     {x:3, y:3, y0:0},
     {x:4, y:0, y0:0}]


];


var data1 = offset(stream_waves(layers, samples));

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

var maximum_y = d3.max(regionload_over_time.concat(data1), function(d) {
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

