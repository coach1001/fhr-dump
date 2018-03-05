DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {        
        year_r: { $ifNull: ['$organisational_capacity_and_resources.duration_of_existance.year_registered', ISODate(0)] },
        year_e: { $ifNull: ['$organisational_capacity_and_resources.duration_of_existance.year_established', ISODate(0)] }
    }},
    {$project: {
        year_e: {$year: '$year_e'},
        year_r: {$year: '$year_r'},        
    }},
    {$group: {
        _id: 'Establishment/Registration Analysis',
        year_e_a: {$avg: '$year_e'},
        year_r_a: {$avg: '$year_r'}
    }},
    {$project: {
        year_established_average: '$year_e_a',
        year_registered_average: '$year_r_a',
        average_age_before_registration: {$subtract: ['$year_r_a', '$year_e_a']}
    }}
])