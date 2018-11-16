/* ------ SOURCES
https://github.com/rijkvanzanten/node-oba-api
https://stackoverflow.com/questions/16470113/how-to-return-part-of-string-after-a-certain-character
Martijn Reeuwijk
Jesse Dijkman
Laurens
------ */

require('dotenv').config()

// START USE OF SOURCE: https://github.com/rijkvanzanten/node-oba-api
const OBA = require('oba-api')

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: process.env.PUBLIC,
  secret: process.env.SECRET
})

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word 'rijk' sorted by title:
client
  .get('search', {
    q: 'Wereldoorlog',
    refine: true,
    sort: 'year',
    facet: [
      'type(book)',
      'language(dut)',
      'topic(Wereldoorlog II)',
      'pubYearRange(5_OlderThan50)'
    ],
    page: 1
  })
  // END USE OF SOURCE

  // START USE OF SOURCE: Laurens
  .then(result => JSON.parse(result))
  .then(result => {
    let keys = getData(result)
  })

  .catch(err => console.log(err)) // Something went wrong in the request to the API

function getData(data) {
  // START USE OF SOURCE: Martijn Reeuwijk, Jesse Dijkman & Laurens
  let dataStore = data.aquabrowser.results.result.map(e => {
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
  })
  console.log(dataStore)
  // END USE OF SOURCE
}
// END USE OF SOURCE
