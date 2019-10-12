(function (d3) {
    'use strict';

    const svg = d3.select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {
        svg.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('width', 300)
                .attr('height', 300);
    };


    d3.csv('data.csv').then(data => {
        data.forEach(d => {
            d.population = +d.population * 1000;
        });
        // console.log(data);
        render(data);
    });

}(d3));