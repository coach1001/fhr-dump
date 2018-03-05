DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        board_composition: '$governance.governance_structure.composition_of_board'        
    }}
    ,{$unwind: '$board_composition'}
    ,{$project: {        
        male: {$cond: [{$eq: ["$board_composition.sex", "Male"]}, 1, 0]},
        female: {$cond: [{$eq: ["$board_composition.sex", "Female"]}, 1, 0]},
    }}
    ,{$group: { _id: 'Board Male/Female', male: {$sum: "$male"},
                        female: {$sum: "$female"},                        
    }}
])
