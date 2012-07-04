// I declared these external so that I can refer to them from the Web Console for Firefox
// (or equivalent with other browsers).
var chart;
var mycircles;

var state = "BEGIN_STATE";
var iterations = 0;
var spread_x = 0;
var earth;
var mars;
var moon;

var simple;

function hello_world(dom_id) {

    var animals = [
	{"name":"bear",
	 "age":10,
	 "animal_id":1,
	 "x":25
	},
	{"name":"otter",
	 "age":15,
	 "animal_id":2,
	 "x":85
	},
	{"name":"cat",
	 "age":20,
	 "animal_id":3,
	 "x":150
	},
	{"name":"dog",
	 "age":30,
	 "animal_id":4,
	 "x":210
	},
	{"name":"wolf",
	 "age":35,
	 "animal_id":5,
	 "x":270
	}
    ];

    // bear and cat.
    var friends = [ animals[0], animals[1] ,animals[2] ];
    
    // dog and cat.
    var family =  [ animals[2], animals[3] ];

    // dog and wolf
    var canine = [ animals[3], animals[4] ];

    // bear and otter and wolf.
    var wild =  [ animals[0], animals[1] , animals[4] ];

    var svg = d3.select("#simple_svg").append("svg")
	.attr("class", "chart")
	.attr("width", 500)
	.attr("height", 100);

    cycle_through_animals([
	friends,family,friends
    ],
			  svg);

}

function cycle_through_animals(animal_sets,svg) {
    if (animal_sets.length > 0) {
	// index_fn: what key to use to compare items for equality.
	var index_fn = function(d) {return d.animal_id;};
	
	// text_fn: what to display in the output SVG circle.
	var text_fn = function(d) {return d.name;};
	
	// show the next set in animal_sets.
	var animal_set = animal_sets.shift();

	console.log("switching to set:" + animal_set.map(text_fn));

	d3.select("#status").html("SET IS: " + animal_set.map(text_fn));

	update_svg(svg,animal_set,index_fn,text_fn);
	
	setInterval(function() {
	    cycle_through_animals(animal_sets,svg);
	}, 2000);
    } else {
	console.log("DONE.");
	return false;
    }
}

function update_svg(svg, newdata_array, index_fn,
		    text_fn) {
    var newdata = svg.selectAll("circle").data(newdata_array,index_fn);

    // Add items unique to input_data.
    newdata.enter().insert("circle").
	attr("cx",function(c) {
	    return c.x;
	}).
	attr("cy",function(c) {return -100;}).
        attr("r", function(c) {return 25;}).
	transition().
	duration(1000).
	attr("cy",65);

    
    var newlabels = svg.selectAll("text").data(newdata_array,index_fn);
    newlabels.enter().append("text").
	attr("x",function(c) {
	    return c.x - 10;}).
	attr("y",function(c) {return -100;}).
        attr("r", function(c) {return 25;}).
	text(text_fn).
	transition().
	duration(2000).
	attr("y",65);

//    newdata.transition().duration(1000).attr("cy",function(c) {return c.cy - 25;});

    // Remove items not in new data.
    newdata.exit().transition().duration(3000).attr("cy",-100).remove();

    // Remove labels not in new data.
    newlabels.exit().transition().duration(3000).attr("y",-100).remove();
}
