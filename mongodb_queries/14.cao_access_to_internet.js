DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        ia :{$ifNull: ['$organisational_capacity_and_resources.use_of_technology.access_to_internet', false]},
        ca :{$ifNull: ['$organisational_capacity_and_resources.use_of_technology.access_to_computers',false]},
    }}
    ,{$project: {
        access_to_internet: {$cond: ['$ia',1,0]},
        no_access_to_internet: {$cond: ['$ia',0,1]},
        access_to_computers: {$cond: ['$ca',1,0]},
        no_access_to_computers: {$cond: ['$ca',0,1]}
     }}
     ,{$group: {
        _id: 'IT Access',
        access_to_internet: {$sum: '$access_to_internet'},
        no_access_to_internet: {$sum: '$no_access_to_internet'},
        access_to_computers: {$sum: '$access_to_computers'},
        no_access_to_computers: {$sum: '$no_access_to_computers'}         
    }}
])