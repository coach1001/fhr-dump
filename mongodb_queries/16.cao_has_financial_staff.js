DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        dfs: {$ifNull: ['$financial_viability.financial_system.dedicated_financial_staff',false]}
    }}
    ,{$group: {
        _id: '$dfs',        
        count: {$sum: 1}
    }}
])