// I declared these external so that I can refer to them from the Web Console for Firefox
// (or equivalent with other browsers).

var background = "white";

var radius = 35;
// TODO: get width and height of #game from DOM, not hardcoded.
var game_width = 1000;
var game_height = 500;
var offset=0;
var animals = [
    {"name":"bear",
     "x":50+offset
    },
    {"name":"cat",
     "x":150+offset
    },
    {"name":"cow",
     "x":250+offset
    },
    {"name":"dog",
     "x":350+offset
    },
    {"name":"gecko",
     "x":450+offset
    },
    {"name":"otter",
     "x":550+offset
    },
    {"name":"snake",
     "x":650+offset
    },
    {"name":"wolf",
     "x":750+offset
    }
];

var bear  = animals[0];
var cat   = animals[1];
var cow   = animals[2];
var dog   = animals[3];
var gecko = animals[4];
var otter = animals[5];
var snake = animals[6];
var wolf  = animals[7];

var set_of_maps = [ {"name":"friends",
		     "animals":[bear, cat, otter]},
		    {"name":"family",
		     "animals":[dog,  cat]},
		    {"name":"canine",
		     "animals":[dog, wolf]},
		    {"name":"wild",
		     "animals":[bear, otter, snake, wolf]},
		    {"name":"mammals",
		     "animals":[bear, cat, cow, dog, otter, wolf]},
		    {"name":"reptiles",
		     "animals":[gecko, snake]},
		    {"name":"pets",
		     "animals":[cat, dog, snake]}];

function random_set() {
    var choice_i = Math.floor(Math.random()*(set_of_maps.length));
    var set_name = set_of_maps[choice_i].name;
    d3.select("#status").html("New set chosen: " + set_name + " with: " + set_of_maps[choice_i].animals.map(function(a) {return a.name;}));
    return set_of_maps[choice_i];
}

function startgame(dom_id) {
    var svg = d3.select("#game-svg");
    show_animal_set(svg);
    setInterval(function() {
	show_animal_set(svg);
    },5500);
}

function keys(arg) {
    return Object.keys(arg);
}

function show_animal_set(svg) {
    // index_fn: what key to use to compare items for equality.
    var index_fn = function(d) {return d.name;};
    // show the next set in animal_sets.
    var animal_set = random_set();
    console.log("new animal set:" + animal_set.name + "(" + animal_set.animals.map(function(e) {return e.name;}) + ")");
    update_svg(svg,animal_set.animals,index_fn);
	
}
var existing = null;

function find_animal(needle,haystack) {
    var i = 0;
    for(i = 0; i < haystack.length; i++) {
	if (needle.name == haystack[i].name) {
	    return true;
	}
    }
    return false;
}

function complement(existing,newset) {
    var keep = [];
    var to_add = [];
    var i;
    if (existing == null) {
	return newset;
    } 

    console.log("complement: existing set: " + existing.map(function(a){return a.name;}));
    for(i = 0; i < existing.length; i++) {
	if (find_animal(existing[i],newset)) {
	    console.log("keeping existing: " + existing[i].name + " since it is also in the new set.");
	    keep.push(existing[i]);
	} else {
	    console.log("removing existing animal:" + existing[i].name);
	}
    }
    for(i = 0; i < newset.length; i++) {
	if (find_animal(newset[i],existing) == false) {
	    console.log("introducing new animal:" + newset[i].name);
	    to_add.push(newset[i]);
	    } else {
		console.log(newset[i].name + " is already in set - don't re-add.");
	    }
    }

    var retval = [];

    for(i = 0; i < keep.length; i++) {
	retval.push(keep[i]);
    }

    for(i = 0; i < to_add.length; i++) {
	retval.push(to_add[i]);
    }

    return retval;
}

function update_svg(svg, newdata_array, index_fn) {
    if (existing) {
	console.log("existing:" + 
		    existing.map(function(a){return a.name;}));
    }
    console.log("new group:" + 
		newdata_array.map(function(a){return a.name;}));

    var introduce = complement(existing,newdata_array,svg.selectAll("circle"));
    console.log("introducing:" + 
		introduce.map(function(a){return a.name;}));
    var newdata = svg.selectAll("circle").data(introduce,index_fn);

    // Add items unique to input_data.
    newdata.enter().append("circle").
	attr("cx",function(c) {
	    return c.x;
	}).
	attr("cy",function(c) {return -50;}).
        attr("r", function(c) {return radius;}).
	attr("class",function(c) {
	    return c.name;
	}).
	transition().duration(1000).
	attr("cy",140);
    
    // Remove items not in new data.
    newdata.exit().transition().duration(2500)
        .style("fill",background)   // fill to white: fade to background
	.attr("cy",
	      function(animal) {
		  return 800;
	      }).remove();

    existing = newdata_array;
}
