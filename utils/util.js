
let getKeyName = (columnName) => {
    if(columnName=="First Name"){
        return "first_name";
    }else if(columnName=="Last Name"){
        return "last_name";
    }else if(columnName=="Date of Birth"){
        return "dob";
    }else if(columnName=="Marital Status"){
        return "marital_status";
    }else if(columnName=="Gender"){
        return "gender";
    }else if(columnName=="Contact Number"){
        return "contact_number";
    }else if(columnName=="job title"){
        return "job_title";
    }else if(columnName=="Validation Required"){
        return "validationRequired";
    }else{
        return "";
    }
}

module.exports.getLayoutMapper = (layoutParseData) => {
    let layoutMapper = new Map();

    layoutParseData.forEach((data)=>{
        let keyName = getKeyName(data[0]);
        if(keyName==""){
            console.log("key cannot be empty");
            return;
        }
        layoutMapper.set(keyName,new Map());
        let validationMapper = layoutMapper.get(keyName);
        data?.forEach((cellValue,index)=>{
            if(index==1){
                validationMapper.set("validationRequired",cellValue);
            }else if(index==2){
                validationMapper.set("onlyNumber",cellValue);
            }else if(index==3){
                validationMapper.set("onlyAlphabet",cellValue);
            }else if(index==4){
                validationMapper.set("alphaNumericCharacter",cellValue);
            }else if(index==5){
                validationMapper.set("specialCharacter",cellValue);
            }else if(index==6){
                validationMapper.set("minLength",cellValue);
            }else if(index==7){
                validationMapper.set("maxLength",cellValue);
            }else if(index==8){
                validationMapper.set("dateFormat",cellValue);
            }
        });
    });
    return layoutMapper;
}