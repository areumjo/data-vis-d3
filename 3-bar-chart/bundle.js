(function (d3) {
    'use strict';

    const svg = d3.select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {
        const xValue = d => d.population;
        const yValue = d => d.country;
        
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, xValue)])
            .range([0, width]);
        console.log('domain: ', xScale.domain(), 'range: ', xScale.range());

        const yScale = d3.scaleBand()
            .domain(data.map(yValue))
            .range([0, height]);

        svg.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('y', d => yScale(yValue(d)))
                .attr('width', d => xScale(xValue(d)))
                .attr('height', yScale.bandwidth());
    };


    d3.csv('data.csv').then(data => {
        data.forEach(d => {
            d.population = +d.population * 1000;
        });
        render(data);
    });

}(d3));