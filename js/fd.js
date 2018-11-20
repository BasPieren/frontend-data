/* ------ SOURCES
https://beta.observablehq.com/@mbostock/d3-multi-line-chart
http://www.shanegibney.com/shanegibney/d3-js-v4-count-values-in-an-object/
https://bl.ocks.org/johnnygizmo/3d593d3bf631e102a2dbee64f62d9de4
Jesse Dijkman
------ */

// START USE OF SOURCE: http://www.shanegibney.com/shanegibney/d3-js-v4-count-values-in-an-object/
var dataLangCount = d3
  .nest()
  .key(function(d) {
    return d.language
  })
  .key(function(d) {
    return d.year
  })
  .rollup(function(leaves) {
    return leaves.length
  })
  .entries(dataArray)
// END USE OF SOURCE

var dutBooks = dataLangCount[0].values
var engBooks = dataLangCount[1].values
var gerBooks = dataLangCount[2].values
var freBooks = dataLangCount[3].values

// START USE OF SOURCE: https://beta.observablehq.com/@mbostock/d3-area-chart
var height = 500
var width = 1000
var margin = { top: 30, right: 40, bottom: 30, left: 40 }

var x = d3
  .scaleLinear()
  .domain([d3.min(dataArray, d => d.year), d3.max(dataArray, d => d.year)])
  .range([margin.left, width - margin.right])

// START USE OF SOURCE: Jesse Dijkman
var xAxis = g =>
  g.attr('transform', `translate(0,${height - margin.bottom})`).call(
    d3
      .axisBottom(x)
      .ticks(
        (d3.max(dataArray, d => d.year) - d3.min(dataArray, d => d.year)) / 2
      )
      .tickFormat(d3.format(1))
  )
// END USE OF SOURCE: Jesse Dijkman

var y = d3
  .scaleLinear()
  .domain([
    d3.min(dataLangCount[0].values, d => d.value),
    d3.max(dataLangCount[0].values, d => d.value)
  ])
  .nice()
  .range([height - margin.bottom, margin.top])

var yAxis = g =>
  g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select('.domain').remove())
    .call(g =>
      g
        .select('.tick:last-of-type text')
        .clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
    )
    .call(g =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('stroke-opacity', 0.1)
        .attr('x2', width - margin.left - margin.right)
    )
    .call(g =>
      g
        .select('.tick:last-of-type text')
        .clone()
        .attr('x', 4)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('Number of books')
    )

var line = d3
  .line()
  .defined(d => !isNaN(d.value))
  .x(d => x(d.key))
  .y(d => y(d.value))
  .curve(d3.curveMonotoneX)

var svg = d3.select('svg')

svg.attr('width', width).attr('height', height)

svg
  .append('g')
  .call(xAxis)
  .attr('stroke-width', 2)

svg.append('g').call(yAxis)

d3.selectAll('input').on('change', function() {
  var selectedInput = d3.event.target
  var selectedInputName = d3.event.target.name

  if (selectedInput.checked === true) {
    switch (selectedInputName) {
      case 'dut':
        svg
          .append('path')
          .attr('class', 'linePath')
          .datum(dutBooks)
          .attr('fill', 'none')
          .attr('stroke', 'orange')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', line)
        break
      case 'eng':
        svg
          .append('path')
          .attr('class', 'linePath')
          .datum(engBooks)
          .attr('fill', 'none')
          .attr('stroke', 'red')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', line)
        break
      case 'fre':
        svg
          .append('path')
          .attr('class', 'linePath')
          .datum(freBooks)
          .attr('fill', 'none')
          .attr('stroke', 'blue')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', line)
        break
      case 'ger':
        svg
          .append('path')
          .attr('class', 'linePath')
          .datum(gerBooks)
          .attr('fill', 'none')
          .attr('stroke', 'black')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', line)
        break
    }
  } else if (selectedInput.checked === false) {
    d3.select('.linePath')
      .transition()
      .attr('stroke-width', 0)
      .remove()
  }
})
// END USE OF SOURCE: https://beta.observablehq.com/@mbostock/d3-area-chart
