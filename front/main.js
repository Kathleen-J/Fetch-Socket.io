//sockets
  var socket = io();

  //отображение подключенных пользователей на странице
  socket.on('userCount', (data) => {
    //check in browser console
    console.log(data);

    //add new tag with new information (from backend)
    var users = document.getElementById('users');
    users.innerHTML = data;
  });

  //вывод сообщений с сервера с помощью setTimeout & setInterval
  socket.on('message', (data) => {

    //check in browser console
    console.log(data);

    //add new tag with new information (from backend)
    var content = document.createElement('p');
    content.innerHTML = data;
    document.body.append(content);
  });



//weather (fetch)
  const weather = document.querySelector('#weather');

  async function loadWeather(e) {

    const apiWeather = 'https://api.openweathermap.org/data/2.5/weather?units=metric&id=1488754&lang=ru&appid=9918cd68ecbb9f755feb88bbd9cba7c8';
    const response = await fetch(apiWeather, {
      method: "GET",
    });
    const responseResult = await response.json();

    if(response.ok) {
      getWeather(responseResult);
    } else {
      weather.innerHTML = responseResult.message;
    }

    function getWeather(data) {

      const location = data.name;
      const temp = Math.round(data.main.temp);
      const feelsLike = Math.round(data.main.feels_like);
      const weatherStatus = data.weather[0].description;
      const weatherIcon = data.weather[0].icon;

      const template = `
      <p>City: ${location}<p>
      <p>Temperature: ${temp}<p>
      <p>Feels like: ${feelsLike}<p>
      <p>Weather status: ${weatherStatus}<p>
      <p><img src='https://api.openweathermap.org/img/w/${weatherIcon}.png' alt='${weatherStatus}'><p>
      `;

      console.log(data);
      weather.innerHTML = template;

    };
  };

  if(weather) {
    loadWeather();
  };
