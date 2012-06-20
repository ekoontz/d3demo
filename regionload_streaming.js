/*
 * "construct a synthetic (i.e., fake) dataset by random walk"
 * - http://mbostock.github.com/d3/tutorial/bar-2.html
 */
var t = new Date().getTime(); // start time (seconds since epoch)
var v = 70; // start value (subscribers)

function next() {
    return {
	time: ++t,
	value: v = ~~Math.max(5, Math.min(20, v + 10 * (Math.random() - .5)))
    };
}

// data looks like [ {time:t0, value: v0} , {time:t1, value: v1}, ... ]
var rs0 = d3.range(10).map(next); 
var rs1 = d3.range(10).map(next);
var rs2 = d3.range(10).map(next);

var chart = streamgraph("#rsload", new Array(rs0,rs1,rs2));
