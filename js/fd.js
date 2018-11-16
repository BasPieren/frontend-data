/* ------ SOURCES
https://beta.observablehq.com/@mbostock/d3-area-chart
http://www.shanegibney.com/shanegibney/d3-js-v4-count-values-in-an-object/
Jesse Dijkman
------ */

var dataArray = [
  {
    title: 'Het Koninkrijk der Nederlanden in de Tweede Wereldoorlog',
    year: 1969,
    author: 'de Jong, L.',
    description: 'NO DESCRIPTION',
    pages: 772
  },
  {
    title: 'Het Koninkrijk der Nederlanden in de Tweede Wereldoorlog',
    year: 1969,
    author: 'de Jong, L.',
    description: 'NO DESCRIPTION',
    pages: 540
  },
  {
    title: 'Voorspel en verloop van de Tweede Wereldoorlog',
    year: 1969,
    author: 'Schneiders, P.',
    description: 'NO DESCRIPTION',
    pages: 96
  },
  {
    title: 'Wij en de vrijheid',
    year: 1969,
    author: 'Paape, A.H.',
    description:
      'Bestemd voor de hoogste klassen van het basisonderwijs en geeft een beeld van de toestand in Nederland tijdens de Tweede Wereldoorlog met discussievragen aan het eind van ieder hoofdstuk.',
    pages: 48
  },
  {
    title: 'De nederlaag',
    year: 1969,
    author: 'Kossmann, Alfred',
    description:
      'In zijn strijd om innerlijk onaangetast te blijven door het ruwe, mensonterende leven in Duitse werkkampen tijdens de tweede wereldoorlog, lijdt een jong, typisch intellectueel Nederlands student de nederlaag',
    pages: 253
  },
  {
    title: 'Helden, hazen en honden: Zuid-Borneo 1942',
    year: 1969,
    author: 'van Heekeren, Cornelis',
    description: 'NO DESCRIPTION',
    pages: 244
  },
  {
    title: 'Moord en brand: Oost-Borneo 1942',
    year: 1969,
    author: 'van Heekeren, Cornelis',
    description: 'NO DESCRIPTION',
    pages: 243
  },
  {
    title:
      'Rijkscommissariaat Nederland : mislukte poging tot vestiging van een nationaal-socialistische orde',
    year: 1969,
    author: 'Kwiet, Konrad',
    description: 'NO DESCRIPTION',
    pages: 208
  },
  {
    title: 'De eindeloze steppe',
    year: 1969,
    author: 'Hautzig, Esther',
    description: 'NO DESCRIPTION',
    pages: 224
  },
  {
    title: 'De zonnebloem',
    year: 1969,
    author: 'Wiesenthal, Simon',
    description: 'NO DESCRIPTION',
    pages: 191
  },
  {
    title: 'Het schoolverzet',
    year: 1969,
    author: 'de Pater, Jan Cornelis Hendrik',
    description: 'NO DESCRIPTION',
    pages: 530
  },
  {
    title: undefined,
    year: 1969,
    author: 'Frequin, Louis',
    description: 'NO DESCRIPTION',
    pages: 196
  },
  {
    title:
      'Collaboratie en verzet, 1940-1945 : een poging tot ontmythologisering',
    year: 1969,
    author: 'Weinreb, Friedrich',
    description: 'NO DESCRIPTION',
    pages: 3
  },
  {
    title: 'Rode zon boven Borneo: West-Borneo 1942',
    year: 1968,
    author: 'van Heekeren, Cornelis',
    description: 'NO DESCRIPTION',
    pages: 170
  },
  {
    title: 'Advocaat in bezettingstijd',
    year: 1968,
    author: 'Stokvis, Benno Jules',
    description:
      'Ervaringen van een Amsterdamse adcocaat die het tijdens de Tweede Wereldoorlog illegaal, maar ook legaal tegen de Duitsers opnam, vooral voor Joodse landgenoten.',
    pages: 96
  },
  {
    title: 'PTT 1940-1945 : beleid en bezetting',
    year: 1968,
    author: 'Visser, Jacobus Gerardus',
    description: 'NO DESCRIPTION',
    pages: 350
  },
  {
    title:
      'De verzetsgroep Zwaantje : oorlogsbelevenissen van Allard Oosterhuis : verteld met gebruikmaking van vastgelegde herinneringen van A. Oosterhuis (Zwaantje) en D.H. Schortinghuis (Dienst-Wim) en van gegevens van het Rijksinstituut voor Oorlogsdocumentatie',
    year: 1968,
    author: 'Klatter, J.',
    description: 'NO DESCRIPTION',
    pages: 111
  },
  {
    title: 'Operatie Seelöwe : "de Duitse invasie in Engeland"',
    year: 1968,
    author: 'Lampe, David',
    description: 'NO DESCRIPTION',
    pages: 223
  },
  {
    title:
      'Vlucht naar de vrijheid : het authentieke verhaal van de "Dutch-Paris" ondergrondse en zijn leider Jean Weidner, die in de oorlog ontsnappingsroutes organiseerden uit bezet gebied',
    year: 1967,
    author: 'Ford, Herbert',
    description: 'NO DESCRIPTION',
    pages: 286
  },
  {
    title: '25.000 landverraders : de SS in Nederland, Nederland in de SS',
    year: 1967,
    author: 'van der Zee, Sytze',
    description: 'NO DESCRIPTION',
    pages: 217
  },
  {
    title: 'De vlucht van de Krito',
    year: 1964,
    author: 'Pennewaard, Jan',
    description: 'NO DESCRIPTION',
    pages: 144
  },
  {
    title: 'Waarom herdenkingen in mei',
    year: 1964,
    author: 'Krudde, W.',
    description: 'NO DESCRIPTION',
    pages: 111
  },
  {
    title: 'De " Atjeh-party"',
    year: 1964,
    author: 'van Heekeren, Cornelis',
    description: 'NO DESCRIPTION',
    pages: 172
  },
  {
    title: 'Koers 0.9.0',
    year: 1963,
    author: 'van der Geest, K.',
    description: 'NO DESCRIPTION',
    pages: 159
  },
  {
    title: 'Hij was mijn buurjongen',
    year: 1963,
    author: 'Richter, Hans Peter',
    description: 'NO DESCRIPTION',
    pages: 142
  },
  {
    title: 'Van Duinkerken tot D-day : Frankrijk in het verzet',
    year: 1963,
    author: 'de Vomécourt, Philippe',
    description: 'NO DESCRIPTION',
    pages: 272
  },
  {
    title: 'Memoires, 1940-1946',
    year: 1963,
    author: 'de Gaulle, Charles',
    description: 'NO DESCRIPTION',
    pages: 376
  },
  {
    title:
      'Visioen en werkelijkheid : de illegale pers over de toekomst der samenleving',
    year: 1963,
    author: 'Bert Sr Bakker',
    description: 'NO DESCRIPTION',
    pages: 320
  },
  {
    title: "Ankie's tweelingzusje",
    year: 1963,
    author: 'van den Heuvel, Mimi',
    description: 'NO DESCRIPTION',
    pages: 144
  },
  {
    title: 'Den vaderland getrouwe : een boek over oorlog en verzet',
    year: 1962,
    author: 'Mathieu Smedts',
    description: 'NO DESCRIPTION',
    pages: 288
  },
  {
    title: 'Wij waren er ook bij',
    year: 1962,
    author: 'Evenhuis, Gertie',
    description: 'NO DESCRIPTION',
    pages: 168
  },
  {
    title: 'Eenzame opsluiting',
    year: 1962,
    author: 'Burney, Christopher',
    description: 'NO DESCRIPTION',
    pages: 160
  },
  {
    title:
      'Jachtvlieger : de ervaringen van een Nederlandse spitfirepiloot bij de RAF',
    year: 1962,
    author: 'Flinterman, Jan',
    description: 'NO DESCRIPTION',
    pages: 175
  },
  {
    title: 'Prins Bernhard in oorlogstijd',
    year: 1962,
    author: 'Brave-Maks, M.H.',
    description: 'NO DESCRIPTION',
    pages: 214
  },
  {
    title: 'Het geschenk voor de Führer',
    year: 1961,
    author: 'Kessel, Joseph',
    description:
      'Reconstructie van de wijze waarop Felix Kersten tijdens Wereldoorlog II voorkomen zou hebben dat alle Nederlanders in 1941 naar Polen gedeporteerd zouden worden.',
    pages: 304
  },
  {
    title:
      'Het ivoren fregat : een spannend verhaal uit oorlogstijd en verzet voor jongens van 12-17 jaar',
    year: 1961,
    author: 'Kraan, H.H.',
    description: 'NO DESCRIPTION',
    pages: 211
  },
  {
    title: 'Een ster voor Moisjele : van hel tot hel in Nazi-tijd',
    year: 1961,
    author: 'Jerusjalmi, Elieser',
    description: 'NO DESCRIPTION',
    pages: 139
  },
  {
    title:
      'Warschauer ghetto : [catalogus van een tentoonstelling gehouden] in De Waag, Amsterdam, 18 april-8 mei 1961',
    year: 1961,
    author: 'Adolf Rudnicki',
    description: 'NO DESCRIPTION',
    pages: 1
  },
  {
    title: 'Geen tijd voor tranen',
    year: 1961,
    author: 'Wijsmuller-Meijer, Truus',
    description: 'NO DESCRIPTION',
    pages: 194
  },
  {
    title:
      'Nederlands-Indië contra Japan : stafwerk in opdracht van wijlen Z.E. Generaal S.H. Spoor ; Dl. 7',
    year: 1961,
    author: 'S.H. Spoor',
    description: 'NO DESCRIPTION',
    pages: 178
  },
  { title: 'De Tweede Wereldoorlog',
    year: 1960,
    author: 'Paul van \'t Veer',
    description: 'NO DESCRIPTION',
    pages: 144 },
  { title:
     'De sledepatrouille : de gebeurtenissen aan het kleinste en vreemdste front in de tweede wereldoorlog',
    year: 1960,
    author: 'Howarth, David',
    description: 'NO DESCRIPTION',
    pages: 250 },
  { title: 'De dag waarop mijn vader huilde',
    year: 1960,
    author: 'Hendrikse, Dick',
    description:
     'Geschreven portretten van zeventien bekende en minder bekende verzetsstrijders in de Tweede Wereldoorlog',
    pages: 151 },
  { title: 'Waarom de tram stil stond...',
    year: 1960,
    author: 'van de jr. Hulst, W.G.',
    description:
     'Twee zusjes ontmoeten op de avond van de 4e mei iemand die tijdens de oorlog twee dochtertjes verloren heeft.',
    pages: 46 },
  { title: 'Het vrij Nederlands liedboek',
    year: 1960,
    author: 'Jan H. de Groot',
    description: 'NO DESCRIPTION',
    pages: 156 },
  { title: 'Volk in verdrukking en verzet, 1940 - 1945',
    year: 1960,
    author: 'J.W. Rengelink',
    description: 'NO DESCRIPTION',
    pages: 67 },
  { title: 'Verdrukking, verzet, victorie',
    year: 1960,
    author: 'Goote, M.',
    description: 'NO DESCRIPTION',
    pages: 99 },
  { title:
     'En morgen de hele wereld : de Duitse stormloop tegen het Westen in de lente en zomer van 1940',
    year: 1960,
    author: 'Hartog, L.J.',
    description: 'NO DESCRIPTION',
    pages: 324 },
  { title: 'De reddende hurricane',
    year: 1960,
    author: 'Gallico, Paul',
    description: 'NO DESCRIPTION',
    pages: 147 },
  { title:
     'Operatie Bernhard : een op historische feiten berustend verslag van de grootste geldvervalsingsaffaire aller tijden',
    year: 1960,
    author: 'Hagen, Walter',
    description: 'NO DESCRIPTION',
    pages: 277 },
  { title: 'Bevrijding van Nederland : 1944-1945',
    year: 1960,
    author: 'Koning, B.',
    description: 'NO DESCRIPTION',
    pages: 195 },
  { title: 'Oder 45',
    year: 1960,
    author: 'Thorwald, Jürgen',
    description: 'NO DESCRIPTION',
    pages: 198 },
  { title: 'Vervolging en verraad',
    year: 1959,
    author: 'Romijn, Aart',
    description: 'NO DESCRIPTION',
    pages: 191 },
  { title: 'Elbe 45',
    year: 1959,
    author: 'Thorwald, Jürgen',
    description: 'NO DESCRIPTION',
    pages: 211 },
  { title: 'Weichsel 45',
    year: 1959,
    author: 'Thorwald, Jürgen',
    description: 'NO DESCRIPTION',
    pages: 217 },
  { title:
     'De man die niet bestond : de geschiedenis van "Operatie Mincemeat"',
    year: 1959,
    author: 'Montagu, Ewen',
    description: 'NO DESCRIPTION',
    pages: 207 },
  { title:
     'Nederlands-Indië contra Japan : stafwerk in opdracht van wijlen Z.E. Generaal S.H. Spoor ; Dl. 6',
    year: 1959,
    author: 'S.H. Spoor',
    description: 'NO DESCRIPTION',
    pages: 173 },
  { title:
     'Van mei tot mei : persoonlijke herinneringen aan bezetting en verzet',
    year: 1959,
    author: 'Drees, Willem sr.',
    description: 'NO DESCRIPTION',
    pages: 237 },
  { title:
     'De Enquêtecommissie is van oordeel ... : een samenvatting van het parlementaire onderzoek naar het regeringsbeleid in de oorlogsjaren',
    year: 1958,
    author: 'Meyjes, H.C.Posthumus',
    description: 'NO DESCRIPTION',
    pages: 368 },
  { title: 'Bushido, de gesel van de rijzende zon',
    year: 1958,
    author: 'Liverpool, Edward Frederick Langley Russell of',
    description: 'NO DESCRIPTION',
    pages: 231 }
]

var dataFilter = dataArray
  .sort((a, b) => a.year - b.year)
  .map(({ year, pages }) => ({ year: year, pages: pages }))

// START USE OF SOURCE: http://www.shanegibney.com/shanegibney/d3-js-v4-count-values-in-an-object/
var dataCount = d3
  .nest()
  .key(function(d) {
    return d.year
  })
  .rollup(function(leaves) {
    return leaves.length
  })
  .entries(dataFilter)
// END USE OF SOURCE

// START USE OF SOURCE: https://beta.observablehq.com/@mbostock/d3-area-chart
var height = 500

var width = 1000

var margin = { top: 20, right: 0, bottom: 30, left: 40 }

var x = d3
  .scaleTime()
  .domain([d3.min(dataFilter, d => d.year), d3.max(dataFilter, d => d.year)])
  .range([margin.left, width - margin.right])

// START USE OF SOURCE: Jesse Dijkman
var xAxis = g =>
  g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(d3.format('d')))

var y = d3
  .scaleLinear()
  .domain([0, d3.max(dataCount, d => d.value)])
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

var area = d3
  .area()
  .x(d => x(d.key))
  .y0(y(0))
  .y1(d => y(d.value))

var svg = d3.select('svg')

svg.attr('width', width).attr('height', height)

svg
  .append('path')
  .datum(dataCount)
  .attr('fill', 'steelblue')
  .attr('d', area)

svg.append('g').call(xAxis)

svg.append('g').call(yAxis)
// END USE OF SOURCE
