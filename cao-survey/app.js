var express = require('express')
var path = require('path')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var Surveys = require('./models/surveys.js')

var _ = require('lodash')

var SurveyInstance = Surveys.SurveyInstance
var app = express();
mongoose.connect('mongodb://gpr.fhr.org.za/cao-surveys', {useMongoClient: true} )
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'API Ready!...'
	})
})

app.get('/api/stats', (req, res) => {

})

app.get('/api/surveys', (req, res) => {
	SurveyInstance.find({}, 'general.name general.date_of_interview', (err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			res.status(200).json(data)
		}
	})
})

app.get('/api/allsurveysnorm', (req, res) => {
	SurveyInstance.find({})
		.lean()
		.exec((err, data) => {
			if(err) {
				res.status(500).json({ message : err })
			} else {
				res.status(200).json(data)
			}

		})
})

app.get('/api/allsurveys', (req, res) => {
	SurveyInstance.find({})
		.lean()
		//.limit(10)
		.exec((err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			data.map((d) => {
				try {
					d.gps_fixed = d.general.gps_coordinates.split(',').map(Number)
				} catch (e) {
					d.gps_fixed = [0,0]
				}
			})
			res.status(200).json({data: data})
		}
	})
})

app.get('/api/surveysPerProvince', (req, res) => {
	SurveyInstance.aggregate([{
		$group: {
			_id: "$accessibility.cso_location.province",
			surveys: { $push: "$$ROOT" }
		}
	}], (err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			res.status(200).json({data: data})
		}
	})
})

app.get('/api/onesurvey', (req, res) => {
	SurveyInstance.find({})
		.lean()
		.limit(1)
		.exec((err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			data.map((d) => {
				try {
					d.gps_fixed = d.general.gps_coordinates.split(',').map(Number)
				} catch (e) {
					d.gps_fixed = [0,0]
				}
			})
			res.status(200).json({data: data})
		}
	})
})

app.get('/api/getgraphs', async (req, res) => {
	let dData = await SurveyInstance.aggregate([
    {$project: {
      'province': '$accessibility.cso_location.province',
      'sources': {$arrayElemAt: [ '$financial_viability.funding.monetary_sources.sources' , 0 ]}
    }},
    {$unwind: '$sources'},
    {$group: {
      _id: { source_type: "$sources.source_type", province: "$province" },
      contribution: { $sum: "$sources.rand_amount" }
    }},
    {$project: {
      _id: "$_id.province",
      donor: {
        type: "$_id.source_type",
        amount: "$contribution"
      }
    }},
    {$group: {
      _id: "$_id",
      donors: { $push: "$donor" },
      total_funding: {$sum: "$donor.amount"}
    }}
	]).exec()
	let gData = await SurveyInstance.aggregate([
	    {$unwind:{path:"$organisational_capacity_and_resources.staff_profile_and_turnover"}},
	    {$group:{_id:"$accessibility.cso_location.province",sex:{$push: "$organisational_capacity_and_resources.staff_profile_and_turnover.sex"}}},
	    {$unwind:{path: "$sex"}},
	    {$project: {
	      male: {$cond: [{$eq: ["$sex", "Male"]}, 1, 0]},
	      female: {$cond: [{$eq: ["$sex", "Female"]}, 1, 0]},
	    }},
	    {$group: { _id: "$_id", male: {$sum: "$male"},
	      female: {$sum: "$female"},
	    }}
	]).exec()
	let aSurveys = 	await SurveyInstance.find({})
		.lean()
		.limit(3)
		.exec()

	aSurveys.map((d) => {
		try {
			d.gps_fixed = d.general.gps_coordinates.split(',').map(Number)
		} catch (e) {
			d.gps_fixed = [0,0]
		}
	})

	res.status(200).json({data:{ donorData: dData, genderData: gData, allSurveys: aSurveys}})

})

app.get('/api/fivesurveys', (req, res) => {
	SurveyInstance.find({})
		.lean()
		.limit(5)
		.exec((err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			data.map((d) => {
				try {
					d.gps_fixed = d.general.gps_coordinates.split(',').map(Number)
				} catch (e) {
					d.gps_fixed = [0,0]
				}
			})
			res.status(200).json({data: data})
		}
	})
})

app.get('/api/surveys/:id', (req, res) => {
	SurveyInstance.findById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			res.status(200).json(data)
		}
	})
})

app.get('/api/surveys/schema', (req, res) => {
	res.status(200).json(SurveyInstance.schema.paths)
})

app.post('/api/surveys', (req, res) => {
	SurveyInstance.create(req.body, (err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			res.status(200).json(data)
		}

	})
})

app.patch('/api/surveys', (req, res) => {
	SurveyInstance.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			res.status(200).json(data)
		}
	})
})

app.delete('/api/surveys/:id', (req, res) => {
		SurveyInstance.findByIdAndRemove(req.params.id, (err, data) => {
		if (err) {
			res.status(500).json({ message : err })
		} else {
			res.status(200).json({})
		}
	})
})

app.listen(3009, (err) => {
	if (err) {
	} else {
		console.log('Listening on Port 3009!...')
	}
})