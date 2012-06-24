// I declared these external so that I can refer to them from the Web Console for Firefox
// (or equivalent with other browsers).
var chart;
var mycircles;

var state = "BEGIN_STATE";
var iterations = 0;

var earth = {"r": 50, "x": 100, "y":100, "id": "earth"};
var mars  = {"r": 35, "x": 150, "y":100, "id": "mars"};
var moon  = {"r": 15, "x": 175, "y":100, "id": "moon"};

var data_array;
function hello_world(dom_id) {
    state = state_transition(state);

    chart = d3.select(dom_id).append("svg")
	.attr("class", "chart")
	.attr("width", 500)
	.attr("height", 300);


    console.log("Setup of the SVG chart done.");

    var foo = d3.select("#foo");

    var olddata = foo.selectAll("div").data([4,8,15,16,23,42]);
    olddata.enter().append("div").text(function(d) {return d;});

    var newdata = foo.selectAll("div").data([1,2,4,8,16,32],
					    function(d) {return d;});
    // removes things in foo that are not in newdata (namely: 15,23, and 42).
    newdata.enter().append("div").text(function(d) {return d;});
    newdata.exit().remove();

    mycircles = [earth,mars,moon];

    var get_x_from_circle = function(circle) {return circle.x;};
    var get_y_from_circle = function(circle) {return circle.y;};
    var get_radius_from_circle = function(circle) {return circle.r;};

    data_array = chart.selectAll("circle").data(mycircles);

    data_array.enter().append("circle").
	attr("cx",function(c){return c.x;}).
	attr("cy",function(c){return c.y;}).
        attr("r",function(c) {return c.r;}).
        attr("id",function(c) {return c.id;});

    console.info("start state: " + state);

    setInterval(function() {
	if (state == "MOVE_EARTH") {
	    if (iterations < 3) {
		move_planet(d3.select("#earth"));
		iterations++;
	    } else {
		state = state_transition(state);
		iterations = 0;
	    }
	} else {
	    if (state == "MOON_EXIT") {
		// remove everything except earth and mars.
		chart.selectAll("circle").data([earth,mars]).exit().remove();

		state = state_transition(state);
	    } else {
		if (state == "MOVE_MARS") {
		    if (iterations < 10) {
			move_planet(d3.select("#mars"));
			iterations++;
		    } else {
			state = state_transition(state);		    
		    }
		}
	    }
	}
	
    }, 1500);

}


function move_planet(planet) {
    planet.
	transition().
	duration(1000)
	.attr("r", function(d) { 
	    return (d.r += 2);
	    
	})
	.attr("cy", function(d) { 
	    d.y = d.y - 5;
	    return d.y;
	    
	})
	.attr("cx", function(d) { 
	    d.x = d.x + 5;
	    return d.x;
	});

}

function state_transition(state) {
    console.log("moving from state: " + state);
    if (state == "BEGIN_STATE") {
	return log_state_transition("MOVE_EARTH");
    }
    if (state == "MOVE_EARTH") {
	return log_state_transition("MOON_EXIT");
    }
    if (state == "MOON_EXIT") {
	return log_state_transition("MOVE_MARS");
    }
    return log_state_transition("FINAL_STATE");
}

function log_state_transition(state) {
    console.log("moving to state: " + state);
    return state;
}
