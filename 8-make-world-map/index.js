const svg = d3.select('svg');

const projection = d3.geoEquirectangular();
const pathGenerator = d3.geoPath().projection(projection);

// new group
const g = svg.append('g');

g.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({type: 'Sphere'}));

// zoom
svg.call(d3.zoom().on('zoom', () => {
  g.attr('transform', d3.event.transform);
}));

// use `Promise.all` to get data from different files
Promise.all([
  d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
  d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
]).then(([tsvData, topojsonData]) => {
  // grab countryName from tsvData and will add it to tooltip
  const countryName = {};
  tsvData.forEach(d => {
    countryName[d.iso_n3] = d.name;
  })
  const countries = topojson.feature(topojsonData, topojsonData.objects.countries);
    g.selectAll('path').data(countries.features)
      .enter().append('path')
        .attr('class', "country")
        .attr('d', pathGenerator)
      .append('title')
        // .text(d => console.log(countryName[d.id]))
        .text(d => countryName[d.id]);
})

// we need to grab country name but this json doesn't have that info ==> use `tsv`

// d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv')
//   .then(data => {
//     // console.log(data);
//   })

// d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
//   .then(data => {
//     // console.log(data);
//     // console.log(data.objects.countries); // "GeometryCollection"
//     const countries = topojson.feature(data, data.objects.countries);
//     // console.log({countries}); // "FeatureCollection"
//     svg.selectAll('path').data(countries.features)
//       .enter().append('path')
//         .attr('class', "country")
//         .attr('d', pathGenerator);
// });