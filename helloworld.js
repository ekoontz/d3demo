n// I declared these external so that I can refer to them from the Web Console for Firefox
// (or equivalent with other browsers).
var chart;
var mycircles;

var state = "BEGIN_STATE";
var iterations = 0;

var earth;
var mars;
var moon;

var simple;

var animals,friends,family;

function hello_world(dom_id) {

    console.log("Setup of the SVG chart done.");

    // 1. Simplest selector case: just an array.
    simple = d3.select("#simple");

    update_divs(simple,[4,8,15,16,23,42],
		function(d) {return d;},
		function(d) {return d;});
		

    update_divs(simple,[1,2,4,8,16,32],
		function(d) {return d;},
		function(d) {return d;});

    update_divs(simple,[8,16],
		function(d) {return d;},
		function(d) {return d;});

    update_divs(simple,[1,2,3,16], 
		function(d) {return d;},
		function(d) {return d;});

    // 2. More complex case: maps.
    animals = [
	{"name":"bear",
	 "age":10,
	 "animal_id":123
	},
	{"name":"cat",
	 "age":20,
	 "animal_id":456
	},
	{"name":"dog",
	 "age":30,
	 "animal_id":789
	}];

    // bear and cat are friends.
    friends = [ animals[0], animals[1] ];

    // cat and dog are family.
    family =  [ animals[1], animals[2] ];

    update_divs(d3.select("#structs"),

		friends,

		// index_fn: what key to use to compare items for equality.
		function(d) {return d.animal_id;},  

		// text_fn: what to display in the output div.
		function(d) {return d.name;}); 

    if (true) {
	update_divs(d3.select("#structs"),
		    
		    family,
		    
		    // index_fn: what key to use to compare items for equality.
		    function(d) {return d.animal_id;},
		    
		    // text_fn: what to display in the output div.
		    function(d) {return d.name;});
    }
    // 3. selectors as applied to SVG. 
    state = state_transition(state);

    chart = d3.select(dom_id).append("svg")
	.attr("class", "chart")
	.attr("width", 500)
	.attr("height", 300);

    earth = {"r": 50, "x": 100, "y":100, "id": "earth"};
    mars  = {"r": 35, "x": 150, "y":85, "id": "mars"};
    moon  = {"r": 15, "x": 175, "y":65, "id": "moon"};
   
    mycircles = [earth,mars,moon];

    var data_array = chart.selectAll("circle").data(mycircles,
						function(d) {return d.id;});

    data_array.enter().append("circle").
	attr("cx",function(c) {return c.x;}).
	attr("cy",function(c) {return c.y;}).
        attr("r", function(c) {return c.r;}).
        attr("id",function(c) {return c.id;});

    console.info("start state: " + state);

    return;
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
		    if (iterations < 3) {
			move_planet(d3.select("#mars"));
			iterations++;
		    } else {
			state = state_transition(state);		    
		    }
		} else {
		    if (state == "MOON_REAPPEAR") {
			console.info("MOON WILL REAPPEAR NOW AS IF BY MAGIC.");
			chart.selectAll("circle").data([moon]).enter().append();
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
    if (state == "MOVE_MARS") {
	return log_state_transition("MOON_REAPPEAR");
    }
    if (state == "MOON_REAPPEAR") {
	return log_state_transition("FINAL_STATE");
    }
    return log_state_transition("FINAL_STATE");
}

function log_state_transition(state) {
    console.log("moving to state: " + state);
    return state;
}

function update_divs(dom_node, newdata_array, index_fn,
		     text_fn) {
    console.log("pre:" + html_appearance(dom_node));
    console.log("adding new data:  " + newdata_array.map(text_fn));

    var newdata = dom_node.selectAll("div").data(newdata_array,index_fn);

    // Add items unique to input_data.
    newdata.enter().append("div").text(text_fn);

    // This doesn't actually transition because style is an attribute,
    // while background color is simply part of the style value: d3 doesn't
    // try to analyze within it apparently:
    // Only with SVG will we be able to modify the object's appearance with
    // given attributes (e.g. .attr("x",500)).

    newdata.transition()
	.duration(5000)
	.attr("style", function(d, i) { return "background:lightgreen"; });

    console.log("post-append, pre-remove:" + html_appearance(dom_node));

    // Remove items not in new data.
    newdata.exit().remove();

    console.log("post:" + html_appearance(dom_node));
}

// get the innerHTML of every <div> in the given dom_node and return as a string.
function html_appearance(dom_node) {
    return dom_node.selectAll("div")[0].
	map(function(d) {return d.innerHTML;});

}
