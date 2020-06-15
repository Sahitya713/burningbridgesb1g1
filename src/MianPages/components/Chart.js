



import React, {Component} from "react"
import * as d3 from "d3"
// import crow from "./animals/crow.svg"
// import cock from "./animals/cock.svg"
// import camel from "./animals/camel.svg"
// import cat from "./animals/cat.svg"
// import dino from "./animals/dino.svg"
// import dog from "./animals/dog.svg"
// import elephant from "./animals/elephant.svg"
// import owl from "./animals/owl.svg"
// import rabbit from "./animals/rabbit.svg"
// import reindeer from "./animals/reindeer.svg"
// import squirrel from "./animals/squirrel.svg"

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
  
    componentDidMount() {
    const dataset = (this.props.data[0].qualitylvls).slice(0,5).reverse();
    const labels = (this.props.data[0].qualities).slice(0,5).reverse();

    let negative = []
    for (var i = 0; i< labels.length; i++) {
        if (labels[i].includes("(-)")) { 
            negative.push(i);
            labels[i] = labels[i].substring(3)}

    }
    var margin = {
        top: 10,
        right: 4,
        bottom: 0,
        left: 100
    };
    var width = 460 - margin.left - margin.right,
        height = 190 - margin.top - margin.bottom;
    var svg = d3
        .select(this.refs.chart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // .attr("class", "bar");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(dataset)]);

    var y = d3.scaleBand()
        .rangeRound([height, 0])
        .padding(0.1)
        .domain(labels);
    
    var yAxis = d3.axisLeft(y)
        //no tick marks
        .tickSize(0)
        
    
    svg.append("g")
        .attr("class", "y axis")
        .style("font-family","Ubuntu")
        .style("font-size", "15px")
        .style("font-weight", "bold")
        .style("color", "black")
        .call(yAxis)
    
    // var filter = svg.append("filter")
    //     .attr("id", "drop-shadow");
    //     // .attr("height", "125%")
    //     // .attr("width", "150%");
    // filter.append("feColorMatrix")
    //         .attr("type", "matrix")
    //         .attr("values","0 0 0 1 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0");
    // filter.append("feGaussianBlur")
    //     .attr("in", "SourceAlpha")
    //     .attr("stdDeviation", 1)
    //     .attr("result", "colouredBlur");

    // filter.append("feOffset")
    //     // .attr("fill", "#00B4EB")
    //     .attr("in", "blur")
    //     .attr("dx", 1)
    //     .attr("dy", 2)
    //     .attr("result", "offsetBlur");

    // var feMerge = filter.append("feMerge");

    // feMerge.append("feMergeNode")
    //     .attr("in", "offsetBlur");
    // feMerge.append("feMergeNode")
    //     .attr("in", "SourceGraphic");
    var bars = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("g")
    bars.append("rect")
        .attr("fill", (d,i) => negative.includes(i) ? "#FFAA00": "#00B4EB")
        .attr("class", "bar")
        .attr("y", function (d,i) {
            return y(labels[i]);})
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d);
        })
        // .style("filter", "url(#drop-shadow)")
        
        .append("title")
        .text(d => "score: " + d)

        
    }
    render() {
        // let images = [cock, crow, dog, dino, elephant, cat, camel, owl, rabbit, reindeer, squirrel];
        // const image = images[Math.floor(images.length * Math.random())]
        return (
            <div className="score-wrap">
                {/* <img className="animal" src={image} alt=""/> */}
                <div ref="chart"></div>
                <h1 className= "player">{this.props.player}</h1>
            </div>
        
        );
    }
  }






export default Chart;
