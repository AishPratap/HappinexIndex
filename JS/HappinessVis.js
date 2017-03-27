/**
 * Created by aishpratap on 2/20/17.
 */
// var width = 100%,
//     height = 100%;


var $container = $('#happiness-map');
var width = $container.width();
var height = $container.height();


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

var svg_scatterplot = d3.select('#scatter-map').append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr("width", '100%')
    .attr("height", '100%');

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

d3.queue()
    .defer(d3.json, "./Resources/world.json")
    .defer(d3.csv, "./Data/Datasource.csv", function(d) { happiness.set(d.Id, d); })
    .await(ready);

function ready(error, data) {

    var countries = topojson.feature(data, data.objects.countries).features;

    createChoropleth(error, countries);
    createScatterPlot(error, countries);
}

function createChoropleth(error, data){



    g.selectAll(".countries")
        .data(data)
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
        .data(data)
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

function createScatterPlot(error, data) {


    svg_scatterplot.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {

            countryData = happiness.get(d.id);

            console.log(countryData);

            if (countryData == undefined)
                return 0;

            return countryData.CIndex;
        })
        .attr("cy", function (d) {
            countryData = happiness.get(d.id);

            if (countryData == undefined)
                return 0;

            return countryData.HScore;
        })
        .attr("r", 5);

}