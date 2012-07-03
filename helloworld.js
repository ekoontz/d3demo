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

var animals,friends,family;

function hello_world(dom_id) {

    console.log("Setup of the SVG chart done.");

    // 2. More complex case: maps.
    animals = [
	{"name":"bear",
	 "age":10,
	 "animal_id":123,
	 "x":25
	},
	{"name":"otter",
	 "age":15,
	 "animal_id":1234,
	 "x":85
	},
	{"name":"cat",
	 "age":20,
	 "animal_id":456,
	 "x":150
	},
	{"name":"dog",
	 "age":30,
	 "animal_id":789,
	 "x":210
	}];

    // bear and cat and otter are friends.
    friends = [ animals[0], animals[1] ,animals[2] ];

    // cat and dog are family.
    family =  [ animals[2], animals[3] ];

    var svg = d3.select("#simple_svg").append("svg")
	.attr("class", "chart")
	.attr("width", 500)
	.attr("height", 100);

    // first show friends.
    update_svg(svg,
	       
	       friends,
	       
	       // index_fn: what key to use to compare items for equality.
	       function(d) {return d.animal_id;},  
	       
	       // text_fn: what to display in the output SVG circle.
	       function(d) {return d.name;});

    // then show friends.
    update_svg(svg,
	       
	       family,
	       
	       // index_fn: what key to use to compare items for equality.
		   function(d) {return d.animal_id;},  
	       
	       // text_fn: what to display in the output SVG circle.
		   function(d) {return d.name;}
	      );

    // then just cat.
    if (false) {
    update_svg(svg,
	       
	       [ animals[2] ],
	       
	       // index_fn: what key to use to compare items for equality.
		   function(d) {return d.animal_id;},  
	       
	       // text_fn: what to display in the output SVG circle.
		   function(d) {return d.name;}
	      );}

}

function update_svg(svg, newdata_array, index_fn,
		    text_fn) {
    var newdata = svg.selectAll("circle").data(newdata_array,index_fn);

    // Add items unique to input_data.
    newdata.enter().append("circle").
	attr("cx",function(c) {
	    return c.x;
	}).
	attr("cy",function(c) {return 45;}).
        attr("r", function(c) {return 25;});
    
    var newlabels = svg.selectAll("text").data(newdata_array,index_fn);
    newlabels.enter().append("text").
	attr("x",function(c) {
	    return c.x;}).
	attr("y",function(c) {return 45;}).
        attr("r", function(c) {return 25;}).
	text(text_fn);


    // Remove items not in new data.
    newdata.exit().transition().duration(3000).attr("cy",-100).remove();


    // Remove items not in new data.
    newlabels.exit().transition().duration(3000).attr("y",-100).remove();

    console.log("/update_svg.");
}

function update_divs(dom_node, newdata_array, index_fn,
		     text_fn) {
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

    // Remove items not in new data.
    newdata.exit().remove();
}

// get the innerHTML of every <div> in the given dom_node and return as a string.
function html_appearance(dom_node) {
    return dom_node.selectAll("div")[0].
	map(function(d) {return d.innerHTML;});

}
