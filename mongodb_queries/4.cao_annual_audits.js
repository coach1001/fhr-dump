DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        annual_audit: {
           $cond: [
               {
                 $or:[
                  { $eq: [ '$governance.reporting_systems.annual_report_prepared', false ] },
                  { $eq: [ '$governance.reporting_systems.annual_report_prepared', null ]}
                 ]
               }, 
               'No',
               'Yes'
              ] 
        }        
    }},
    {$group:{
        _id: '$annual_audit',
        count: {$sum: 1}
    }}    
])