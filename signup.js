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

  // Password validation logic
  $("#password").on("input", function () {
    const password = $(this).val();
    const parent = $(this).closest(".form-group");
    const message = parent.find(".validation-message");

    if (password.length >= 8) {
      $(this).removeClass("is-invalid").addClass("is-valid");
      message.text("Düzgündür").removeClass("text-danger").addClass("text-success");
    } else {
      $(this).removeClass("is-valid").addClass("is-invalid");
      message.text("Şifrə ən azı 8 simvol olmalıdır.").removeClass("text-success").addClass("text-danger");
    }
  });

  // Reusable validation function
  function validateField(input, condition, successMessage, errorMessage) {
    const field = $(input);
    const parent = field.closest(".form-group");
    parent.find(".validation-message").remove(); // Clear existing message

    if (condition) {
      field.removeClass("is-invalid").addClass("is-valid");
      parent.append(`<small class="validation-message text-success">${successMessage}</small>`);
    } else {
      field.removeClass("is-valid").addClass("is-invalid");
      parent.append(`<small class="validation-message text-danger">${errorMessage}</small>`);
    }
  }

  // Individual field validation
  $("#name").on("input", function () {
    const name = $(this).val();
    validateField(
      this,
      name.length >= 2 && name.length <= 30,
      "Düzgündür",
      "Ad 2-30 simvol arasında olmalıdır."
    );
  });

  $("#phone").on("input", function () {
    const phone = $(this).val();
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    validateField(
      this,
      phoneRegex.test(phone),
      "Düzgündür",
      "Telefon nömrəsi düzgün formatda olmalıdır (000-000-0000)."
    );
  });

  $("#username").on("input", function () {
    const username = $(this).val();
    validateField(
      this,
      username.length >= 2 && username.length <= 30,
      "Düzgündür",
      "İstifadəçi adı 2-30 simvol arasında olmalıdır."
    );
  });

  // Form submission
  $("#signupForm").on("submit", function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const phone = $("#phone").val();
    const username = $("#username").val();
    const password = $("#password").val();

    const isNameValid = name.length >= 2 && name.length <= 30;
    const isPhoneValid = /^\d{3}-\d{3}-\d{4}$/.test(phone);
    const isUsernameValid = username.length >= 2 && username.length <= 30;
    const isPasswordValid = password.length >= 2 && password.length <= 30;

    if (isNameValid && isPhoneValid && isUsernameValid && isPasswordValid) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("phone", phone)
      alert("Hesab yaradıldı!");
      window.location.href = "login.html";
    } else {
      alert("Zəhmət olmasa bütün məlumatları düzgün daxil edin!");
    }
  });
});
