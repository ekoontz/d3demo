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
 *  data: an array of Javascript maps.
 *  datum_to_x: function that takes a element in your data array (a datum) and returns its x value.
 *  datum_to_y: function that takes a element in your data array (a datum) and returns its y value.
 */

function bar_chart(dom_id,data,datum_to_x,datum_to_y) {

    // TODO: make these depend on the client's browser window dimensions.
    var bar_chart_height = 200;
    var bar_chart_width = 550;
    
    var max_value = d3.max(data, function(datum) { return datum_to_y(datum)+0;});
    var vertical_scaling = bar_chart_height / max_value;
    var bar_width = bar_chart_width / (data.length * 1.05);
    var max_height = vertical_scaling * max_value;
    
    var chart = d3.select(dom_id).append("svg")
	.attr("class", "chart")
	.attr("width", bar_width * data.length)
	.attr("height", max_height);
    
    var x = function(datum, i) { return i * bar_width; }
    var y = function(datum) { return max_height - (vertical_scaling * datum_to_y(datum))};
    
    // 1. show bar for each datum.
    chart.selectAll("rect")
	.data(data)
	.enter().append("rect")
	.attr("x", x)
	.attr("y", y)
	.attr("height", function(datum) { return datum_to_y(datum) * vertical_scaling; })
	.attr("width", bar_width);
    
    // 2. label each bar with the x value for each datum.
    chart.selectAll("text")
	.data(data)
	.enter().append("text")
	.attr("x", function(datum, i) { return ((i) * (bar_width)); })
	.attr("y", function(datum) { return  max_height - 10;})
	.attr("dx", 50)
	.attr("dy", ".35em") // vertical-align: middle
	.attr("text-anchor", "right")
	.text(function(datum){ return datum_to_x(datum);});
    
    // 3. ticks
    ticks(chart,max_value,bar_width*data.length,bar_chart_height,data.length);
}


