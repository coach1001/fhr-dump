DBQuery.shellBatchSize = 10000;
db.getCollection('surveyinstances').aggregate([
    {$project: {
        staff_skill: '$organisational_capacity_and_resources.level_of_staff_skill'
    }},
    {$unwind: '$staff_skill'}
    ,{$project: {        
        with_tertiary_qualification: {$ifNull: [{$add: ['$staff_skill.with_post_graduate_degree',
            '$staff_skill.with_degree','$staff_skill.with_tertiary_qualification']},0]},
        without_tertiary_qualification: '$staff_skill.with_matric'
    }}
    ,{$group: {
        _id: 'Tertiary Qualifications',
        with_tertiary_qualification: {$sum: '$with_tertiary_qualification'},
        without_tertiary_qualification: {$sum: '$without_tertiary_qualification'}
    }}   
])
