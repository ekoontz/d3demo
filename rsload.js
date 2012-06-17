var region_load_report = 
    [
	{"hostname":"rs1","regions":11},
	{"hostname":"rs2","regions":7},
	{"hostname":"rs3","regions":12},
	{"hostname":"rs4","regions":3}
    ];

bar_chart("#rsload", region_load_report, 
	  function to_x(regionserver) {return regionserver.hostname;},
	  function to_y(regionserver) {return regionserver.regions;});
