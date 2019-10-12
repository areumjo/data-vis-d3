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

    const eyebrowWidth = 70;
    const eyebrowHeight = 16;
    const eyebrowYOffset = -70;
    
    const eyebrowsG = eyesG.append('g')
        .attr('transform', `translate(0, ${eyebrowYOffset})`);
    
     eyebrowsG
        .transition().duration(2000)
          .attr('transform', `translate(0, ${eyebrowYOffset - 50})`)
        .transition().duration(2000)
          .attr('transform', `translate(0, ${eyebrowYOffset})`);
    
    const leftEyebrow = eyebrowsG.append('rect')
        .attr('x', -eyeSpacing - eyebrowWidth/2)
        .attr('width', eyebrowWidth)
        .attr('height', eyebrowHeight);
    
    const rightEyebrow = eyebrowsG
      .append('rect')
        .attr('x', eyeSpacing - eyebrowWidth/2)
        .attr('width', eyebrowWidth)
        .attr('height', eyebrowHeight);
        
    const mouth = g.append('path')
        .attr('d', d3.arc()({
            innerRadius: 150,
            outerRadius: 170,
            startAngle: Math.PI / 2,
            endAngle: Math.PI * 3 / 2
        }));
}(d3));