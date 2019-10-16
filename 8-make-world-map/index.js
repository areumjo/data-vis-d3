const svg = d3.select('svg');

const projection = d3.geoEquirectangular();
const pathGenerator = d3.geoPath().projection(projection);

// title
d3.select('body').append('text')
  .attr('class', 'title')
  .attr('x', 0)
  .attr('y', 0)
  .text('World map')

// new group
const g = svg.append('g');

g.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({type: 'Sphere'}));

d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(data => {
    // console.log(data);
    // console.log(data.objects.countries); // "GeometryCollection"
    const countries = topojson.feature(data, data.objects.countries);
    // console.log({countries}); // "FeatureCollection"
    svg.selectAll('path').data(countries.features)
      .enter().append('path')
        .attr('class', "country")
        .attr('d', pathGenerator);
});