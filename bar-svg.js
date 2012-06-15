var data = [4, 8, 15, 16, 23, 42];
var scaling = 1;          
var max_height = scaling * d3.max(data);

var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 20 * data.length)
    .attr("height", max_height);

var x = d3.scale.linear()
    .domain([0, 420])
    .range([0, d3.max(data)]);

chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d, i) { return i * 20; })
    .attr("y", function(d) { return max_height - (scaling * d);})
    .attr("height", function(d, i) { return d * scaling; })
    .attr("width", 20);
