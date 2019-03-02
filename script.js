let canvas = document.getElementById("thermostat-canvas");

let defaultTemperature = 72;

thermostatModel = new ThermostatModel(defaultTemperature);
thermostatView = new ThermostatView(canvas);

thermostatPresenter = new ThermostatPresenter(thermostatView, thermostatModel);

// Simulate external factor affecting current temperature (measured temperature)
thermostatModel.currentTemperature = 72;
