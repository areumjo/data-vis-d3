export const dropdownMenu = (selection, props) => {

  const { options } = props;

  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select);

  // create <select><option> tag for dropdown menu
  const option = select.selectAll('option').data(options);
  option.enter().append('option')
    .merge(option)
      .attr('value', d => d)
      .text(d => d);
}