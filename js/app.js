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
    <div class="col-5"><p class="font-1">${days[index]}</p></div>
    <div class="col-2"><p class="font-1">${element.temperatureMin}°</p></div>
    <div class="col-2"><p class="font-1">${element.temperatureMax}°</p></div>
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

// (() => {

//   const getImg = new XMLHttpRequest();
//   getImg.onreadystatechange = function() {
//     if (getImg.readyState === 4 && getImg.status === 200) {
//       const data = this.responseText;
//       // let dataArray = data.results;
//       console.log(data);
//       // resultLength = data.results.length;
//       // getImg.onload = addPersonage(dataArray);
//       getImg.onerror = handleError;
//     }
//     // getImg.send();
//   };
//   getImg.open("GET", `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2b171339aa0ec6e8582822c147ff69b4&tags=weather&format=json&1`);
//   console.log('hi');
// })();

// handleError = error => {
//   console.log(error);
// };