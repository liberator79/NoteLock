export const ValidateSingin = (email, password) => {
    const responce = {}
    if(email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)){
        if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)){
            return null;
        }
        responce.password = "[A-Z][0-9][a-z][special Character] and length 8-16"
        return responce
    }
    responce.email = "Enter valid email"
    return responce;
}

export const ValidateSingup = (name, email, password) => {
    const responce = {}
    if((name.trim()).length >= 3){
        if(email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)){
            if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)){
                return null;
            }
            responce.password = "[A-Z][0-9][a-z][special Character][length 8-16]"
            return responce
        }
        responce.email = "Enter Valid email"
        return responce
    }
    responce.name = "Name should atleast 3 characters"
    return responce
}