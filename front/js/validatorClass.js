class Validator {    

    isName(name) {        
        let regName = /^[a-zA-Zà-żÀ-Ż]{3,20}(?:[-'\s][a-zA-Zà-żÀ-Ż]{3,20})*$/;
        let result = regName.test(name);
        if (result === false) {
            
            return false;        
        }
        return true;
    }

    isAddress(address) {        
        let regAddress = /[a-zA-Zà-żÀ-Ż]{3,30}?(?:[0-9]+[-'\s][a-zA-Zà-żÀ-Ż]+)*$/;
        let result = regAddress.test(address);
        if (result === false) {
            
            return false;        
        }
        return true;
    }

    isEmail(email) {        
        let regEmail = /^[a-zA-Z0-9]{3,30}(?:[-._][a-zA-Z0-9]+)*[@]{1}[a-zA-Z0-9.\-_]{3,10}[.]{1}[a-z]{2,3}$/;
        let result = regEmail.test(email);
        if (result === false) {
            
            return false;        
        }
        return true;
    }
}