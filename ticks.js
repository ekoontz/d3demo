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
function ticks(chart,maximum_y,width,height,data_length) {
    var tickgen = d3.scale.linear()
	.domain([0,maximum_y]);
    var time_interval_width = width / data_length;
    var vertical_scaling = height / maximum_y;
    var tick_ys = tickgen.ticks(10);
    chart.selectAll("line")
	.data(tick_ys).enter()
	.append("line")
	.attr("x1",function(tick) { return 0;})
	.attr("x2",function(tick) { return width;})
	.attr("y1",function(tick) { return tick * vertical_scaling;})
	.attr("y2",function(tick) { return tick * vertical_scaling;})
	.style("stroke","#011");

    // tick labels
    // TODO: figure out multiplier for this rather than hardwired.
    var magical_tick_label_number = 12;
    
    // TODO: figure out multiplier of maximum length of number string rather than hardwired.
    // e.g. "10000" has length 5.
    var magical_x_label_offset = -15;

    chart.selectAll(".rule")
	.data(tick_ys)
	.enter().append("text")
	.attr("class", "rule")
	.attr("x", width)
	.attr("dx", magical_x_label_offset)
	.attr("y", function(tick) {return height - (tick * vertical_scaling);})
	.attr("dy", magical_tick_label_number)
	.attr("text-anchor", "middle")
	.text(String);

}
