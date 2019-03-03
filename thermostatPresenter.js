class ThermostatPresenter {
  constructor(view, model) {
    this._view = view;
    this._model = model;
    
    this._increaseTemperature = this._increaseTemperature.bind(this);
    this._decreaseTemperature = this._decreaseTemperature.bind(this);
    this._updateView = this._updateView.bind(this);

    this._model.callbackWhenModeChange = this._updateView;
    this._presentInitialView();
  }

  _increaseTemperature() {
    this._model.increaseTargetTemperature();
  }

  _decreaseTemperature() {
    this._model.decreaseTargetTemperature();
  }

  _presentInitialView() {
    let initialTargetTemperature = this._model.targetTemperature;
    this._view.draw(initialTargetTemperature, COLOR.GREY);
    this._view.addClickEventListener(this._decreaseTemperature, this._increaseTemperature);
  }

  _updateView () {
    let temperature = this._model.targetTemperature;
    let mode = this._model.mode;

    if (mode === MODE_STATUS.COOLING) {
      this._view.draw(temperature, COLOR.BLUE);
    }
    else if (mode === MODE_STATUS.HEATING) {
      this._view.draw(temperature, COLOR.RED);
    }
    else {
      this._view.draw(temperature, COLOR.GREY);
    }
  	
  }
}