import { select, csv, scaleLinear, max, scaleBand } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;
    
    // xScale is an instance of linear scale and set domain, range using method chaining
    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, width]);
    console.log('domain: ', xScale.domain(), 'range: ', xScale.range());

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, height]);

    svg.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            // .attr('width', d => xScale(d=>d.population))
            .attr('height', yScale.bandwidth())
};


csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
    // console.log(data)
    render(data);
});