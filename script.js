/// <reference path="../typings/index.d.ts" />

var recaptchaValidator = 1;
var loginControl = 0;
var recaptchaTik = 0;



function loginValidateSuccess(){
        $("#registerFormContainer #cngrtScreen p").text("Başarıyla Giriş Yaptınız.")
        $("#registerFormContainer #cngrtScreen").css("visibility","visible")
        $("#registerFormContainer #cngrtScreen").animate({
            opacity:1
        },300)

        setTimeout(function(){
            $("#registerFormContainer #cngrtScreen").css("visibility","hidden")
            $("#registerFormContainer #cngrtScreen").css("opacity","0")
            window.open("userInfo.html")
            let url = window.location.href;
            window.location.href = url;
        },2000)

        setTimeout(function(){
            $("#registerFormContainer #cngrtScreen p").text("Başarıyla Kayıt Oldunuz.")
        },3000)

    $("#registerFormContainer #form div .forms input#loginUserName").val("");
    $("#registerFormContainer #form div .forms input#loginPassword").val("");
}
    
function recaptcha_callback(){
    
    recaptchaTik = 2;
}
$(document).ready(function(){
    let reset = 0;

    let loginButton = $("#loginButton");

    let signUpButton = $("#signUpButton");

    loginButton.click(loginButtonFunction);

    function loginButtonFunction(){
        if(reset==0){
            $("#registerFormContainer #formForm #signUpForm").animate({
                right:"100%"
            },1000)

            $("#registerFormContainer #formForm #cngrtScreen").animate({
                right:"100%"
            },1000)

            $("#registerFormContainer #formForm #cngrtScreen").animate({
                right:"0"
            },2500)

            $("#registerFormContainer #formForm #loginForm").animate({
                left:0
            },1000)

            $("#registerFormContainer div#ekranYazisi h1:first-child").animate({
                left:"-100%"
            },1000)

            $("#registerFormContainer div#ekranYazisi h1:last-child").animate({
                left:0
            },1000)
                    
            reset++;
            setTimeout(function(){
                $("#registerFormContainer #form div .forms input#nameSurname").val("");
                $("#registerFormContainer #form div .forms input#signUserName").val("");
                $("#registerFormContainer #form div .forms input#signPassword").val("");
            },1000)
            
            setTimeout(function(){
                $("#registerFormContainer #form #signUpForm .errorCode").css("visibility","hidden");
            },1000)
        }
    }  
      

    signUpButton.click(function(){
        if(reset==1){
            $("#registerFormContainer #formForm #signUpForm").animate({
                right:"0"
            },1000)

            $("#registerFormContainer #formForm #loginForm").animate({
                left:"125%"
            },1000)

            $("#registerFormContainer div#ekranYazisi h1:first-child").animate({
                left:"0"
            },1000)

            $("#registerFormContainer div#ekranYazisi h1:last-child").animate({
                left:"100%"
            },1000)
            reset--;

            setTimeout(function(){
                $("#registerFormContainer #form div .forms input#loginUserName").val("");
                $("#registerFormContainer #form div .forms input#loginPassword").val("");
            },1000)

            setTimeout(function(){
                $("#registerFormContainer #form #loginForm .errorCode").css("visibility","hidden");
            },1000)
        }

    })


    let signUpFormButton = $("#registerFormContainer #form #signUpForm input#signUpFormButton");

    let loginFormButton = $("#registerFormContainer #form #loginForm input#loginFormButton");

    signUpFormButton.click(signUpFormValidate);

    loginFormButton.click(loginFormValidate);

    function signUpFormValidate(){
        if(localStorage.getItem("persons") == null){
            localStorage.setItem("persons",JSON.stringify([]));
        }
        $("#registerFormContainer #form #signUpForm .errorCode").css("visibility","visible");
        let validate = [0,0,0,0];
        const nameSurname =$("#registerFormContainer #form div .forms input#nameSurname");
        const age =$("#registerFormContainer #form div .forms input#age");
        const signUserName =$("#registerFormContainer #form div .forms input#signUserName");
        const signPassword =$("#registerFormContainer #form div .forms input#signPassword");
        

        if(nameSurname.val() == 0){
            $("#registerFormContainer #form #nameSurnameError").text("Lütfen isminizi giriniz.")
            validate[0]=0;
        }else if(nameSurname.val().length <8){$("#registerFormContainer #form #nameSurnameError").text("En az 8 karakter giriniz.");validate[0]=0;}
        else{$("#registerFormContainer #form #nameSurnameError").css("visibility","hidden");validate[0]=1};

        if(age.val() == 0){
            $("#registerFormContainer #form #ageError").text("Lütfen yaşınızı giriniz.")
            validate[1]=0;
        }
        else{$("#registerFormContainer #form #ageError").css("visibility","hidden");validate[1]=1};

        if(signUserName.val() == 0){
            $("#registerFormContainer #form #signUserNameError").text("Lütfen kullanıcı adınızı giriniz.")
            validate[2]=0;
        }else if(signUserName.val().length <3){$("#registerFormContainer #form #signUserNameError").text("En az 3 karakter giriniz.");validate[1]=0;}
        else if(localStorage.getItem(signUserName.val()) != null){
            $("#registerFormContainer #form #signUserNameError").text("Böyle bir kullanıcı adı kullanılıyor.");validate[2]=0;}
        else{$("#registerFormContainer #form #signUserNameError").css("visibility","hidden");validate[2]=1};



        if(signPassword.val() == 0){
            $("#form #signPasswordError").text("Lütfen şifrenizi giriniz.")
            validate[3]=0;
        }else if(signPassword.val().length <8){$("#registerFormContainer #form #signPasswordError").text("En az 8 karakter giriniz.");validate[3]=0;}
        else{$("#registerFormContainer #form #signPasswordError").css("visibility","hidden");validate[3]=1};
        
        if (validate[0] == 1 && validate[1] == 1 && validate[2] == 1 && validate[3] == 1){

            let value = [nameSurname.val(),age.val(),signPassword.val()];

            localStorage.setItem(signUserName.val(),JSON.stringify(value)); 

            let personsList = JSON.parse(localStorage.getItem("persons"));

            personsList.push(signUserName.val());

            localStorage.setItem("persons",JSON.stringify(personsList));

            nameSurname.val("");
            signPassword.val("");
            signUserName.val("");
            age.val("");

            $("#registerFormContainer #cngrtScreen").css("visibility","visible")
            $("#registerFormContainer #cngrtScreen").animate({
                opacity:1
            },300)
            setTimeout(function(){
                loginButtonFunction();
            },1000)
            setTimeout(function(){
                $("#registerFormContainer #cngrtScreen").css("visibility","hidden")
                $("#registerFormContainer #cngrtScreen").css("opacity","0")
            },2000)
            
        };
        
    }

    function loginFormValidate(){
        loginControl = 0;
        $("#registerFormContainer #form #loginForm .errorCode").css("visibility","visible");

        if(recaptchaTik == 0){
            $("#registerFormContainer #form #recaptchaError").css("visibility","hidden");
        }

        const loginUserName =$("#registerFormContainer #form div .forms input#loginUserName");
        const loginPassword =$("#registerFormContainer #form div .forms input#loginPassword");

        if(loginUserName.val() == 0){
            $("#registerFormContainer #form #loginUserNameError").text("Lütfen kullanıcı adınızı giriniz.")
        }
        else{
            $("#registerFormContainer #form #loginUserNameError").css("visibility","hidden");
        }

        

        if(loginPassword.val() == 0){
            $("#registerFormContainer #form #loginPasswordError").text("Lütfen şifrenizi giriniz.")
        }else if(localStorage.getItem(loginUserName.val()) == null || JSON.parse(localStorage.getItem(loginUserName.val()))[2] != loginPassword.val()){
            $("#registerFormContainer #form #loginPasswordError").text("Kullanıcı adınız veya şifreniz hatalı");
            recaptchaValidator = 0;
        }else{
            $("#registerFormContainer #form #loginPasswordError").css("visibility","hidden");
            loginControl = 1;
        }

        if(recaptchaValidator==0){
            console.log(recaptchaTik);
            $("#recaptchaBox").show();
            if(recaptchaTik==1){$("#registerFormContainer #form #recaptchaError").css("visibility","visible");
            $("#registerFormContainer #form #recaptchaError").text("Lütfen doğrulama yapınız");}
            else if(recaptchaTik == 0){recaptchaTik++;}

            else if(recaptchaTik == 2){
                $("#registerFormContainer #form #recaptchaError").css("visibility","hidden");
                if(loginControl==1){
                    localStorage.setItem("person",loginUserName.val());
                    loginValidateSuccess()
                    
                }                
            };
        }

        if(recaptchaValidator == 1 && loginControl == 1){
            localStorage.setItem("person",loginUserName.val());
            loginValidateSuccess()};
        
    }
    
    
        
})


