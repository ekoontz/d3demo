/* 
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * draw bar charts with d3 (http://d3js.org)
 *
 * bar_chart(): draw a bar chart.
 * params: 
 *  dom_id : node in your DOM tree where the chart will be put (please prefix with #).
 *  data: an array of JSON maps.
 *  datum_to_x: function that takes a element in your data array (a datum) and returns its x value.
 *  datum_to_y: function that takes a element in your data array (a datum) and returns its y value.
 */
function map_to_streamgraph(data) {

    var streamgraph_data = [];
    var hist;
    for (hist in data) {
	var retval = [];
	var t;
	var myhistory = data[hist];
	for (t in data[hist]) {
	    var val = parseFloat(data[hist][t]);
	    var t_int = parseInt(t);
	    if (t == 0) {
		retval.push({x: t_int, y: val, y0:0, color: ((hist / data[0].length) * 2)});
	    } else {
		retval.push({x: t_int, y: val, y0:0});
	    }
	}
	streamgraph_data.push(retval);
    }
    return streamgraph_data;
}

function streamgraph(dom_id,data) {

    // "Returns an RGB color space interpolator between the two colors a
    // and b. The colors a and b need not be in RGB, but they will be
    // converted to RGB using d3.rgb. The red, green and blue channels are
    // interpolated linearly in a manner equivalent to interpolateRound,
    // as fractional channel values are not allowed. The return value of
    // the interpolator is always a string representing the RGB color,
    // such as "rgb(255,0,0)" for red."
    // - https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_interpolateRgb
    var color = d3.interpolateRgb("#5a0", "#111");
    
    var layers = data.length;
    // All data elements should have the same length (number of samples).
    // Thus we arbitrarily look at the length of the first element while assuming all other elements
    // have the same length.
    var samples = data[0].length;
    
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
    var formatted_data = map_to_streamgraph(data);
    var data1 = d3.layout.stack().offset("zero")(formatted_data);
    
    var width = 560;
    var height = 200;
    var aggregated_data = formatted_data.concat(data1);
    var maximum_y = d3.max(aggregated_data,
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
	.x(function(d) { return d.x * width / (samples - 1);})
	.y0(function(d) { return height - d.y0 * height / maximum_y; })
	.y1(function(d) { return height - (d.y + d.y0) * height / maximum_y; });
    
    var chart = d3.select(dom_id)
	.append("svg")
	.attr("width", width)
	.attr("height", height);
    
    chart.selectAll("path")
	.data(formatted_data)
	.enter().append("path")
	.style("fill", function(d) {
	    return color(d[0].color);
	})
	.attr("d", area);

    ticks(chart,maximum_y,width,height,data.length);
}
