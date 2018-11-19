/* ------ SOURCES
https://github.com/rijkvanzanten/node-oba-api
Laurens Aarnoudse
Jesse Dijkman
Sterre van Geest
------ */

require('dotenv').config()

var fs = require('file-system')

// START USE OF SOURCE: https://github.com/rijkvanzanten/node-oba-api
const OBA = require('oba-api')

const client = new OBA({
  public: process.env.PUBLIC,
  secret: process.env.SECRET
})

client
  .get('search', {
    rctx:
      'AWNkYOZmYGcwrEorS801zTXOLSvMNEyqMEoqN6wyzkpOZWZk4MxNzMxjZGYQT8svyk0ssUrKz8@mBBGMzNKZ8UWpycUFqUUFiemprEYGTAwXQm4Z3DJgalvEyKixTIJ5gwUDA3t$UiIDA2dlamKRon5Rfn6Jfk5mYWlmij5QnL20KIeBNS$HEQA',
    q: 'format:book',
    refine: true,
    sort: 'year',
    facet: ['topic(Wereldoorlog II)', 'pubYearRange(5_OlderThan50)'],
    page: 1
  })

  // START USE OF SOURCE: Laurens Aarnoudse
  .then(result => JSON.parse(result))
  .then(result => {
    let keys = getData(result)
  })
  // END USE OF SOURCE: Laurens Aarnoudse

  .catch(err => console.log(err))
// END USE OF SOURCE: https://github.com/rijkvanzanten/node-oba-api

function filterData(data) {
  let apiResult = data.aquabrowser.results.result
  let dataStore = apiResult.map(e => {
    // START USE OF SOURCE: Jesse Dijkman
    return {
      title: e.titles
        ? e.titles['short-title']
          ? e.titles['short-title'].$t
          : 'No $t-titel'.toUpperCase()
        : 'No titel'.toUpperCase(),

      year: e.publication
        ? e.publication.year
          ? parseInt(e.publication.year.$t, 10)
          : 'No $t-year'.toUpperCase()
        : 'No year'.toUpperCase(),

      author: e.authors
        ? e.authors['main-author']
          ? e.authors['main-author'].$t
          : 'No $t-author'.toUpperCase()
        : 'No author'.toUpperCase(),

      description: e.summaries
        ? e.summaries.summary
          ? e.summaries.summary.$t
          : 'No $t-description'.toUpperCase()
        : 'No description'.toUpperCase(),

      language: e.languages
        ? e.languages.language
          ? e.languages.language.$t
          : 'No $t-language'.toUpperCase()
        : 'No language'.toUpperCase(),

      pages: e.description
        ? e.description['physical-description']
          ? parseInt(
              e.description['physical-description'].$t
                .match(/\d+/g)
                .map(Number),
              10
            )
          : 0
        : 'No physical description'.toUpperCase()
    }
    // END USE OF SOURCE: Jesse Dijkman
  })
  return dataStore
}

function appendData(data) {
  var filteredData = filterData(data)
  // START USE OF SOURCE: Sterre van Geest
  let dataStoreString = JSON.stringify(filteredData)

  fs.appendFile('data/data.json', dataStoreString, err => {
    if (err) throw err
  })
  // END USE OF SOURCE: Sterre van Geest
}

function getData(data) {
  var filteredData = filterData(data)
  console.log(filteredData)

  appendData(data)
}
