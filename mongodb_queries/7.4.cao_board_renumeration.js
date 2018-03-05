DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        board_composition: '$governance.governance_structure.composition_of_board',        
        renumerated: {
           $cond: [
               {
                 $or:[
                  { $eq: [ '$governance.governance_structure.board_members_remunerated.renumerated', false ] },
                  { $eq: [ '$governance.governance_structure.board_members_remunerated.renumerated', null ]}
                 ]
               }, 
               false,
               true
              ] 
        }   
    }}
    ,{$unwind: '$board_composition'}
    ,{$project: {
        renumerated: {$cond: {if: '$renumerated', then: 1, else: 0}},
        not_renumerated: {$cond: {if: '$renumerated', then: 0, else: 1}},
    }}
    ,{$group: {
        _id: 'Board Members Enumarated',
        renumerated: {$sum: '$renumerated'},
        not_renumerated: {$sum: '$not_renumerated'}
    }}
])
