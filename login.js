$(document).ready(function () {
  // Toggle password visibility
  $(".toggle-password").on("click", function () {
    const passwordInput = $("#password");
    const inputType = passwordInput.attr("type");

    if (inputType === "password") {
      passwordInput.attr("type", "text");
      $(this).find("i").removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      passwordInput.attr("type", "password");
      $(this).find("i").removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });

  // Real-time validation for username and password
  let successMessage = "Düzgündür"; // Success message
  
  function validateField(input, condition, successMessage, errorMessage) {
    let field = $(input);
    let parent = field.closest(".form-group");
    
    // Remove any existing validation messages before adding a new one
    parent.find(".validation-message").remove();

    // Check condition and show success or error message
    if (condition) {
      field.removeClass("is-invalid").addClass("is-valid");
      parent.append(`<small class="validation-message text-success">${successMessage}</small>`);
    } else {
      field.removeClass("is-valid").addClass("is-invalid");
      parent.append(`<small class="validation-message text-danger">${errorMessage}</small>`);
    }
  }

  // Username validation
  $("#username").on("input", function () {
    let username = $(this).val();
    validateField(
      this,
      username.length >= 2 && username.length <= 30,
      successMessage,
      "İstifadəçi adı 2-30 simvol arasında olmalıdır."
    );
  });

  // Password validation
  $("#password").on("input", function () {
    let password = $(this).val();
    validateField(
      this,
      password.length >= 2 && password.length <= 30,
      successMessage,
      "Şifrə 2-30 simvol arasında olmalıdır."
    );
  });

  // Function to show a temporary success message
  function showSuccessMessage(message) {
    const successMessage = $(`<div class="alert alert-success">${message}</div>`);
    $(".login-form").prepend(successMessage); // Add message to the top of the form
    setTimeout(() => {
      successMessage.fadeOut(() => successMessage.remove()); // Remove after 1 second
    }, 1000);
  }

  // Login form submission
  $("#loginForm").on("submit", function (event) {
    event.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();

    let isUsernameValid = username.length >= 2 && username.length <= 30;
    let isPasswordValid = password.length >= 2 && password.length <= 30;

    if (isUsernameValid && isPasswordValid) {
      // Retrieve the stored list of users
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the username and password match any user in the list
      let userFound = users.find(user => user.username === username && user.password === password);
      let index;
      let phone;
      users.forEach(user =>{ 
      if (user.username === username && user.password == password) {
        index = users.indexOf(user)
        phone = users[index].phone;
      }
    });
      
      if (userFound) {
        localStorage.setItem("loggedInUsername", userFound.username); // Save the logged-in user's username
        localStorage.setItem("loggedInPhone", phone)
        
        // Show success message
        showSuccessMessage("Uğurla daxil oldunuz!");

        // Redirect after the success message
        setTimeout(() => {
          window.location.href = "home.html";
        }, 1500);
      } else {
        // Show error as a Bootstrap alert
        const errorMessage = $(`<div class="alert alert-danger">İstifadəçi adı və ya şifrə yanlışdır.</div>`);
        $(".login-form").prepend(errorMessage);
        setTimeout(() => {
          errorMessage.fadeOut(() => errorMessage.remove());
        }, 3000); // Error disappears after 3 seconds
      }
    } else {
      const errorMessage = $(`<div class="alert alert-danger">Zəhmət olmasa məlumatları düzgün daxil edin.</div>`);
      $(".login-form").prepend(errorMessage);
      setTimeout(() => {
        errorMessage.fadeOut(() => errorMessage.remove());
      }, 3000);
    }
  });
});
