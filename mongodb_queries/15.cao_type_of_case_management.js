DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        csm: '$organisational_capacity_and_resources.case_management_system.case_management_system'
    }}
    ,{$unwind: '$csm'}
    ,{$group: {
        _id: '$csm',
        count: {$sum: 1}
    }}
])