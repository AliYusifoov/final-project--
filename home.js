document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  });
$(document).ready(function () {
  const loggedInUsername = localStorage.getItem("loggedInUsername");
    
  // Display the username in the header
  if (loggedInUsername) {
      $("h1").text("İstifadəçi adı: " + loggedInUsername);
  } else {
      $("h1").text("İstifadəçi adı: Yoxdur"); 
  }

  $(".btn-danger").click(function () {
      localStorage.removeItem("loggedInUsername"); 
      window.location.href = "intro.html"; 
  });

  $(".btn-primary").click(function () {
      window.location.href = "computers.html"; 
  });

  $(".btn-warning").click(function () {
      window.location.href = "alisverish.html"; 
  });

})