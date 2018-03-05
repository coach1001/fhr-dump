DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        management_commitee: {
           $cond: [
               {
                 $or:[
                  { $eq: [ '$governance.governance_structure.management_commitee', false ] },
                  { $eq: [ '$governance.governance_structure.management_commitee', null ]}
                 ]
               }, 
               'No',
               'Yes'
              ] 
        }        
    }},
    {$group:{
        _id: '$management_commitee',
        count: {$sum: 1}
    }}    
])