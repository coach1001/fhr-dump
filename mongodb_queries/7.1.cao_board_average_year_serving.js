DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        board_composition: '$governance.governance_structure.composition_of_board'        
    }},
    {$unwind: '$board_composition'},
    {$project:{
        years_on_board: '$board_composition.years_on_board'
    }},
    {$group: {
        _id: 'Average Serving Years of Board Members',
        average: {$avg: '$years_on_board'}
    }}
])
