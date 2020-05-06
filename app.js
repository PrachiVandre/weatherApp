window.addEventListener('load', () => {
    let long;
    let lat;
    let tempdesc = document.querySelector('.temperature-description');
    let tempedegree = document.querySelector('.temperature-degree');
    let loc = document.querySelector('.location-timezone');
    let iconElement = document.querySelector(".weather-icon");
    const weather = {};

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
           // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=dc6c8a8122fe8e6a5eb0657d8baafa0d`;
            // const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?q=India&appid=dc6c8a8122fe8e6a5eb0657d8baafa0d`;

          fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                console.log(data);
               
                //It looks like kelvin. Converting kelvin to celsius is easy: Just subtract 273.15.
                weather.temp = Math.round(data.main.temp - 273);
                weather.desc = data['weather'][0]['description'];
               //const timeZone = data.name;
               weather.timeZone = data.name;
               weather.country = data.sys.country;
              // const iconImg = data['weather'][0]['icon'];
               weather.iconImg = data.weather[0].icon; 

                //Set DOM elem from api
                tempedegree.textContent = `${weather.temp}°C `;
                tempdesc.textContent = weather.desc;
                loc.textContent = `${weather.timeZone}, ${weather.country}`;

              
            })
            .then(function(){
                displayweather();
            });
        });
    }

    function displayweather(){
      
        iconElement.innerHTML = `<img src="icons/${ weather.iconImg}.png">`;
        //iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    }
  
});


