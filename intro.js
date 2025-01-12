localStorage.removeItem("loggedInUsername");

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
  $(".login").click(function() {
    window.location.href = "login.html";
  })
  $(".btn-success").click(function () {
    window.location.href = "alisverish.html";
  })
})