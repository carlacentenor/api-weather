$(document).ready(function() {
  searchPosition();
  let btnWeather = $('.btn-weather');
  btnWeather.on('click', searchWeek);

  function searchWeek() {
    window.location.href = 'views/week.html';
  }

  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  function getWeather(data) {
    let imgWeather = $('.icon-weather');
    let contentWeek = $('#content-week');
    let temperature = $('.temperature');
    let wind = $('#wind');
    let humidity = $('#humidity');
    let uvIndex = $('#uv-index');
    let pressure = $('#pressure');
    let summary = $('#summary');
    let responseToday = data.currently;
    let responseWeek = data.daily.data;
    let icon = responseToday.icon;
    console.log(responseToday);
    temperature.text(responseToday.temperature + '°');
    wind.text(responseToday.windSpeed + 'm/s');
    humidity.text(responseToday.humidity + '%');
    uvIndex.text(responseToday.uvIndex);
    pressure.text(responseToday.pressure + 'hPa');
    summary.text(responseToday.summary);
    imgWeather.attr('src', `assets/images/${responseToday.icon}.png`);
    // result week
    let result = responseWeek.slice(0, 7);

    result.forEach((element, index) => {
      let template = `<div class = "row">
    <div class="col-2"><img class="w100" src="../assets/images/${element.icon}.png"></div>
    <div class="col-6"><p>${days[index]}</p></div>
    <div class="col-2"><p>${element.temperatureMin}°</p></div>
    <div class="col-2"><p>${element.temperatureMax}°</p></div>
    </div>`;
      contentWeek.append(template);
    });
  }


  function searchPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let myPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var apiLinkDS = `https://api.darksky.net/forecast/1b9d45dee8530a56a4812dae9f26fd27/${myPosition.lat},${myPosition.lng}?units=si`;

        $.ajax({
          url: proxy + apiLinkDS,
          success: getWeather
        });
      });
    } else {
      console.log('Su navegador no soporta Geolocalización');
    }
  }
});