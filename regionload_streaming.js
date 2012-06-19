/*
 * "construct a synthetic (i.e., fake) dataset by random walk"
 * - http://mbostock.github.com/d3/tutorial/bar-2.html
 */
var t = 1297110663; // start time (seconds since epoch)
var v = 70; // start value (subscribers)
var data = d3.range(33).map(next); // starting dataset

function next() {
    return {
	time: ++t,
	value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
    };
}

//var regionserver_histories = [];

//streamgraph("#rsload", regionserver_histories);
