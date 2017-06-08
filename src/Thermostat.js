'use strict';

var Thermostat = function() {
  this._DEFAULT_TEMPERATURE = 20;
  this._MINIMUM_TEMPERATURE = 10;
  this._temperature = this._DEFAULT_TEMPERATURE;
  this.powerSaving = true;
};

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.increaseTemperature = function() {
  if (this._temperature >= 32) throw new Error('Maximum temperature is 32 degrees')
  if (this.isPowerSaving() && this._temperature >= 25) {
    throw new Error('Maximum temperature in power saving mode is 25 degrees')
  };
  this._temperature ++;
};

Thermostat.prototype.decreaseTemperature = function() {
  if (this._temperature <= this._MINIMUM_TEMPERATURE) {
    throw new Error('Minimum temperature is 10 degrees')
  };
  this._temperature --;
};

Thermostat.prototype.isPowerSaving = function() {
  return this.powerSaving;
};

Thermostat.prototype.togglePowerSaving = function() {
  this.powerSaving = !this.powerSaving
  if (this.isPowerSaving() && this._temperature > 25) this._temperature = 25
}

Thermostat.prototype.resetTemperature = function() {
  this._temperature = this._DEFAULT_TEMPERATURE;
};

Thermostat.prototype.currentEnergyUsage = function() {
  if (this.temperature() < 18) {
    return "Low";
  } else if (this.temperature() < 25) {
    return "Medium";
  } else {
    return "High";
  }
};
