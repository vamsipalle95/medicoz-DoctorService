import Joi from 'joi';

/* doctorController Validation */

const doctorValidation = {
    signupValidation : Joi.object().keys({
        firstName: Joi.string().trim().required().max(55).label('Invalid FirstName!'),
        lastName: Joi.string().trim().required().max(55).label('Invalid LastName'),
        gender: Joi.string().valid('male', 'female', 'others').required(),
        email: Joi.string().trim().email().lowercase().label('Invalid Email Address'),
        password: Joi.string().trim().allow('').optional().min(4).max(25).label('Invalid password'),
        mobileNumber: Joi.number().min(10).required(),
        
    }),

    loginValidation: Joi.object().keys({
        email: Joi.string().trim().required().email().lowercase().label('Invalid Email'),
        password: Joi.string().trim().required().min(4).max(25).label('Invalid Password'),
    }),

    createDoctorProfileValidation:Joi.object().keys({
        verified: Joi.boolean(),
        age: Joi.number().min(1),
        dr_type: Joi.string().required().valid('Allopathy','Ayurveda', 'Homeopathy', 'Unani'),
        medical_reg_number: Joi.number().required().min(6),
        state_medical_council: Joi.string().trim().required(),
        medical_reg_year: Joi.number().required().min(4),
        certificate: Joi.string().trim().required(),
        document_type: Joi.string().trim().required(),
        document_image: Joi.string().trim().required(),
    }),

    updateDoctorValidation:Joi.object().keys({
        degree: Joi.string().trim().allow(''),
        university_college_name: Joi.string().trim().allow(''),
        year_degree_completion: Joi.number().min(4),
        speciality_department: Joi.string().trim().allow(''),
        specialization_type: Joi.string().trim(),
        other_specializations: Joi.string().trim().max(55),
        experience:Joi.number().max(1),
        current_working_status: Joi.string().trim().allow(''),
        current_location:Joi.string().trim().allow(''),
        languages_spoken : Joi.array().max(10),
        bank_name:Joi.string().trim(),
        account_number:Joi.number(),
        bank_location: Joi.string().trim().allow('').min(5),
        ifsc_code:Joi.string().trim().allow(''),
        signature:Joi.string().trim().allow('')
    })
}

export { doctorValidation }