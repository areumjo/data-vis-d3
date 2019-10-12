import { select, arc } from 'd3';
// use ES6 syntax to import select module from d3

const svg = select('svg');

// can extract value from index.html
const width = parseFloat(svg.attr('width')); //960 as a string, need to convert to num
const height = +svg.attr('height'); //500, + mean same as parseFloat
// console.log(typeof width, 'hey:', width); //num

// d3 method chaining
const circle = svg.append('circle')
    .attr('r', height / 2)
    .attr('cx', width / 2 )
    .attr('cy', height / 2)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

const eyeSpacing = 100;
const eyeYOffset = -70;

const leftEye = svg.append('circle')
    .attr('r', 30)
    .attr('cx', width / 2 - eyeSpacing)
    .attr('cy', height / 2 + eyeYOffset)
    .attr('fill', 'black');

const rightEye = svg.append('circle')
    .attr('r', 30)
    .attr('cx', width / 2 + eyeSpacing)
    .attr('cy', height / 2 + eyeYOffset)
    .attr('fill', 'black');

const g = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`);

const mouth = g.append('path')
    .attr('d', arc()({
        innerRaius: 150,
        outerRadius: 170,
        startAngle: 0,
        endAngle: Math.PI * 3/2
    }))