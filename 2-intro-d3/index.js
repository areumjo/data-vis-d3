import { select, arc } from 'd3';
// use ES6 syntax to import select module from d3

const svg = select('svg');

// can extract value from index.html
const width = parseFloat(svg.attr('width')); //960 as a string, need to convert to num
const height = +svg.attr('height'); //500, + mean same as parseFloat
// console.log(typeof width, 'hey:', width); //num

const g = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`);

// d3 method chaining
const circle = svg.append('circle')
    .attr('r', height / 2)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRaius = 30;

const eyesG = g.append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`);

const leftEye = eyesG.append('circle')
    .attr('r', eyeRaius)
    .attr('cx', -eyeSpacing);

const rightEye = eyesG.append('circle')
    .attr('r', eyeRaius)
    .attr('cx', eyeSpacing);

const mouth = g.append('path')
    .attr('d', arc()({
        innerRaius: 150,
        outerRadius: 170,
        startAngle: 0,
        endAngle: Math.PI * 3/2
    }))