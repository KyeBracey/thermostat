$(document).ready(function() {
  var thermostat = new Thermostat();

  function updateTemperature() {
    $('#temperature>p').text(thermostat.temperature());
  }

  function updatePowerSaving() {
    switch(thermostat.isPowerSaving()) {
      case true:
        return 'On';
      case false:
        return 'Off';
    }
  }

  function updateEnergyUsage() {
    $('#energy>p').text(thermostat.currentEnergyUsage());
    $('#energy>p').attr('class', thermostat.currentEnergyUsage());
  }

  updateTemperature();

  $('#temp-up').on('click', function(){
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
    $('#power_saving>p').text(updatePowerSaving());
  });
});
