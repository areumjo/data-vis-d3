const svg = d3.select('svg');

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

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