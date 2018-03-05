DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        board_composition: '$governance.governance_structure.composition_of_board'        
    }}
    ,{$unwind: '$board_composition'}
    ,{$project: {
        male: {$cond: [{$eq: ["$board_composition.sex", "Male"]}, 1, 0]},
        female: {$cond: [{$eq: ["$board_composition.sex", "Female"]}, 1, 0]},
        role: '$board_composition.role_on_board'
    }}
    ,{$group: {
        _id: '$role' ,
        male: {$sum: '$male'},
        female: {$sum: '$female'}
    }}
])