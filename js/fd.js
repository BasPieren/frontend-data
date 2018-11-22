/* ------ SOURCES
https://beta.observablehq.com/@mbostock/d3-multi-line-chart
http://www.shanegibney.com/shanegibney/d3-js-v4-count-values-in-an-object/
https://stackoverflow.com/questions/43741271/d3-change-and-update-axis-domain-scatterplot
Jesse Dijkman
------ */

dataFilter = dataArray
  .sort((a, b) => a.year - b.year)
  .map(({ year, pages }) => ({ year: year, pages: pages }))

// START USE OF SOURCE: http://www.shanegibney.com/shanegibney/d3-js-v4-count-values-in-an-object/
dataBookFilter = d3
  .nest()
  .key(function(d) {
    return d.pages
  })
  .entries(dataArray)

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
var gerBooks = dataLangCount[1].values
var engBooks = dataLangCount[2].values
var freBooks = dataLangCount[3].values

// START USE OF SOURCE: https://beta.observablehq.com/@mbostock/d3-multi-line-chart
var height = 500
var width = 1000
var margin = { top: 30, right: 40, bottom: 30, left: 40 }

var x = d3
  .scaleLinear()
  .domain([d3.min(dataArray, d => d.year), d3.max(dataArray, d => d.year)])
  .range([margin.left, width - margin.right])

var xAxis = g =>
  g.attr('transform', `translate(0,${height - margin.bottom})`).call(
    d3
      .axisBottom(x)
      // START USE OF SOURCE: Jesse Dijkman
      .ticks(
        (d3.max(dataArray, d => d.year) - d3.min(dataArray, d => d.year)) / 2
      )
      // END USE OF SOURCE: Jesse Dijkman
      .tickFormat(d3.format(1))
  )

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
    .attr('class', 'yAxis')
    .call(d3.axisLeft(y))
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

var dotColor = d3
  .scaleLinear()
  .domain([
    0,
    d3.median(dataFilter, d => d.pages),
    d3.max(dataFilter, d => d.pages)
  ])
  .nice()
  .range(['green', 'yellow', 'red'])

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
          .attr('stroke', 'orange')
          .attr('stroke-width', 0)
          .transition()
          .attr('stroke-width', 3)
          .attr('d', line)

        svg
          .append('g')
          .attr('class', 'lineDot')
          .selectAll('circle')
          .data(dutBooks)
          .enter()
          .append('circle')
          .attr('cx', d => x(d.key))
          .attr('cy', d => y(d.value))
          .attr('r', 0)
          .transition()
          .attr('r', 5)
          .attr('fill', 'orange')
        break
      case 'eng':
        svg
          .append('path')
          .attr('class', 'linePath')
          .datum(engBooks)
          .attr('stroke', 'red')
          .attr('stroke-width', 0)
          .transition()
          .attr('stroke-width', 3)
          .attr('d', line)

        svg
          .append('g')
          .attr('class', 'lineDot')
          .selectAll('circle')
          .data(engBooks)
          .enter()
          .append('circle')
          .attr('cx', d => x(d.key))
          .attr('cy', d => y(d.value))
          .attr('r', 0)
          .transition()
          .attr('r', 5)
          .attr('fill', 'red')
        break
      case 'fre':
        svg
          .append('path')
          .attr('class', 'linePath')
          .datum(freBooks)
          .attr('stroke', 'blue')
          .attr('stroke-width', 0)
          .transition()
          .attr('stroke-width', 3)
          .attr('d', line)

        svg
          .append('g')
          .attr('class', 'lineDot')
          .selectAll('circle')
          .data(freBooks)
          .enter()
          .append('circle')
          .attr('cx', d => x(d.key))
          .attr('cy', d => y(d.value))
          .attr('r', 0)
          .transition()
          .attr('r', 5)
          .attr('fill', 'blue')
        break
      case 'ger':
        svg
          .append('path')
          .attr('class', 'linePath')
          .datum(gerBooks)
          .attr('stroke', 'black')
          .attr('stroke-width', 0)
          .transition()
          .attr('stroke-width', 3)
          .attr('d', line)

        svg
          .append('g')
          .attr('class', 'lineDot')
          .selectAll('circle')
          .data(gerBooks)
          .enter()
          .append('circle')
          .attr('cx', d => x(d.key))
          .attr('cy', d => y(d.value))
          .attr('r', 0)
          .transition()
          .attr('r', 5)
          .attr('fill', 'black')
        break
    }
  } else if (selectedInput.checked === false) {
    d3.select('.linePath')
      .transition()
      .attr('stroke-width', 0)
      .remove()

    d3.select('.lineDot')
      .transition()
      .delay(100)
      .attr('opacity', 0)
      .remove()
  }
})

d3.select('.detail-button').on('click', function() {
  d3.select('.linePath')
    .transition()
    .attr('stroke-width', 0)
    .remove()

  d3.select('.lineDot')
    .transition()
    .delay(100)
    .attr('opacity', 0)
    .remove()

  // START USE OF SOURCE: https://stackoverflow.com/questions/43741271/d3-change-and-update-axis-domain-scatterplot
  y.domain([
    d3.min(dataBookFilter, d => d.key),
    d3.max(dataBookFilter, d => d.key)
  ]).nice()

  d3.selectAll('.yAxis')
    .transition()
    .duration(1000)
    .call(d3.axisLeft(y))
    .call(g =>
      g
        .selectAll('.tick line')
        .attr('stroke-opacity', 0.1)
        .attr('x2', width - margin.left - margin.right)
    )
    .call(g =>
      g
        .select('.tick:last-of-type text')
        .attr('x', 4)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('Number of pages')
    )
  // END USE OF SOURCE: https://stackoverflow.com/questions/43741271/d3-change-and-update-axis-domain-scatterplot
  svg
    .append('g')
    .attr('class', 'bookDots')
    .selectAll('circle')
    .data(dataFilter)
    .enter()
    .append('circle')
    .transition()
    .delay(1000)
    .duration(1000)
    .attr('cx', d => x(d.year))
    .attr('cy', d => y(d.pages))
    .attr('r', 5)
    .attr('fill', d => dotColor(d.pages))
})

d3.select('.global-button').on('click', function() {
  d3.select('.bookDots')
    .transition()
    .attr('opacity', 0)
    .remove()

  y.domain([
    d3.min(dataLangCount[0].values, d => d.value),
    d3.max(dataLangCount[0].values, d => d.value)
  ]).nice()

  d3.selectAll('.yAxis')
    .transition()
    .duration(1000)
    .call(d3.axisLeft(y))
    .call(g =>
      g
        .selectAll('.tick line')
        .attr('stroke-opacity', 0.1)
        .attr('x2', width - margin.left - margin.right)
    )
    .call(g =>
      g
        .select('.tick:last-of-type text')
        .attr('x', 4)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('Number of books')
    )
})

// END USE OF SOURCE: https://beta.observablehq.com/@mbostock/d3-multi-line-chart
