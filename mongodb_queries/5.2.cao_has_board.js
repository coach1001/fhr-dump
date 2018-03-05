DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        board: {
           $cond: [
               {
                 $or:[
                  { $eq: [ '$governance.governance_structure.board', false ] },
                  { $eq: [ '$governance.governance_structure.board', null ]}
                 ]
               }, 
               'No',
               'Yes'
              ] 
        }        
    }},
    {$group:{
        _id: '$board',
        count: {$sum: 1}
    }}    
])