/**
 * Created by aishpratap on 2/20/17.
 */
// var width = 100%,
//     height = 100%;


var $container = $('#happiness-map');
var width = $container.width();
var height = $container.height();

console.log(width, height);

var projection = d3.geo.mercator()
    .center([0, 20 ])
    .scale(150)
    .rotate([0,0]);

var svg = d3.select('#happiness-map').append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox', '0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin');

var svg1 = d3.select('#corruption-map').append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox', '0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin');

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g")
    .attr('display', 'block')
    .attr('margin', 'auto');

var g1 = svg1.append("g")
    .attr('display', 'block')
    .attr('margin', 'auto');

// load and display the World
d3.json("./Resources/world.json", function(error, topology) {
    g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries)
            .geometries)
        .enter()
        .append("path")
        .attr("d", path)
});

d3.json("./Resources/world.json", function(error, topology) {
    g1.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries)
            .geometries)
        .enter()
        .append("path")
        .attr("d", path)
});

// zoom and pan
// var zoom = d3.behavior.zoom()
//     .on("zoom",function() {
//         g.attr("transform","translate("+
//             d3.event.translate.join(",")+")scale("+d3.event.scale+")");
//         g.selectAll("path")
//             .attr("d", path.projection(projection));
//     });
//
// svg.call(zoom);
