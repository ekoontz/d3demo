// :color is a float in the range [0,1). 
// d3.interpolateRgb() is used (within streamgraph()) to convert this value into a CSS color code.
var regionload_over_time = [
    // regionserver 1: a reliable workhorse that has never gone down.
    [{x:0, y:5, y0:0, color:0.0},
     {x:1, y:5, y0:0}, 
     {x:2, y:6, y0:0}, 
     {x:3, y:4, y0:0},
     {x:4, y:7, y0:0},
     {x:5, y:8, y0:0}],

    // regionserver 2: the "comeback kid": goes down but comes up again.
    [{x:0, y:7, y0:0, color:0.3},
     {x:1, y:7, y0:0}, 
     {x:2, y:2, y0:0}, 
     {x:3, y:0, y0:0},
     {x:4, y:8, y0:0},
     {x:5, y:12, y0:0}],

    // regionserver 3: a box that starts off well but sadly, crashes and
    // never comes back up.
    // the other machines, regionservers 1 and 2, had to pick up its load.
    [{x:0, y:10, y0:0, color:0.7}, 
     {x:1, y:10, y0:0}, 
     {x:2, y:11, y0:0},
     {x:3, y:0,  y0:0}, 
     {x:4, y:0,  y0:0},
     {x:5, y:0,  y0:0}]

];

var simpler_data_format = [
    [5,5,6,4,7,8],
    [7,7,2,0,8,12],
    [10,10,11,0,0,0]];

console.info("TRY:");
console.info(simpler_data_format
	     .map(function 
		  expand_one_server_history(hist) {
		      var retval = [];
		      var t;
		      var mycolor = 1.0 / (t+1.0);
		      for (t in hist) {
			  t = parseFloat(t);
			  if (t == 0) {
			      retval.push({x: t, y: hist[t], y0:0, color: 420000});
			  } else {
			      retval.push({x: t, y: hist[t], y0:0});
			  }
		      }
		      return retval;
		  }));

console.info("CORRECT:");
console.info(regionload_over_time);

streamgraph("#rsload", regionload_over_time);
