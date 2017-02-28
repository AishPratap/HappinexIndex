/**
 * Created by aishpratap on 2/20/17.
 */
// var width = 100%,
//     height = 100%;


var $container = $('#happiness-map');
var width = $container.width();
var height = $container.height();

console.log(width, height);

// var x = d3.scaleLinear()
//     .domain([1, 10])
//     .rangeRound([600, 860]);
//
var happinessColor = d3.scaleThreshold()
    .domain(d3.range(2, 10))
    .range(d3.schemeGreens[6]);

var corruptionColor = d3.scaleThreshold()
    .domain(d3.range(0, 8.2))
    .range(d3.schemeReds[6]);

var projection = d3.geoMercator()
    .center([20 , 30 ])
    .scale(140)
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


var happiness = d3.map();

var path = d3.geoPath()
    .projection(projection);


var g = svg.append("g")
    .attr('display', 'block')
    .attr('margin', 'auto');
//
var g1 = svg1.append("g")
    .attr('display', 'block')
    .attr('margin', 'auto');
//
// g.selectAll("rect")
//     .data(color.range().map(function(d) {
//         d = color.invertExtent(d);
//         if (d[0] == null) d[0] = x.domain()[0];
//         if (d[1] == null) d[1] = x.domain()[1];
//         return d;
//     }))
//     .enter().append("rect")
//     .attr("height", 8)
//     .attr("x", function(d) { return x(d[0]); })
//     .attr("width", function(d) { return x(d[1]) - x(d[0]); })
//     .attr("fill", function(d) { return color(d[0]); });
//
// g.append("text")
//     .attr("class", "caption")
//     .attr("x", x.range()[0])
//     .attr("y", -6)
//     .attr("fill", "#000")
//     .attr("text-anchor", "start")
//     .attr("font-weight", "bold")
//     .text("Happiness Index");
//
// g1.append("text")
//     .attr("class", "caption")
//     .attr("x", x.range()[0])
//     .attr("y", -6)
//     .attr("fill", "#000")
//     .attr("text-anchor", "start")
//     .attr("font-weight", "bold")
//     .text("Corruption Index");

// g.call(d3.axisBottom(x)
//     .tickSize(13)
//     .tickFormat(function(x, i) { return i ? x : x + "%"; })
//     .tickValues(color.domain()))
//     .select(".domain")
//     .remove();
//
// g1.call(d3.axisBottom(x)
//     .tickSize(13)
//     .tickFormat(function(x, i) { return i ? x : x + "%"; })
//     .tickValues(color.domain()))
//     .select(".domain")
//     .remove();

// load and display the World

d3.queue()
    .defer(d3.json, "./Resources/world.json")
    .defer(d3.csv, "./Data/Datasource.csv", function(d) { happiness.set(d.Id, d); })
    // .defer(d3.csv, "./Data/CPI_2015.csv", function(d) { corruption.set(d.id, +d.CPI2015); })
    .await(ready);

function ready(error, data) {

    var countries = topojson.feature(data, data.objects.countries).features;

    g.selectAll(".countries")
        .data(countries)
        .enter().append("path")
        .attr("class", "countries")
        .attr("d", path)
        .attr("fill", function(d) {

            object = happiness.get(d.id);

            if (object == undefined)
                return "grey";

            return happinessColor(d.rate = +object.HScore);
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '0.25');

    g1.selectAll(".countries")
        .data(countries)
        .enter().append("path")
        .attr("class", "countries")
        .attr("d", path)
        .attr("fill", function(d) {

            object = happiness.get(d.id);

            if (object == undefined)
                return "grey";

            return corruptionColor(d.rate = 9.2 - (+object.CIndex/10));
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '0.25');
}


// d3.json("./Resources/world.json", function(error, topology) {
//     g.selectAll("path")
//         .data(topojson.object(topology, topology.objects.countries)
//             .geometries)
//         .enter()
//         .append("path")
//         .attr("d", path)
// });
//
// d3.json("./Resources/world.json", function(error, topology) {
//     g1.selectAll("path")
//         .data(topojson.object(topology, topology.objects.countries)
//             .geometries)
//         .enter()
//         .append("path")
//         .attr("d", path)
// });

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
