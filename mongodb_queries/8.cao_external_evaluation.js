DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        conducted: {$cond: [{$eq: ["$governance.monitoring_and_evaluation.external_evaluation.conducted", "Yes"]}, 1, 0]},        
        not_conducted: {$cond: [{$eq: ["$governance.monitoring_and_evaluation.external_evaluation.conducted", "No"]}, 1, 0]},
        conducted_by: '$governance.monitoring_and_evaluation.external_evaluation.conducted_by'
    }}
    ,{$group: {
        _id: 'External Evaluations Conducted',
        conducted: {$sum: '$conducted'},
        not_conducted: {$sum: '$not_conducted'},
        conducted_by: {$push: '$conducted_by'}
    }}
    ,{$project: {
        conducted : '$conducted',
        not_conducted : '$not_conducted',
        conducted_by: {$filter:{
                input: '$conducted_by',
                as: 'conducted',
                cond: {$ne: ['$$conducted', null]}
        }}
    }}
])