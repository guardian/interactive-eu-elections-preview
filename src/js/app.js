import * as d3B from 'd3'
import * as d3Select from 'd3-selection'
import * as topojson from 'topojson'
import * as d3geo from 'd3-geo-projection'
import {event as currentEvent} from 'd3-selection';
import cartogram from '../assets/eu28.json'
import results from '../assets/eu-results-2014.json'
import electoralData from '../assets/electoral_data.json?123'
import { $ } from "./util"


let d3 = Object.assign({}, d3B, d3Select, d3geo);

const atomEl = $('.interactive-wrapper')

let width = atomEl.getBoundingClientRect().width;
let height = width * 3 / 5;

let svg = d3.select('.interactive-wrapper').append('svg')
.attr('width', width)
.attr('height', height)
.attr('class', 'cartogram')

let projection = d3.geoCylindricalStereographic()

let path = d3.geoPath()
.projection(projection)

projection.fitSize([width, height], topojson.feature(cartogram, cartogram.objects.eu28));

let countriesFeatures = topojson.feature(cartogram, cartogram.objects.eu28).features

let mepsCarto = svg.append('g').selectAll('path')
.data(countriesFeatures)
.enter()
.append('path')
.attr('d', path)
.attr('id', d => d.properties.id)
.attr('class', 'mep')

let bordersCarto = svg.append('g').selectAll('path')
.data( topojson.feature(cartogram, cartogram.objects['eu28-borders']).features)
.enter()
.append('path')
.attr('d', path)
.attr('class', 'border')
.attr('id', d => d.properties.layer)
.on('mouseover', mouseover)
.on('mousemove', mousemove)
.on('mouseout', mouseout)

results.results.map(result => {

	let cont = 1;

	electoralData.groups.forEach(group => {

		let groupLength = +result[group.id]

		for (let i = 0; i < groupLength; i++) {

			let prettyNumber = cont;
			if(cont<10)prettyNumber = '0' + cont

			d3.select('#' + result.country_id + prettyNumber)
			.attr('class', group.id)


			cont++
		}
	})
})

function mouseover(d){

	let countryResults = results.results.find(country => country.country_id === d.properties.layer)

	console.log(countryResults)


}

function mousemove(){

}

function mouseout(){
	
}

