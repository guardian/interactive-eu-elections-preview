import fs from "fs"
import csvStringify from 'csv-stringify/lib/es5/sync'


const files = [
'AT.json',
'BE.json',
'BG.json',
'CY.json',
'CZ.json',
'DE.json',
'DK.json',
'EE.json',
'EL.json',
'ES.json',
'FBE.json',
'FI.json',
'FR.json',
'GB.json',
'GBE.json',
'HR.json',
'HU.json',
'IE.json',
'IT.json',
'LT.json',
'LU.json',
'LV.json',
'MT.json',
'NI.json',
'NL.json',
'PL.json', 
'PT.json',
'RO.json',
'SE.json',
'SI.json',
'SK.json',
'UK.json',
'WBE.json'
]

let results = {
	'results':[
	]
}

let cont = 0;

files.map(file => {
	let json = fs.readFileSync('./src/assets/countries/' + file.toLowerCase(), 'utf8')

	let country = JSON.parse(json);


	results.results.push(
		{
			country_id:country.id,
			country_seats_total:country.seatsTotal,
			GP1401: 0,
		    GP1402: 0,
		    GP1403: 0,
		    GP1404: 0,
		    GP1405: 0,
		    GP1406: 0,
		    GP1407: 0,
		    NA: 0
		}
	)

	country.groupSummary.groupDistribution.map(group => {

		console.log(group.seatsTotal)


		results.results[cont][group.id] = group.seatsTotal
	})

	cont++
})

fs.writeFileSync('./src/assets/eu-results-2014.json', JSON.stringify(results));