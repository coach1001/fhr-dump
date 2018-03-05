DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
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
])
