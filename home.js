$(document).ready(function () {
    $("h1").text("İstifadəçi adı: " + localStorage.getItem("username"));
    
    $(".btn-danger").click(function () {
        window.location.href = "intro.html"
    })
})