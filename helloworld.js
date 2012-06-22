// make these external so that we can refer to them from the Web Console for Firefox
// (or equivalent with other browsers).
var chart_box;
var chart;
var mycircles;
function hello_world() {
    // console.info() is very useful for debugging.
    console.info("HELLO!");
    mycircles = [{r: 100, x: 100, y:100}];
    chart.selectAll("circle").data(mycircles).enter().append("circle").attr("cx",50).attr("cy",50).attr("r",50);
}

