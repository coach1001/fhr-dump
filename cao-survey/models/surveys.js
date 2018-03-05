var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PersonInterviewedSchema = new Schema({
  name: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  board_member: { type: Boolean, required: true, default: false }
})

var ResearcherSchema = new Schema({
  name: { type: String, required: false, trim: true },
  organisation: { type: String, required: false, trim: true },
  fhr_staff_member: { type: Boolean, required: false, default: false }
})

var GeneralSchema = new Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: false, trim: true },
  gps_coordinates: { type: String, required: false, trim: true },
  date_of_interview: { type: Date, required: false, default: Date.now, get: getEpoch },
  persons_interviewed: [PersonInterviewedSchema],
  researchers: [ResearcherSchema],
  images: [{
    url: String,
    featured: Boolean
  }]
}, { toJSON: {getters: true} })

var LegalStatusSchema = new Schema({
  npo_registration_number: { type: String, trim: true },
  npo_date_of_registration: { type: Date, get: getEpoch },
  professional_body: {
    type: [String],
    enum: ['None', 'ACAOSA', 'CLDRC', 'CCJD', 'Other'],
    default: 'None'
  },
  legal_status: {
    type: String,
    enum: ['Non Profit', 'Trust', 'For Profit', 'Other'],
    default: 'Non Profit'
  }
},  { toJSON: {getters: true} })

var TaxStatusSchema = new Schema({
  status: {
    type: String,
    enum: ['Not Registered', 'Tax Registered', 'Tax Exempted', 'VAT Registered', 'Other'],
    default: 'Not Registered',
  },
  number: {
   type: Number
  }
})

var BoardMemberSchema = new Schema({
  name: String,
  role_on_board: String,
  years_on_board: Number,
  sex: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male'},
  age_of_member: { type: String, enum: ['Adult', 'Youth'], default: 'Adult'},
  background_of_member: String
})

var GovernanceStructureSchema = new Schema({
  management_commitee: Boolean,
  board: Boolean,
  number_of_board_members: Number,
  board_member_tor: {
    tor_exists: Boolean,
    provided_copy_of_constitution: Boolean,
    notes: String
  },
  appointment_procedure_for_board_members: {
    procedure_exists: Boolean,
    notes: String
  },
  board_members_remunerated: {
    renumerated: { type: Boolean },
    amount: Number
  },
  composition_of_board:[BoardMemberSchema]
})

var ReportSystemSchema = new Schema({
  frequency_of_board_meetings: { type: String, enum: ['Monthly', 'Quarterly', 'Twice a Year', 'Once a Year', 'Other'], default: 'Monthly'},
  documented_board_meetings_minutes_available: Boolean,
  internal_management_meetings: { type: String, enum: ['Monthly', 'Quarterly', 'Twice a Year', 'Once a Year', 'Other'], default: 'Monthly'},
  documented_management_meetings_minutes_available: Boolean,
  annual_report_prepared: Boolean,
  notes: String
})

var StrategicPlanningSchema = new Schema({
  existence_of_vision_and_mission: Boolean,
  strategic_planning_conducted: Boolean,
  strategic_planning_frequency: { type: String, enum: ['Twice a Year', 'Once a Year', 'Once every Two Years', 'Once every Four Years', 'Other'], default: 'Twice a Year'}
})

var MonitoringAndEvaluationSchema =  new Schema({
  period: {
    from: { type: Date, get: getEpoch},
    to: { type: Date, get: getEpoch}
  },
  internal_evaluation: {
    conducted: { type: String, enum: ['Yes', 'No'], default: 'No'},
    how_many_per_year: Number,
    conducted_by: String
  },
  external_evaluation: {
    conducted: { type: String, enum: ['Yes', 'No'], default: 'No'},
    how_many_per_year: Number,
    conducted_by: String
  }
}, { toJSON: {getters: true} })

var ProgrammePlanningAndManagementSchema = new Schema ({
  clear_programme_objectives_and_deliverables: { type: String, enum: ['Yes', 'No', 'N/A'], default: 'No'},
  the_organisation_incorporates_learning_from_projects_and_evaluations_into_strategic_planning: Boolean
})

var GovernanceSchema =  new Schema({
  legal_status: LegalStatusSchema,
  tax_status: TaxStatusSchema,
  governance_structure: GovernanceStructureSchema,
  reporting_systems: ReportSystemSchema,
  strategic_planning: StrategicPlanningSchema,
  monitoring_and_evaluation: MonitoringAndEvaluationSchema,
  programme_planning_and_management: ProgrammePlanningAndManagementSchema
})

var DurationOfExistenceSchema = new Schema({
  year_established: {type: Date, get: getEpoch},
  year_registered: {type: Date, get: getEpoch},
  years_in_operation: { type: String, enum: ['Less than A Year', '1-3 Years', '3-5 Years', '5-10 Years', '10-15 Years', '15-20 Years', 'More than 20 Years'], default: '1-3 Years'}
}, { toJSON: {getters: true} })

var StaffSkillSchema = new Schema({
  staff_status: { type: String, enum: ['Full Time', 'Part Time', 'Volunteers', 'Other'], default: 'Full Time'},
  total: Number,
  with_post_graduate_degree: Number,
  with_degree: Number,
  with_tertiary_qualification: Number,
  with_matric: Number
})

var StaffProfileSchema =  new Schema({
  role_of_staff_member: String,
  race: { type: String, enum: ['Black', 'Coloured', 'Indian', 'White', 'Other'], default: 'Black'},
  sex: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male'},
  years_of_employment: Number
})

var StaffDevelopmentSchema = new Schema({
  type: { type: String, enum: ['In House', 'External'], default: 'In House'},
  service_provider: String,
  type_of_training: String,
  frequency: String
})

var HumanResourcePolicyAndProcedureSchema = new Schema({
  documented_job_descriptions: Boolean,
  documented_human_resource_policy_or_manual: Boolean,
  performance_management_systems_in_place: Boolean,
  dedicated_human_resource_staff_member: Boolean
})

var UseOfTechnologySchema = new Schema({
  access_to_computers: Boolean,
  access_to_internet: Boolean,
  uses_social_media: Boolean,
  platforms: { type: [String], enum: ['Facebook', 'Twitter', 'Instagram', 'Whatsapp', 'LinkedIn', 'Other']},
  website: Boolean,
  website_url: String
})

var CaseManagementSystemSchema = new Schema({
  case_management_system: { type: [String], enum: ['Manual', 'Electronic'], default: 'Manual' },
  description: String
})

var CollaborationAndNetworkSchema = new Schema({
  use_of_networks_and_partnerships: Boolean,
  specify: [{
    partner: String
  }]
})

var OrganisationalCapacityAndResourceSchema = new Schema({
  duration_of_existance: DurationOfExistenceSchema,
  level_of_staff_skill: [StaffSkillSchema],
  staff_profile_and_turnover: [StaffProfileSchema],
  staff_development: [StaffDevelopmentSchema],
  human_resource_policies_and_procedures: HumanResourcePolicyAndProcedureSchema,
  use_of_technology: UseOfTechnologySchema,
  case_management_system: CaseManagementSystemSchema,
  collaboration_and_network: CollaborationAndNetworkSchema
})

var FinancialSystemSchema = new Schema({
  bank_account: Boolean,
  office: {
    does_have: Boolean,
    how_many: Number
  },
  dedicated_financial_staff: Boolean,
  financial_systems: { type: [String], enum: ['Pastel', 'Quickbooks', 'Other Specialized Accounting Software', 'Manual/Spreadsheet']},
  annual_independant_audits: Boolean,
  book_keeping_system: Boolean
})

var MoneySourceSchema = new Schema({
  period: {
    from_year: {type:Date, get: getEpoch},
    to_year: {type:Date, get: getEpoch}
  },
  sources: [{
    source_type: { type: String, enum: [
      'State Agency',
      'Bi-Lateral/Multi-Lateral',
      'Goverment Grant/Tender',
      'International Donor',
      'Independant Donor',
      'Philanthropic Foudnation',
      'Corporate CSI',
      'Individual Donations',
      'Income Generation'
    ]},
    sources_name_list: String,
    rand_amount: Number,
    duration: { type: String, enum: ['1 Year','Multi-Year'], default: 'Multi-Year' },
    type_of_funding: { type: [String], enum: ['Event/Activity', 'Programme', 'Core'] }
  }]
}, { toJSON: {getters: true} })

var NonMoneySourceSchema = new Schema({
  period: {
    from_year: {type:Date, get: getEpoch},
    to_year: {type:Date, get: getEpoch}
  },
  sources: [{
    type_of_assitance: { type: [String], enum: ['Technical Assistance', 'Office Space', 'Vehicle', 'Computer Equipment', 'Other']},
    provided_by: String
  }]
}, { toJSON: {getters: true} })

var FundingChallengesSchema =  new Schema({
  funding_source: String,
  challenges: String
})

var ExpenditureSchema = new Schema({
  monthly_budget_information: [{
    budget_item: { type: String, enum: [
      'Salaries',
      'Office Rental',
      'Maintenance and Repairs',
      'Utilities – water, electricity',
      'Stationary',
      'Telephone Costs',
      'Internet',
      'Transport',
      'Stipends for clients',
      'Catering for clients',
      'Office Sundries'
    ]},
    monthly_expenditure: Number,
    required_monthly: Number,
    shortfall: Number}
  ],
  after_exhausting_montly_budget: {
    reserves_remaining: { type: String, enum: ['Yes', 'No']},
    how_much: String
  }
})

var ResourceAndAssestSchema = new Schema({
  type: { type: String, enum: ['Telephone', 'Cell Phones', 'Vehicle, Immovable Assets', 'Other']},
  possession: { type: String, enum: ['Yes', 'No']},
  specify: String
})

var FundingSchema = new Schema({
  monetary_sources: [MoneySourceSchema],
  non_monetary_source: [NonMoneySourceSchema]
})

var FinancialViabilitySchema = new Schema({
  financial_system: FinancialSystemSchema,
  funding: FundingSchema,
  condition_and_terms_of_funding: [FundingChallengesSchema],
  expenditure: ExpenditureSchema,
  resources_and_assests: [ResourceAndAssestSchema]
})

var CSOLocationSchema = new Schema({
  address: String,
  location: { type: String, enum: ['Urban','Peri-Urban', 'Rural'] },
  town_municipality: String,
  province: { type: String, enum: [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu Natal',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Western Cape'
  ]},
  country: String
})

var StateServicePointSchema = new Schema({
  service_point: { type: String, enum: [
    'Magistrates Court',
    'Police Station',
    'SASSA',
    'Department of Labour',
    'Department of Home Affairs',
    'Department of Social Development'
  ]},
  distance: { type: String, enum: [
    '2km',
    '2 to 5km',
    '5 to 10km',
    '10 to 20km',
    'Over 20km',
    'Over 50km'
  ]}
})

var BeneficiaryAccessSchema = new Schema({
  access_type: { type: String, enum: [
    'Mobile offices',
    'Workshops',
    'Site Visits/Inspections',
    'Media (Pamphlets, notices, posters, Community Radio etc)',
    'Referrals from state agencies',
    'Referrals from other CSOs/CBOs',
    'Referrals from Court',
    'Community Meetings or traditional leaders',
    'Other'
  ]},
  yes_or_no: { type: String, enum: ['Yes', 'No']},
  rank: { type: Number, min: 0, max: 3 },
  specify: String
})

var LanguageAccessibilitySchema = new Schema({
  language: { type: String, enum: [
    'English',
    'Afrikaans',
    'Xhosa',
    'Zulu',
    'Tswana',
    'Venda',
    'Tsonga',
    'Swati',
    'Ndebele',
    'Northern Sotho',
    'Southern Sotho',
    'Other'
  ]},
  cso_staff_language_proficiency: Boolean,
  specify: String
})

var GeographicalReachSchema = new Schema({
  locations: [{
    location:String
  }],
  town_municipalities: [{
    municipality: String
  }],
  provinces: [{
    province: { type: String, enum: [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu Natal',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Western Cape'
    ]}
  }],
  countries: [{
    country: String
  }],
})

var AccessibilitySchema = new Schema({
  cso_location: CSOLocationSchema,
  geographical_reach: GeographicalReachSchema,
  state_service_points: [StateServicePointSchema],
  beneficiary_access: [BeneficiaryAccessSchema],
  language_accessibility: [LanguageAccessibilitySchema]
})

var FocusAreaSchema = new Schema({
  labour_rights: { type: [String], enum: ['UIF','Workman’s Compensation', 'Working Conditions', 'CCMA Support'] },
  legal_rights: { type: [String], enum: ['Legal Representation', 'Access to Information'] },
  gender: { type: [String], enum: ['Domestic Violence', 'Rape'] },
  children: { type: [String], enum: ['Child Abuse', 'Child Neglect', 'Social Services (grants)'] },
  housing: { type: [String], enum: ['Access to Housing', 'Evictions', 'Living Conditions', 'Water and Sanitation'] },
  health: { type: [String], enum: ['Access to Healthcare', 'Health Promotion'] },
  education: { type: [String], enum: ['School', 'Further Education and Training', 'ECD' ] },
  social_services: { type: [String], enum: ['Access to Protection Services (Social Workers)', 'Grants'] },
  safety_crime_and_violence: { type: [String], enum: ['Prevention programmes', 'Support services to victims who have succumbed to violence', 'Restorative Justice/ADR/Conflict Dispute Resolution/Mediation'] },
  debt_management: { type: [String], enum: ['Counselling', 'Legal Advice'] },
  family_law: { type: [String], enum: ['Deceased estates', 'Wills', 'Divorce', 'Maintenance', 'Custody'] },
  top_five_focus_areas: [
    {
      focus_area: { type: String, enum: [
        'Labour Rights',
        'Labour Rights',
        'Legal Rights',
        'Gender',
        'Children',
        'Housing',
        'Health',
        'Education',
        'Social Services',
        'Safety Crime and Violence',
        'Debt Management',
        'Family Law',
        'Other'
      ]},
      specify: String,
      narrative: String,
      rank: { type: Number, min: 0, max: 5}
    }
  ]
})

var TargetBeneficiaryGroupSchema = new Schema({
  beneficiary_type: {
    type: String,
    enum: [
      'General population',
      'Children’s Rights (under 18 years)',
      'Women',
      'Youth (14-35yrs)',
      'LGBTI',
      'Migrants & refugees',
      'Vulnerable workers',
      'Sex Workers',
      'Farmworkers and Farm dwellers',
      'Rural poor communities',
      'Urban poor communities',
      'People living with disabilities',
      'People affected by HIV/AIDs',
      'Other'
    ]
  },
  yes_or_no: { type: String, enum: ['Yes', 'No'] },
  subcategory: String,
  specify: String
})

var FocusAreaAndBeneficiaryGroupSchema = new Schema({
  focus_area: FocusAreaSchema,
  target_beneficiary_group: [TargetBeneficiaryGroupSchema]
})

var ActivityParticipationSchema = new Schema({
  activity: {
    type: String,
    enum: [
      'Advocacy and Lobbying/ Awareness',
      'Research',
      'Human Rights Education and Awareness' ,
      'Health promotion',
      'Public and civic participation',
      'Community mobilisation',
      'Capacity building of civil society organisations',
      'Community Development',
      'Conflict Dispute Resolution/Mediation/ADR',
      'Skills Development',
      'Business Development',
      'Help/Provide Access to information/services',
      'Networking and Forums',
      'Monitoring and Evaluation',
      'Fundraising',
      'Service Delivery Provision',
      'Provide advice services',
      'Psycho-social services',
      'Trauma Counselling',
      'Diversion Services',
      'Assisting with applications to access social grants, ID applications, UIF, workman’s compensation, drafting letters etc.',
      'Other Statutory Services performed on behalf of state'
    ]
  },
  yes_or_no: { type: String, enum: ['Yes', 'No'] },
  specify: String
})

var TotalNumberOfCasesSchema = new Schema({
  period: {
    from: {type: Date, get: getEpoch},
    to: {type: Date, get: getEpoch}
  },
  cases: Number
}, { toJSON: {getters: true} })

var ReferralSchema = new Schema({
  referral_type: {
    type: String,
    enum: [
      'Legal Aid',
      'Social Services',
      'Chapter 9’s/Ombudsman',
      'Other'
    ]
  },
  referrals: [
    {
      place: String,
      times: Number
    }
  ],
  other: String
})

var ProgrammesRanSchema = new Schema({
  year: {type: Date, get: getEpoch},
  description: String
}, { toJSON: {getters: true} })

var ServiceProvisionSchema = new Schema({
  activity_participation: [ActivityParticipationSchema],
  average_number_of_cases_per_day: Number,
  total_number_of_cases: [TotalNumberOfCasesSchema],
  referrals_past_month: {
    month: {type: Date, get: getEpoch},
    referrals: [ReferralSchema]
  },
  programmes_ran: [ProgrammesRanSchema],
  achievements_impact: [ {
    achievement_impact: String
  }]
}, { toJSON: {getters: true} })

var StoryOfSignificantChangeSchema = new Schema({
  how_long_have_you_been_a_client_of_this_cao: String,
  what_do_you_think_is_important_about_the_work_that_the_cao_does_for_your_community: String,
  what_are_the_important_changes_that_have_occurred_in_your_life_from_the_assistance_you_have_received_from_the_cao: String,
  have_you_experienced_any_challenges_in_receiving_assistance_from_this_cao: String
})

var SurveyInstanceSchema = new Schema({
  general: GeneralSchema ,
  governance: GovernanceSchema,
  organisational_capacity_and_resources: OrganisationalCapacityAndResourceSchema,
  financial_viability: FinancialViabilitySchema,
  accessibility: AccessibilitySchema,
  focus_area_and_beneficiary_group: FocusAreaAndBeneficiaryGroupSchema,
  service_provision: ServiceProvisionSchema,
  story_of_significant_change: [StoryOfSignificantChangeSchema],
  narrative: [{
    story_of_significant_change: String
  }]
})

function getEpoch(d) {
  var d_;
  if (d) {
    d_ = new Date(d);
  } else {
    d_ = new Date();
  }
  return d_.getTime();
  // return d_.toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
  // return d_.toLocaleString(['en-US'], { year: 'numeric', month: 'long', day: '2-digit' })
}

var SurveyInstance = mongoose.model('SurveyInstance', SurveyInstanceSchema)

module.exports = { SurveyInstanceSchema: SurveyInstanceSchema, SurveyInstance: SurveyInstance }
