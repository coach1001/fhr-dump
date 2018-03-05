DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
            'province': '$accessibility.cso_location.province',
            'prof_bodies': '$governance.legal_status.professional_body'
    }},
    {$unwind: '$prof_bodies'},
    {$group:{
        _id: {province: '$province', proffesional_body: '$prof_bodies'},
        count: {$sum: 1}
    }},
    {$group:{
        _id: '$_id.province',
        proffesional_bodies: {
            $push: ({body:'$_id.proffesional_body', cao_count: '$count'})
        }
    }}
])