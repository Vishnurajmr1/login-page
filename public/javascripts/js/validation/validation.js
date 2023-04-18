// const { validate } = require("../../config/user-schema");

document
  .getElementById("signupForm")
  .addEventListener("submit", async function(event) {
    event.preventDefault(); //prevent form submission

    //get form input values and trim leading/trailing spaces
    const username = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    // const phone = document.getElementById("phone").value.trim();

    const checkbox=document.getElementById("checkbox1");
    //Get error message elements

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const checkboxError=document.getElementById("checkboxError");
    // const phoneError = document.getElementById("phoneError");

    //Reset error messages

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    checkboxError.textContent="";
    // phoneError.textContent = "";

    //perform validation

    if(!userNamePattern(username)){
        // usernameError.textContent='Please enter a username ';
        return;
    }
    if(!email ||!validateEmail(email)){
      emailError.textContent="Please enter a valid email address";
      return;
  }
    // if(!password){
    //   passwordError.textContent="Please Enter a strong password";
    //   return;
    // }
    if(checkStrongPassword(password)){
        console.log('Password is strong.');
    }else{
      return;
        // passwordError.textContent="Password is not strong.Please enter a new password";
    }
    if(!(checkbox.checked)){
      checkboxError.textContent="Please accept terms and condition"
      return;
    }
    // if(!phone || !validatePhone(phone)){
    //     phoneError.textContent="Please enter a valid phone number";
    //     return;
    // }

    const data = {
      username: username,
      password: password,
      email: email,
    };
  
    // Send the form data to the server using an HTTP POST request
    // //if validation passes,submit the form
    this.submit();
  });

  //function to validate email format

  function validateEmail(email){
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/;
    // const validEmail=emailPattern.test(email);
    return emailPattern.test(email);
    // return emailPattern.test(email) && email.includes('@') && email.includes('.') && emailPattern.test(email.split('@')[1]);

    //Additional checks for email validation
    // const hasAtSymbol=email.includes('@');
    // const hasDomain=email.includes('.');
    // const hasValidDomain=emailPattern.test(email.split('@')[1]);

    // return validEmail && hasAtSymbol && hasDomain && hasValidDomain;
  }

  //function to validate phone number format

  // function validatePhone(phone){
  //   const phonePattern=/^\d{10}$/;
  //   return phonePattern.test(phone);
  // }

  function checkStrongPassword(password){
    if(!password){
        passwordError.textContent="Please enter a password";
        return false;
    }
    if(password.length<8){
        passwordError.textContent="Password must be at least 8 characters long";
        return false;
    }
    if(!/[A-Z]/.test(password)){
        passwordError.textContent="Password must contain at least one uppercase letter";
        return false;
    }
    if(!/[a-z]/.test(password)){
        passwordError.textContent="Password must contain at least one lowercase letter";
        return false;
    }
    if(!/[0-9]/.test(password)){
        passwordError.textContent="Password must contain at least one numeric digit";
        return false;
    }
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        passwordError.textContent="Password must contain at least one special character";
        return false;
    }
    return true;
  }
  function userNamePattern(username){
    // const usernamePattern=/^(?=.*[A-Z])+(?=.*\d)[A-Za-z/d]{3,}$/;
    const usernamePattern=/^[A-Z][a-z0-9_A-Z\.]+$/
    const validUsername=usernamePattern.test(username);

    const hasUpperCase=/[A-Z]/.test(username);
    const hasNumber=/\d/.test(username);
    if(!username){
      usernameError.textContent="Please enter a username";
      return false;
    }
      if(!hasUpperCase){
        usernameError.textContent="Username must contain at least one uppercase letter";
        return false;
      }
      if(!hasNumber){
        usernameError.textContent="Username must contain at least one number";
        return false;
      }
      if(username.length<3){
        usernameError.textContent="Username must be at least 3 characters long";
        return false;
      }
      if(!validUsername){
        usernameError.textContent="Please capitalize the First letter of the username";
        return false;
      }
    // if(!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{3,}$/.test(username)){
    //   usernameError.textContent="Please enter a username with first letter capital";
    //   return false;
    // }
    return true;
  }
 

  // function validateForm(){
  //   document.getElementById("email").addEventListener('input', validateEmail);
  //   document.getElementById("password").addEventListener('input', validatePassword);
  
  //   // Function to validate email
  //   function validateEmail() {
  //     const emailError = document.getElementById("emailError");
  //     const email = document.getElementById('email').value.trim();
  
  //     if (email === "") {
  //       emailError.textContent = "Please enter an email address";
  //     } else {
  //       emailError.textContent = "";
  //     }
  //   }
  
  //   // Function to validate password
  //   function validatePassword() {
  //     const passwordError = document.getElementById("passwordError");
  //     const password = document.getElementById('password').value.trim();
  
  //     if (password === "") {
  //       passwordError.textContent = "Please enter a password";
  //     } else if (password.length < 8) {
  //       passwordError.textContent = "Password must be longer than 8 characters";
  //     }else if(!/[A-Z]/.test(password)){
  //         passwordError.textContent="Password must contain at least one uppercase letter";
  //     }else if(!/[a-z]/.test(password)){
  //         passwordError.textContent="Password must contain at least one lowercase letter";
  //         return false;
  //     }else if(!/[0-9]/.test(password)){
  //         passwordError.textContent="Password must contain at least one numeric digit";
  //     }else if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
  //         passwordError.textContent="Password must contain at least one special character";
  //     }else {
  //       passwordError.textContent = "";
  //     }
  //   }
  
  //   document.getElementById("loginForm").addEventListener("submit", async function(event) {
  //     event.preventDefault();
  //     validateEmail();
  //     validatePassword();
  
  //     // Check if there are any validation errors before submitting the form
  //     const emailError = document.getElementById("emailError").textContent;
  //     const passwordError = document.getElementById("passwordError").textContent;
  //     if (emailError === "" && passwordError === "") {
  //       this.submit();
  //     }
  //   });
  // }