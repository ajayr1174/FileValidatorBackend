
module.exports.containsAlphanumeric = (str) => {
  // Regular expression to match alphanumeric characters
  var regex = /^[a-zA-Z0-9\s]*$/;
  // Test if the string contains any alphanumeric character
//   return regex.test(str);
return false;
}

module.exports.containsSpecialCharacter = (str) => {
    // Regular expression to match special characters
    var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    // Test if the string contains any special character
    return regex.test(str);
  }
   
  module.exports.isValidDateFormat = (dateString, format = "YYYYMMDD") => {
    // Use a regular expression to match the specified format
    const regex = new RegExp(`^${format.replace(/[YMD]/g, (match) => {
      if (match === "YYYY") {
        return "[0-9]{4}";  // Handle YYYY specifically for 4 digits
      } else {
        return "[0-9]{1,2}"; // Allow 1 or 2 digits for MM and DD
      }
    })}$`);
  
    // Test if the string matches the format
    return regex.test(dateString);
  };


  module.exports.checkOnlyAlbhabets = (str) => {
    const regex =  /^[a-zA-Z]+$/;
    return regex.test(str);
  }

  module.exports.checkOnlyNumbers = (record) => {
    let num = Number(record);
    console.log("num type is: ",typeof(num));
    if (num != "NaN"){
        return true;
    }
      return false;
  }
  module.exports.checkMinLength = (len,minLen) => {
        if(len<minLen){
            return true;
        }
        return false;
  }

  module.exports.checkMaxLength = (len,maxLen) => {
    if(len>maxLen){
        return true;
    }
    return false;
}
  