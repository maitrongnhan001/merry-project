
const saveUser = (user)=>{
    return {
        type: "USER_LOGIN",
        payload: user
    }
}

export { 
    saveUser
}