(function (d3) {
    const svg = d3.select('svg');

    const width = parseFloat(svg.attr('width')); //960 as a string, need to convert to num
    const height = +svg.attr('height'); //500, + mean same as parseFloat
    
    const g = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`);

    const circle = g.append('circle')
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
        .attr('d', d3.arc()({
            innerRadius: 150,
            outerRadius: 170,
            startAngle: Math.PI / 2,
            endAngle: Math.PI * 3 / 2
        }));
}(d3));