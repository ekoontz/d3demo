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

//var data0 = offset(stream_waves(layers, samples));
var data0 = [
    [{x:0, y:0, y0:0}, 
     {x:1, y:9, y0:0}, 
     {x:2, y:5, y0:0}, 
     {x:3, y:8, y0:0},
     {x:4, y:0, y0:0}],

    [{x:0, y:0, y0:0}, 
     {x:1, y:7, y0:0}, 
     {x:2, y:2, y0:0}, 
     {x:3, y:4, y0:0},
     {x:4, y:0, y0:0}]

];


var data1 = offset(stream_waves(layers, samples));

var color = d3.interpolateRgb("#aad", "#556");

var width = 560;
var height = 200;
var mx = samples - 1;
var my = d3.max(data0.concat(data1), function(d) {
    return d3.max(d, function(d) {
        return d.y0 + d.y;
    });
});

var area = d3.svg.area()
    .x(function(d) { return d.x * width / mx; })
    .y0(function(d) { return height - d.y0 * height / my; })
    .y1(function(d) { return height - (d.y + d.y0) * height / my; });

var vis = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

vis.selectAll("path")
    .data(data0)
    .enter().append("path")
    .style("fill", function() {
	return color(Math.random());})
    .attr("d", area);

