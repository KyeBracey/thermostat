$(document).ready(function() {
  var thermostat = new Thermostat();

  function updateTemperature() {
    $('#temperature > p').text(thermostat.temperature());
    $('#temperature-progress').val(thermostat.temperature())
  }

  function updatePowerSaving() {
    switch(thermostat.isPowerSaving()) {
      case true:
        return 'On';
      case false:
        return 'Off';
    }
  }

  function updateWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var city = city;
    var units = '&units=metric';
    var key = '&APPID=f0af5db9072861dc9029318af735a333';
    $.get(url + city + units + key, function(data){
      $('#current-temperature').text(data.main.temp);
      $('#current-weather').text(data.weather[0].description);
      $('#current-weather-icon').html("<img width='150px' height='150px' src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
    });
  }

  function updateEnergyUsage() {
    $('#energy > p').text(thermostat.currentEnergyUsage());
    $('#energy > p').attr('class', thermostat.currentEnergyUsage());
  }

  updateTemperature();
  updateWeather('London');

  $('#temp-up').on('click', function() {
    thermostat.increaseTemperature();
    updateTemperature();
    updateEnergyUsage();
  });

  $('#temp-down').on('click', function() {
    thermostat.decreaseTemperature();
    updateTemperature();
    updateEnergyUsage();
  });

  $('#temp-reset').on('click', function() {
    thermostat.resetTemperature();
    updateTemperature();
    updateEnergyUsage();
  });

  $('#toggle-power-saving').on('click', function() {
    thermostat.togglePowerSaving();
    updateTemperature();
    $('#power_saving > p').text(updatePowerSaving());
  });

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#city').val();
    updateWeather(city);
  });

});
