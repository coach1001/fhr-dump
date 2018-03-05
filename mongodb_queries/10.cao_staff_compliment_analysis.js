DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        staff: '$organisational_capacity_and_resources.staff_profile_and_turnover'        
    }},
    {$unwind: '$staff'}
    ,{$group: {
        _id: '$_id',
        count: {$sum: 1}
    }}
    ,{$group: {
        _id: 'Staff Compliment Analysis',
        average: {$avg: '$count'},
        minimum: {$min: '$count'},
        maximum: {$max: '$count'}
    }}
])