DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        training: '$organisational_capacity_and_resources.staff_development'
    }}
    ,{$unwind: '$training'}
    ,{$project: {
        in_house: {$cond: [{$eq: ['$training.type', 'In House']}, 1, 0]}, 
        in_house_providers: {$cond: [{$eq: ['$training.type', 'In House']}, '$training.service_provider', null]}, 
        in_house_training_type: {$cond: [{$eq: ['$training.type', 'In House']}, '$training.type_of_training', null]}, 
        external: {$cond: [{$eq: ['$training.type', 'External']}, 1, 0]}, 
        external_providers: {$cond: [{$eq: ['$training.type', 'External']}, '$training.service_provider', null]},
        external_training_type: {$cond: [{$eq: ['$training.type', 'External']}, '$training.type_of_training', null]}  
    }}
    ,{$group: {
        _id: 'Training Analysis',
        in_house: {$sum: '$in_house'},
        external: {$sum: '$external'},
        in_house_providers: {$push: '$in_house_providers'}, 
        external_providers: {$push: '$external_providers'}, 
        in_house_training_type: {$push: '$in_house_training_type'},
        external_training_type: {$push: '$external_training_type'}                             
     }}
     ,{$project: {
        in_house: '$in_house',
        external: '$external', 
        in_house_providers: {$filter:{
                input: '$in_house_providers',
                as: 'conducted',
                cond: {$ne: ['$$conducted', null]}
        }},
        external_providers: {$filter:{
                input: '$external_providers',
                as: 'conducted',
                cond: {$ne: ['$$conducted', null]}
        }},
        in_house_training_type: {$filter:{
                input: '$in_house_training_type',
                as: 'conducted',
                cond: {$ne: ['$$conducted', null]}
        }},
        external_training_type: {$filter:{
                input: '$external_training_type',
                as: 'conducted',
                cond: {$ne: ['$$conducted', null]}
        }},
     }}
])