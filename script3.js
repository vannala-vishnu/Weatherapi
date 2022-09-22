var lat;
var lon;
var place;

let weather = {
    apiKey: "80cd7371dbfdd74a6a6856329f58e159",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    fetchWeatherforecast: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayforecast(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".mplace").innerText = "Weather in " + name;
      document.querySelector(".micon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".mdescription").innerText = description;
      document.querySelector(".mtemp").innerText = temp + "°C";
      document.querySelector(".mhumidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".mwind").innerText =
        "Wind speed: " + speed + " km/h";




        

      
    },

    displayforecast :function(data){
      for(var i=0;i<40;i++){
        var xdate="date"+(i+1);
        var xtime='time'+(i+1);
        var xpic="pic"+(i+1);
        var xpop="prec"+(i+1);
        var xfeel="feel"+(i+1);
       
        var xtemp="temp"+(i+1);
        var xdesc="desc"+(i+1);
        

        
        const { icon, description} = data.list[i].weather[0];
        const { temp, feels_like } = data.list[i].main;
        var dt=data.list[i].dt_txt;
        
        var dat=(dt.substring(0,10)+"T"+dt.substring(11,19)+"Z").toLocaleString();
         var date=new Date(dat)+"";
         
        document.getElementById(xdate).innerText = date.substring(4,10);
        var ampm=parseInt(date.substring(16,18));
        if(ampm<12){
          document.getElementById(xtime).innerText=date.substring(16,21)+" am";
        }
        else{
          ampm=ampm%12;
          if(ampm==0){
            ampm=12;
          }
          document.getElementById(xtime).innerText=ampm+date.substring(18,21)+" pm";
        }
        
        document.getElementById(xpic).src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.getElementById(xpop).innerText =data.list[i].pop+"%" ;
        document.getElementById(xfeel).innerText = "RealFeel®"+feels_like+"°";
        document.getElementById(xdesc).innerText = description;
        document.getElementById(xtemp).innerText = temp + "°C";
       
      }
      
      place=data.city.name;
      lat=data.city.coord.lat;
      lon=data.city.coord.lon;

      this.fetchaqi(lat,lon);

    },
    fetchaqi : function(lat,lon) {
      
        fetch(
          "http://api.openweathermap.org/data/2.5/air_pollution?lat="+lat+"&lon="+lon+"&appid="+this.apiKey
          
        )
          .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayaqi(data));
    },
    displayaqi : function(data) {
      let qua=data.list[0].main.aqi;
      
      if(qua==5){
        document.getElementById("aqi").innerText="Air quality in "+place+" is Very Poor";
        document.getElementById("aqi").style.color="rgb(71, 17, 250)";
      }
      else if(qua==4){
        document.getElementById("aqi").innerText="Air quality in "+place+" is Poor";
        document.getElementById("aqi").style.color="red";
      }
      else if(qua==3){
        document.getElementById("aqi").innerText="Air quality in "+place+" is Moderate";
        document.getElementById("aqi").style.color="orange";
      }
      else if(qua==2){
        document.getElementById("aqi").innerText="Air quality in "+place+" is Fair";
        document.getElementById("aqi").style.color="rgb(187, 255, 0)";
      }
      else{
        document.getElementById("aqi").innerText="Air quality in "+place+" is Good";
        document.getElementById("aqi").style.color="green";
      }
      console.log(data);
      document.getElementById("co").innerText="CO : "+data.list[0].components.co+" μg/m3";
      document.getElementById("no").innerText ="NO : "+data.list[0].components.no+" μg/m3";
      document.getElementById("no2").innerText ="NO2 : "+data.list[0].components.no2+" μg/m3";
      document.getElementById("o3").innerText ="O3 : "+data.list[0].components.o3+" μg/m3";
      document.getElementById("so2").innerText ="SO2 : "+data.list[0].components.so2+" μg/m3";
      document.getElementById("pm2_5").innerText ="PM2.5 : "+data.list[0].components.pm2_5+" μg/m3";
      document.getElementById("pm10").innerText ="PM10 : "+data.list[0].components.pm10+" μg/m3";
      document.getElementById("nh3").innerText ="NH3 : "+data.list[0].components.nh3+" μg/m3";
      
      
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
      this.fetchWeatherforecast(document.querySelector(".search-bar").value);
      this.fetchaqi(lat,lon);
      document.querySelector(".search-bar").value="";
      document.querySelector(".msearch-bar").value="";
    },
    msearch: function () {
      this.fetchWeather(document.querySelector(".msearch-bar").value);
      this.fetchWeatherforecast(document.querySelector(".msearch-bar").value);
      this.fetchaqi(lat,lon);
      document.querySelector(".search-bar").value="";
      document.querySelector(".msearch-bar").value="";
    }
  };
  
  document.querySelector(".btn").addEventListener("click", function () {
    weather.search();
  });
  
 document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });


    document.querySelector(".mbtn").addEventListener("click", function () {
      weather.msearch();
    });
    
   document
      .querySelector(".msearch-bar")
      .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
          weather.msearch();
        }
      });
    
  
  weather.fetchWeather("Warangal");
  weather.fetchWeatherforecast("Warangal");
  


  window.onload = (event) => {
    console.log(document.querySelector(".btn").value);

  };