DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$group: {
        _id: '$accessibility.cso_location.province',
        cao_count: {$sum: 1}
    }}
])