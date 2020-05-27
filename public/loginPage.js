"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(data,(object) => { 
        if (object.success && object.userId) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage("Ошибка авторизации");
        }
        })};
userForm.registerFormCallback = data => {
    ApiConnector.register(data,(object) => { 
        console.log(object);
        if (object.success && object.userId) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage("Ошибка регистрации");
        }
        })};