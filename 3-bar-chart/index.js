import { select, csv } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    svg.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('width', 300)
            .attr('height', 300)
};


csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
    // console.log(data)
    render(data);
});