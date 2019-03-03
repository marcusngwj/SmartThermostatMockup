const MODE_STATUS = {
  COOLING: "cooling",
  HEATING: "heating",
  OFF: "off"
};


class ThermostatModel {
  constructor(temperature) {
    this._deltaComfort = 3;
    this._deltaBuffer = 2;
    this._currTemp = temperature; // Measured temperature
    this._targetTemp = temperature; // Set Point
    this._mode = MODE_STATUS.OFF;
    this._callbackForModeChange = null;

    this.increaseTargetTemperature = this.increaseTargetTemperature.bind(this);
    this.decreaseTargetTemperature = this.decreaseTargetTemperature.bind(this);
    this._updateMode = this._updateMode.bind(this);
  }

  get currentTemperature() {
    return this._currTemp;
  }

  get targetTemperature() {
    return this._targetTemp;
  }

  get mode() {
    return this._mode;
  }

  /**
   * Set function to call back whenever the mode changes
   */
  set callbackWhenModeChange(callback) {
    this._callbackWhenModeChange = callback;
  }

  set currentTemperature(temperature) {
    this._currTemp = temperature;
    this._updateMode();
  }

  increaseTargetTemperature() {
    ++this._targetTemp;
    this._updateMode();
  }

  decreaseTargetTemperature() {
    --this._targetTemp;
    this._updateMode();
  }

  _updateMode() {
    if (this._currTemp > this._targetTemp + this._deltaComfort + this._deltaBuffer) {
      this._mode = MODE_STATUS.COOLING;
    }
    else if (this._currTemp < this._targetTemp - this._deltaComfort - this._deltaBuffer) {
      this._mode = MODE_STATUS.HEATING;
    }
    else if (this._targetTemp - (this._deltaComfort - this._deltaBuffer) < this._currTemp 
          && this._currTemp < this._targetTemp + (this._deltaComfort - this._deltaBuffer)) {
      this._mode = MODE_STATUS.OFF;
    }

    this._callbackWhenModeChange();
  }

}
