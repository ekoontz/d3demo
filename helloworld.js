// I declared these external so that I can refer to them from the Web Console for Firefox
// (or equivalent with other browsers).

var background = "white";

var radius = 35;
var game_width = 1000;
var game_height = 500;
var offset=25;
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
var otter = animals[2];
var dog   = animals[3];
var wolf  = animals[4];
var snake = animals[5];
var cow   = animals[6];
var gecko = animals[7];

// bear and cat.
var friends = [ animals[0], animals[1] ,animals[2] ];

// dog and cat.
var family =  [ animals[2], animals[3] ];

// dog and wolf
var canine = [ animals[3], animals[4] ];

// bear and otter and wolf and snake.
var wild =  [ animals[0], animals[1] , animals[4], animals[5], animals[7] ];

var mammals = [ animals[0], animals[1], animals[2], animals[3], animals[4], animals[6] ];

var reptiles = [ animals[5],animals[7]];

var pets = [animals[2],animals[3],animals[5],animals[7]];

var set_of_maps = [ {"name":"friends",
		     "animals":[ bear, otter, cat ]},
		    {"name":"family",
		     "animals": [ dog,  cat ]},
		    {"name":"canine",
		     "animals": [ wolf, dog ]},
		    {"name":"wild",
		     "animals":[ bear, otter, wolf, snake ]},
		    {"name":"mammals",
		     "animals": [bear, otter, cat, dog, wolf, cow ]},
		    {"name":"reptiles",
		     "animals":[snake, gecko]},
		    {"name":"pets",
		     "animals":[dog, cat, snake, cow]}];

function random_set() {
    var choice_i = Math.floor(Math.random()*(set_of_maps.length));
    var set_name = set_of_maps[choice_i].name;
    d3.select("#status").html("New set chosen: " + set_name);
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
    var index_fn = function(d) {return d.animal_id;};
    // show the next set in animal_sets.
    var animal_set = random_set();
//    console.log("group name:" + animal_set.name);
//    console.log("animal set:" + animal_set);
//    console.log("animal keys:" + keys(animal_set));
    console.log("new animal set:" + animal_set.animals.map(function(e) {return e.name;}));
    update_svg(svg,animal_set,index_fn);
	
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
    var to_add = newset;
    var i;
    if (existing != null) {
	to_add = [];
	console.log("existing   :" + existing.map(function(d) {return d.name + "/" + d.animal_id;}));
	for(i = 0; i < existing.length; i++) {
	    console.log("checking for needle: " + existing[i] + " in haystack: " + newset);
	    if (find_animal(existing[i],newset)) {
		keep.push(existing[i]);
	    }
	}

	for(i = 0; i < newset.length; i++) {
	    console.log("checking for needle: " + newsset[i] + " in haystack: " + exiting);
	    if (find_animal(newset[i],existing) == false) {
		to_add.push(newset[i]);
	    }
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
//    console.log("new group:" + 
//		newdata_array.name);
    var newdata_array = complement(existing,newdata_array.animals,svg.selectAll("circle"));
    var newdata = svg.selectAll("circle").data(newdata_array,index_fn);

    // Add items unique to input_data.
    newdata.enter().append("circle").
	attr("cx",function(c) {
//	    console.log("appending: " + c.name);
	    return c.x;
	}).
	attr("cy",function(c) {return -50;}).
        attr("r", function(c) {return radius;}).
	attr("class",function(c) {
//	    console.log("adding: " + c.name);
	    return c.name;
	}).
	transition().duration(1000).
	attr("cy",140);
    
    // Remove items not in new data.
    newdata.exit().transition().duration(2500)
        .style("fill",background)   // fill to white: fade to background
	.attr("cy",
	      function(animal) {
//		  console.log("removing:" + animal.name);
		  return 800;
	      }).remove();

    existing = newdata_array.animals;
}
