$(document).ready(function () {
  $("#menu").hide();
  $("#resultado").hide();
  $("#sectionSearch").hide();
});

$("#btnMostrarMenu").on("click", function (event) {
  //Evita realizar tu tarea por defcto
  event.preventDefault();
  $("#menu").show();
});

$("#btnHome").on("click", function (event) {
  //Evita realizar tu tarea por defcto
  event.preventDefault();
  $("#sectionSearch").hide();
  $("#resultado").hide();
  $("#bodyCard").show();
});

$("#btnSearch").on("click", function (event) {
  //Evita realizar tu tarea por defcto
  event.preventDefault();
  $("#bodyCard").hide();
  $("#sectionSearch").show();
});

$("#btnCity").on("click", function (event) {
  $("#resultado").show();
  today($("#cityInput").val());
  nextDays($("#cityInput").val());
});

function today(cityInput) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput +
      "&appid=21fed6f7366cfe19d24d9e23f339b81d",
    type: "GET",
  }).done(function (response) {
    var weather = response.weather;
    var description = "";
    var icon = "";
    description = weather[0].description;
    icon = weather[0].icon;
    icon = "img/" + icon + ".png";
    $("#resultado").append(
      "<div class='container'>" +
        "<div class='card'>" +
        "<div class='row g-0'>" +
        "<div class='col-5 col-sm-4'>" +
        "<img src='" +
        icon +
        "'/>" +
        "</div>" +
        "<div class='col-7 col-sm-8'>" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" +
        "Today" +
        "</h5>" +
        "<p class='card-text'>" +
        description +
        "</p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<br></br>" +
        "</div>"
    );
    /*$("#status").html(result);
    $("#img").attr("src", icon);*/
  });
}

function nextDays(cityInput) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityInput +
      "&appid=21fed6f7366cfe19d24d9e23f339b81d",
    type: "GET",
  }).done(function (response) {
    var description = "";
    var icon = "";
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var list = response.list;
    if (list && list.length > 0) {
      for (var i = 4; i < 40; i += 8) {
        description = list[i].weather[0].description;
        icon = list[i].weather[0].icon;
        icon = "img/" + icon + ".png";
        var day = new Date(list[i].dt * 1000);
        var dayName = days[day.getDay()];
        $("#resultado").append(
          "<div class='container'>" +
            "<div class='card'>" +
            "<div class='row g-0'>" +
            "<div class='col-5 col-sm-4'>" +
            "<img src='" +
            icon +
            "'/>" +
            "</div>" +
            "<div class='col-7 col-sm-8'>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'>" +
            dayName +
            "</h5>" +
            "<p class='card-text'>" +
            description +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<br></br>" +
            "</div>"
        );
        /*$("#status").html(result);
        $("#img").attr("src", icon);*/
      }
    }
  });
}
