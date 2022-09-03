
module.exports = (htmlStr, course)=>{ // fat arrow function or lambda
    let output = htmlStr.replace(/{%ID%}/g, course.Id);
    output = output.replace(/{%CUSTOMERNAME%}/g, course.customerName);
    output = output.replace(/{%PHONENUMBER%}/g, course.phoneNumber);
    output = output.replace(/{%ADDRESS%}/g, course.address);
    output = output.replace(/{%LOANAMOUNT%}/g, course.loanAmount);
    output = output.replace(/{%INTEREST%}/g, course.interest);
    output = output.replace(/{%LOANTERMYEARS%}/g, course.loanTermYears);
    output = output.replace(/{%LOANTYPE%}/g, course.loanType);
    output = output.replace(/{%DESCRIPTION%}/g, course.description);
    return output;
}
