class Validator {

    constructor(length){
        this.length = length;
    }

    isName(name) {        
        let regName = /^[a-zA-Zà-żÀ-Ż]+(?:[-'\s][a-zA-Zà-żÀ-Ż]+)*$/;
        let result = regName.test(name);
        if (result === false) {
            
            return false;        
        }
        return true;
    }

    isAddress(address) {        
        let regAddress = /[a-zA-Zà-żÀ-Ż]+?(?:[0-9]+[-'\s][a-zA-Zà-żÀ-Ż]+)*$/;
        let result = regAddress.test(address);
        if (result === false) {
            
            return false;        
        }
        return true;
    }

    isEmail(email) {        
        let regEmail = /^[a-zA-Z0-9]+(?:[-._][a-zA-Z0-9]+)*[@]{1}[a-zA-Z0-9.\-_]+[.]{1}[a-z]{2,10}$/;
        let result = regEmail.test(email);
        if (result === false) {
            
            return false;        
        }
        return true;
    }
}