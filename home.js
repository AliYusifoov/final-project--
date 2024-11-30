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
    $("h1").text("İstifadəçi adı: " + localStorage.getItem("username"));
    
    $(".btn-danger").click(function () {
        window.location.href = "intro.html"
    })
    $(".btn-primary").click(function () {
      window.location.href = "computers.html"
    })
    $(".btn-warning").click(function () {
      window.location.href = "alisverish.html"
    })
})