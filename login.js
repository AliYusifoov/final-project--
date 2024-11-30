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

  // Login form submission
  $("#loginForm").on("submit", function (event) {
    event.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();

    let isUsernameValid = username.length >= 2 && username.length <= 30;
    let isPasswordValid = password.length >= 2 && password.length <= 30;

    if (isUsernameValid && isPasswordValid) {
      // Check if the username and password match stored values
      let storedUsername = localStorage.getItem("username");
      let storedPassword = localStorage.getItem("password");

      if (username === storedUsername && password === storedPassword) {
        alert("Daxil oldunuz!");
        window.location.href = "home.html"; // Redirect to home or dashboard
      } else {
        alert("İstifadəçi adı və ya şifrə yanlışdır.");
      }
    } else {
      alert("Zəhmət olmasa məlumatları düzgün daxil edin.");
    }
  });
});
