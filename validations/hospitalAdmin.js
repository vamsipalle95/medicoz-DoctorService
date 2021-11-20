import Joi from 'joi';

/* Hospital Admin Controller Validation */

const hospitalAdminValidation = {
    signupValidation: Joi.object().keys({
        hospital_name: Joi.string().trim().required().max(55).label('Invalid Hospital Name!'),
        hospital_address: Joi.string().trim().required().label('Address invalid!'),
        hospital_state: Joi.string().trim().required().label('Invalid value!'),
        hospital_locality: Joi.string().trim().required().label('Invalid value'),
        hospital_district: Joi.string().trim().required().label('Invalid value'),
        hospital_reg_number: Joi.number().required().label('required'),
        hospital_certificate: Joi.string().trim().required().label('Required'),
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

    createDoctorProfileValidation: Joi.object().keys({
        verified: Joi.boolean(),
        age: Joi.number().min(1),
        dr_type: Joi.string().required().valid('Allopathy', 'Ayurveda', 'Homeopathy', 'Unani'),
        medical_reg_number: Joi.number().required().min(6),
        state_medical_council: Joi.string().trim().required(),
        medical_reg_year: Joi.number().required().min(4),
        certificate: Joi.string().trim().required(),
        document_type: Joi.string().trim().required(),
        document_image: Joi.string().trim().required(),
    }),

    updateDoctorValidation: Joi.object().keys({
        hospital_pic: Joi.string().trim(),
        gender: Joi.string().trim().valid('male','female','others'),
        age: Joi.number().max(3),
        mobilePhone2: Joi.number().max(10),
        from_time: Joi.string(),
        to_time: Joi.string(),
        department_name: Joi.string().max(55),
        department_phone: Joi.number().max(10),
    })
}

export { hospitalAdminValidation }