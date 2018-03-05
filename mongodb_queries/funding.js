DBQuery.shellBatchSize = 10000;
db.surveyinstances.aggregate([
    {$project: {
            'province': '$accessibility.cso_location.province',
            'sources': {$arrayElemAt: [ '$financial_viability.funding.monetary_sources.sources' , 0 ]}
    }},
    {$unwind: '$sources'},
    {$group: {
            _id: { source_type: '$sources.source_type', province: '$province' },
            contribution: { $sum: '$sources.rand_amount' }                
    }},
    {$project: {
           _id: '$_id.province',
           donor: {
              type: '$_id.source_type',
              amount: "$contribution" 
           }    
    }},
    {$group: {
           _id: "$_id", 
           donors: { $push: "$donor" },
           total_funding: {$sum: "$donor.amount"}
    }}    
])