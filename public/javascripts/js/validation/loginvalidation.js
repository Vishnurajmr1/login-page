document.getElementById("email").addEventListener('input', validateEmail);
document.getElementById("password").addEventListener('input', validatePassword);



// Function to validate email
function validateEmail() {
  const emailError = document.getElementById("emailError");
  const email = document.getElementById('email').value.trim();

  if (email === "") {
    emailError.textContent ="Please enter an email address";
  } else {
    emailError.textContent = "";
  }
}

// Function to validate password
function validatePassword() {
  const passwordError = document.getElementById("passwordError");
  const password = document.getElementById('password').value.trim();

  if (password ==="") {
    passwordError.textContent = "Please enter a password";
  } else if (password.length < 8) {
    passwordError.textContent = "Password must be longer than 8 characters";
  }else if(!/[A-Z]/.test(password)){
      passwordError.textContent="Password must contain at least one uppercase letter";
  }else if(!/[a-z]/.test(password)){
      passwordError.textContent="Password must contain at least one lowercase letter";
      return false;
  }else if(!/[0-9]/.test(password)){
      passwordError.textContent="Password must contain at least one numeric digit";
  }else if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
      passwordError.textContent="Password must contain at least one special character";
  }else {
    passwordError.textContent = "";
  }
}

function validateName(){
  const usernameError = document.getElementById("nameError");

  const username = document.getElementById('name').value.trim();
    // const usernamePattern=/^(?=.*[A-Z])+(?=.*\d)[A-Za-z/d]{3,}$/;
    const usernamePattern=/^[A-Z][a-z0-9_A-Z\.]+$/
    const validUsername=usernamePattern.test(username);

    const hasUpperCase=/[A-Z]/.test(username);
    const hasNumber=/\d/.test(username);
    if(!username){
      usernameError.textContent="Please enter a username";
    }else if(!hasUpperCase){
        usernameError.textContent="Username must contain at least one uppercase letter";
      }
      else if(!hasNumber){
        usernameError.textContent="Username must contain at least one number";
      }
      else if(username.length<3){
        usernameError.textContent="Username must be at least 3 characters long";
      }
      else if(!validUsername){
        usernameError.textContent="Please capitalize the First letter of the username";
      }
      else {
        usernameError.textContent = "";
        }
  }
  document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  validateEmail();
  validatePassword(); 

  // Check if there are any validation errors before submitting the form
  const emailError = document.getElementById("emailError").textContent;
  const passwordError = document.getElementById("passwordError").textContent;
  if (emailError === "" && passwordError === "") {
    this.submit();
  }
}); 

document.getElementById("edit-user").addEventListener("submit", async function(event) {
  event.preventDefault();
  validateEmail();
  validateName();
  // Check if there are any validation errors before submitting the form
  const emailError = document.getElementById("emailError").textContent;
  const usernameError=document.getElementById('nameError').textContent;
  if (emailError ==="" && usernameError==="") {
    this.submit();
  }
}); 