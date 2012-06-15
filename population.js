var width = 600,
    height = 500;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([0, height - 40]);

// An SVG element with a bottom-right origin.
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("padding-right", "30px")
  .append("g")
    .attr("transform", "translate(" + x(1) + "," + (height - 20) + ")scale(-1,-1)");

// A sliding container to hold the bars.
var body = svg.append("g")
    .attr("transform", "translate(0,0)");

// A container to hold the y-axis rules.
var rules = svg.append("g");

// A label for the current year.
var title = svg.append("text")
    .attr("class", "title")
    .attr("dy", ".71em")
    .attr("transform", "translate(" + x(1) + "," + y(1) + ")scale(-1,-1)")
    .text(2000);

d3.csv("./population.csv", function(data) {

  // Convert strings to numbers.
  data.forEach(function(d) {
    d.people = +d.people;
    d.year = +d.year;
    d.age = +d.age;
  });

  // Compute the extent of the data set in age and years.
  var min_age = 0,
      max_age = d3.max(data, function(d) { return d.age; }),
      min_year = d3.min(data, function(d) { return d.year; }),
      max_year = d3.max(data, function(d) { return d.year; }),
      current_year = max_year;

  // Update the scale domains.
  x.domain([0, max_age + 5]);
  y.domain([0, d3.max(data, function(d) { return d.people; })]);

  // Add rules to show the population values.
  rules = rules.selectAll(".rule")
      .data(y.ticks(10))
    .enter().append("g")
      .attr("class", "rule")
      .attr("transform", function(d) { return "translate(0," + y(d) + ")"; });

  rules.append("line")
      .attr("x2", width);

  rules.append("text")
      .attr("x", 6)
      .attr("dy", ".35em")
      .attr("transform", "rotate(180)")
      .text(function(d) { return Math.round(d / 1e6) + "M"; });

  // Add labeled rects for each birthyear.
  var years = body.selectAll("g")
      .data(d3.range(min_year - max_age, max_year + 5, 5))
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x(max_year - d) + ",0)"; });

  years.selectAll("rect")
      .data(d3.range(2))
    .enter().append("rect")
      .attr("x", 1)
      .attr("width", x(5) - 2)
      .attr("height", 1e-6);

  years.append("text")
      .attr("y", -6)
      .attr("x", -x(5) / 2)
      .attr("transform", "rotate(180)")
      .attr("text-anchor", "middle")
      .style("fill", "#fff")
      .text(String);

  // Add labels to show the age.
  svg.append("g").selectAll("text")
      .data(d3.range(0, max_age + 5, 5))
    .enter().append("text")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) { return "translate(" + (x(d) + x(5) / 2) + ",-4)scale(-1,-1)"; })
      .attr("dy", ".71em")
      .text(String);

  // Nest by year then birthyear.
  data = d3.nest()
      .key(function(d) { return d.year; })
      .key(function(d) { return d.year - d.age; })
      .rollup(function(v) { return v.map(function(d) { return d.people; }); })
      .map(data);

  redraw();

  function redraw() {
    if (!(current_year in data)) return;
    title.text(current_year);

    years.selectAll("rect")
        .data(function(d) { return data[current_year][d] || [0, 0]; })
      .transition()
        .duration(750)
        .attr("height", y);
  }
});
