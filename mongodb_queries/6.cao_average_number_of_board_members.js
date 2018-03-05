DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {no_board_members: '$governance.governance_structure.number_of_board_members'}},
    {$group: {_id:'Average Number of Board Members', average: {$avg: '$no_board_members'}}}
])

