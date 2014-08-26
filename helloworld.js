// I declared these external so that I can refer to them from the Web Console for Firefox
// (or equivalent with other browsers).

var animals = [
    {"name":"bear",  // 0
     "x":25
    },
    {"name":"otter", // 1
     "x":85
    },
    {"name":"cat",   // 2
     "x":150
    },
    {"name":"dog",   // 3
     "x":210
    },
    {"name":"wolf",  // 4
     "x":270
    },
    {"name":"snake", // 5
     "x":330
    },
    {"name":"cow",   // 6
     "x":390
    },
    {"name":"gecko",// 7
     "x":450
    }

];

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

var sets = [ friends, family, canine, wild, mammals, reptiles, pets];

function hello_world(dom_id) {
    var svg = d3.select("#simple_svg").append("svg")
	.attr("class", "chart")
	.attr("width", 500)
	.attr("height", 300);
    show_animal_set(svg);
    setInterval(function() {
	show_animal_set(svg);
    },2500);
}

function random_set() {
    var choice = Math.floor(Math.random()*sets.length);
    return make_set(sets[choice]);
}

var current_animal_id = 0;

function make_set(set) {
    return set.map(function(x) {
	return {"name": x.name,
		"x": x.x,
		"animal_id": current_animal_id++
	       };
    });
}

function show_animal_set(svg) {
    // index_fn: what key to use to compare items for equality.
    var index_fn = function(d) {return d.animal_id;};
    
    // text_fn: what to display in the output SVG circle.
    var text_fn = function(d) {return d.name;};
    
    // show the next set in animal_sets.
    var animal_set = random_set();
    
//    console.log("switching to set:" + animal_set.map(text_fn));
    
    d3.select("#status").html("Now entering: " + animal_set.map(text_fn));
    
    update_svg(svg,animal_set,index_fn,text_fn);
	
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
	    if (find_animal(existing[i],newset)) {
		keep.push(existing[i]);
	    }
	}

	for(i = 0; i < newset.length; i++) {
	    if (find_animal(newset[i],existing) == false) {
		to_add.push(newset[i]);
	    }
	}
    }

    var retval = [];
    for(i = 0; i < keep.length; i++) {
	retval.push(keep[i]);
    }
    to_add = make_set(to_add);
    for(i = 0; i < to_add.length; i++) {
	retval.push(to_add[i]);
    }

    return retval;
}

function update_svg(svg, newdata_array, index_fn,
		    text_fn) {
    var newdata_array = complement(existing,newdata_array,svg.selectAll("circle"));

    var newdata = svg.selectAll("circle").data(newdata_array,index_fn);

    // Add items unique to input_data.
    newdata.enter().append("circle").
	attr("cx",function(c) {
	    console.log("appending: " + c.name + "/" + c.animal_id);
	    return c.x;
	}).
	attr("cy",function(c) {return -50;}).
        attr("r", function(c) {return 25;}).
	style("stroke","white").
	style("fill","white").
	transition().duration(2000).
	style("stroke","lightgreen").
	style("fill","lightgreen").
	attr("cy",140);
    
    var newlabels = svg.selectAll("text").data(newdata_array,index_fn);
    newlabels.enter().append("text").
	attr("x",function(c) {
	    return c.x - 10;}).
	attr("y",function(c) {return -50;}).
        attr("r", function(c) {return 25;}).
	style("stroke","white").
	style("fill","white").
	text(text_fn).
	transition().duration(2000).
	style("stroke","#666").
	style("fill","#666").
	attr("y",143);

    // Remove items not in new data.
    newdata.exit().transition().duration(2500)
        .style("fill","white")
        .style("stroke","white")
	.attr("cy",
	      function(animal) {
		  console.log("removing:" + animal.name + "/" + animal.animal_id);
		  return 1500;
	      }).remove();

    // Remove labels not in new data.
    newlabels.exit().transition().duration(2500)
        .style("stroke","white")
        .style("fill","white")
	.attr("y",1200).remove();

    existing = newdata_array;
}
