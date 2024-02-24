
const validate = require('./validate');

module.exports.isFirstNameValid = (record,firstNameValidator) => {
    if(firstNameValidator==null){
        return {
            isValid:false,
            message:'doesn\'t have fist name check validation mapper'
        }
    }
    if(record==null || record=='NA'){
        return {
            isValid:false,
            message:'first name cannot be null'
        }
    }

    if(firstNameValidator.get("validationRequired")=='NA' || firstNameValidator.get("validationRequired")=='N'){
        return {
            isValid:true,
            message:'valid record'
        }
    }

    if(firstNameValidator.get("alphaNumericCharacter")!='NA'){
        if(firstNameValidator.get("alphaNumericCharacter")!='N' && validate.containsAlphanumeric(record)){
            return {
                isValid:false,
                message:'first name must not contain alphaNumeric character'
            }
        }
    }

    if(firstNameValidator.get("specialCharacter")!='NA'){

        if( firstNameValidator.get("specialCharacter")!='N' && validate.containsSpecialCharacter(record)){
            return {
                isValid:false,
                message:'first name must not contain specialCharacter character'
            } 
        }
    } 

    if(firstNameValidator.get("onlyAlphabet")!='NA'){
        if( firstNameValidator.get("onlyAlphabet")!='N' && validate.containsSpecialCharacter(record)){
            return {
                isValid:false,
                message:'first name must have only alphabets'
            } 
        }
    } 

    if(firstNameValidator.get("minLength")!='NA'){
        if(validate.checkMinLength(record,firstNameValidator.get("minLength"))){
           
            return {
                isValid:false,
                message:`first name must have minimum length of ${firstNameValidator.get("minLength")}`
            } 
        }
    }

    if(firstNameValidator.get("maxLength")!='NA'){
        if(validate.checkMinLength(record,firstNameValidator.get("maxLength"))){
            return {
                isValid:false,
                message:`first name must have minimum length of ${firstNameValidator.get("maxLength")}`
            } 
        }
    }

    return {
        isValid:true,
        message:'valid record'
    }
}

module.exports.isLastNameValid = (record,lastNameValidator) => {
    if(lastNameValidator==null){
        return {
            isValid:false,
            message:'doesn\'t have last name check validation mapper'
        }
    }
    if(lastNameValidator.get("validationRequired")=='NA' || lastNameValidator.get("validationRequired")=='N'){
        return {
            isValid:true,
            message:'valid record'
        }
    }

    if(lastNameValidator.get("alphaNumericCharacter")!='NA'){
        if(lastNameValidator.get("alphaNumericCharacter")!='N' && validate.containsAlphanumeric(record)){
            return {
                isValid:false,
                message:'last name must not contain alphaNumeric character'
            } 
        }
    }

    if(lastNameValidator.get("specialCharacter")!='NA'){
        if( lastNameValidator.get("specialCharacter")!='N' && validate.containsSpecialCharacter(record)){
            return {
                isValid:false,
                message:'last name must not contain alphaNumeric character'
            } 
        }
    } 

    if(lastNameValidator.get("minLength")!='NA'){
        if(validate.checkMinLength(record,lastNameValidator.get("minLength"))){
           
            return {
                isValid:false,
                message:`last name must have minimum length of ${lastNameValidator.get("minLength")}`
            } 
        }
    }

    if(lastNameValidator.get("maxLength")!='NA'){
        if(validate.checkMinLength(record,lastNameValidator.get("maxLength"))){
            return {
                isValid:false,
                message:`last name must have minimum length of ${lastNameValidator.get("maxLength")}`
            } 
        }
    }

    return {
        isValid:true,
        message:'valid record'
    }
}

module.exports.isMaritalStatusCorrect = (record,maritalStatusValidator) => {

    // let validValues = ["male","m","female","f","unkown","o","other"];
    let validValues = ["single","married","divorced","separated","single parent","domestic partnership","not specified","widowed"];

    if(maritalStatusValidator==null){
        return {
            isValid:false,
            message:'doesn\'t have marital status validation mapper'
        }
    }
    if(record==null || record=='NA'){
        return {
            isValid:false,
            message:'marital cannot be null'
        }
    }

    if(maritalStatusValidator.get("validationRequired")=='NA' || maritalStatusValidator.get("validationRequired")=='N'){
        return {
            isValid:true,
            message:'valid record'
        }
    }
    record = record.toLowerCase();
    
    if(!validValues.includes(record)){
        return {
            isValid:false,
            message:'Incorrect marital status'
        }
    }

    return {
        isValid:true,
        message:'valid record'
    }
}


module.exports.isGenderStatusCorrect = (record,genderStatusValidator) => {
    let validValues = ["male","m","female","f","unkown","o","other"];

    if(genderStatusValidator==null){
        return {
            isValid:false,
            message:'doesn\'t have gender check validation mapper'
        }
    }

    if(genderStatusValidator.get("validationRequired")=='NA' || genderStatusValidator.get("validationRequired")=='N'){
        return {
            isValid:true,
            message:'valid record'
        }
    }

    if(!validValues.includes(record.toLowerCase())){
        return {
            isValid:false,
            message:'Incorrect gender value'
        }
    }

    // if(genderStatusValidator.get("alphaNumericCharacter")!='NA' && genderStatusValidator.get("alphaNumericCharacter")!='N'){
    //     if(validate.containsAlphanumeric(record)){
    //         return {
    //             isValid:false,
    //             message:'marital status must not contain alphaNumeric character'
    //         } 
    //     }
    // }

    // if(genderStatusValidator.get("specialCharacter")!='NA' && genderStatusValidator.get("specialCharacter")!='N'){

    //     if(validate.containsSpecialCharacter(record)){
    //         return {
    //             isValid:false,
    //             message:'marital status must not contain alphaNumeric character'
    //         } 
    //     }
    // }

    // if(genderStatusValidator.get("minLength")!='NA'){
    //     if(validate.checkMinLength(record.length,genderStatusValidator.get("minLength"))){
    //         return {
    //             isValid:false,
    //             message:`marital status must have minimum length of ${genderStatusValidator.get("minLength")}`
    //         } 
    //     }
    // }

    // if(genderStatusValidator.get("maxLength")!='NA'){
    //     if(validate.checkMaxLength(record.length,genderStatusValidator.get("maxLength"))){
    //         return {
    //             isValid:false,
    //             message:` marital status must have minimum length of ${genderStatusValidator.get("maxLength")}`
    //         } 
    //     }
    // }

    return {
        isValid:true,
        message:'valid record'
    }
}

module.exports.isContactNoNValid = (record,cnValidator) => {
    console.log("cnValidator: ",cnValidator);
    if(typeof(record) != 'number'){
        return {
            isValid:false,
            message:'Number cannot be a string'
          }
    }

    if(cnValidator==null){
          return {
            isValid:false,
            message:'doesn\'t have contact number validation mapper'
          }
    }

    if(cnValidator.get("validationRequired")=='NA' || cnValidator.get("validationRequired")=='N'){
        return {
            isValid:true,
            message:'valid record'
        }
    }

    // if(cnValidator.get("onlyNumber")!='NA'){
    //     if(cnValidator.get("onlyNumber")!='N' && validate.checkOnlyNumbers(record)){
    //         return {
    //             isValid:false,
    //             message:'contact no must contain only number and it shouldn\'t start with zero'
    //         } 
    //     }
    // }

    console.log("contact is: ",record);
    let noinString = record.toString();

    if(noinString.length!=10){
        return {
            isValid:false,
            message:"contact number must be of length 10"
        }
    }

    return {
        isValid:true,
        message:'valid record'
    }

}

module.exports.isJobTitleValid = (record,jobTitleValidator) => {
    console.log("jobTitleValidator: ",jobTitleValidator);
    if(jobTitleValidator==null){
        return {
            isValid:false,
            message:'doesn\'t have job title validation mapper'
          }
    }

    if(jobTitleValidator.get("validationRequired")=='NA' || jobTitleValidator.get("validationRequired")=='N'){
        return {
            isValid:true,
            message:'valid record'
        }
    }

    if(jobTitleValidator.get("alphaNumericCharacter")!='NA' && jobTitleValidator.get("alphaNumericCharacter")!='N'){
        if(validate.containsAlphanumeric(record)){
            return {
                isValid:false,
                message:'job title must not contain alphaNumeric character'
            } 
        }
    }

    if(jobTitleValidator.get("specialCharacter")!='NA' && jobTitleValidator.get("specialCharacter")!='N'){

        if(validate.containsSpecialCharacter(record)){
            return {
                isValid:false,
                message:'job title must not contain alphaNumeric character'
            } 
        }
    }

    if(jobTitleValidator.get("minLength")!='NA'){
        if(validate.checkMinLength(record.length,jobTitleValidator.get("minLength"))){
            return {
                isValid:false,
                message:`job title must have minimum length of ${jobTitleValidator.get("minLength")}`
            } 
        }
    }

    if(jobTitleValidator.get("maxLength")!='NA'){
        if(validate.checkMaxLength(record.length,jobTitleValidator.get("maxLength"))){
            return {
                isValid:false,
                message:` job title must have maxLength length of ${jobTitleValidator.get("maxLength")}`
            } 
        }
    }

    return {
        isValid:true,
        message:'valid record'
    }
}

module.exports.isDateValid = (record,dobValidator) => {
    if(dobValidator==null){
        return {
            isValid:false,
            message:'doesn\'t Date validation mapper'
          }
    }

    if(dobValidator.get("validationRequired")=='NA' || dobValidator.get("validationRequired")=='N'){
        return {
            isValid:true,
            message:'valid record'
        }
    }

    if(dobValidator.get("dob")!='NA'){
        if(!validate.isValidDateFormat(record,dobValidator.get("dob"))){
            return {
                isValid:false,
                message:'Date is not properly formatted'
            }
        }
    }

    return {
        isValid:true,
        message:''
    }

}