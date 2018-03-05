DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        has_npo_number: {
           $cond: [
               {
                 $or:[
                  { $eq: [ "$governance.legal_status.npo_date_of_registration", '' ] },
                  { $eq: [ "$governance.legal_status.npo_date_of_registration", null ]}
                 ]
               }, 
               'No',
               'Yes'
              ] 
        }        
    }},
    {$group: {
        _id: '$has_npo_number',
        count: {$sum: 1}
    }}    
])




