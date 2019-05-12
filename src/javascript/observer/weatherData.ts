interface Observer {
  update(temperature: number, humidity: number, pressure: number): void;
}

interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObservers(): void;
}

///////////////////////////////////////////////////////////////////////////////

interface Displayment {
  display(): void;
}

class WeatherData implements Subject {
  private observers: Array<Observer>;
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {
    this.observers = [];
  }
  registerObserver(o: Observer): void {
    this.observers.push(o);
  }

  removeObserver(o: Observer): void {
    let i = this.observers.indexOf(o);
    if (i >= 0) {
      this.observers.splice(i, 1);
    }
  }

  notifyObservers(): void {
    let observers = this.observers;
    for (let i = 0; i < observers.length; i++) {
      observers[i].update(this.temperature, this.humidity, this.pressure);
    }
  }

  measurementChanged(): void {
    this.notifyObservers();
  }

  setMeasurement(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementChanged();
  }
}

///////////////////////////////////////////////////////////////////////////////

class CurrentConditionsDisplay implements Observer, Displayment {
  private temperature: number;
  private humidity: number;
  private weatherData: Subject;

  constructor(weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }

  display(): void {
    console.log(
      `Current conditions: ${this.temperature.toFixed(1)}F degrees and humidity ${this.humidity}%`
    );
  }
}

///////////////////////////////////////////////////////////////////////////////

let weatherdata = new WeatherData();
let currentDisplay = new CurrentConditionsDisplay(weatherdata);

weatherdata.setMeasurement(80, 65, 30.4);
weatherdata.setMeasurement(82, 70, 29.2);
weatherdata.setMeasurement(78, 90, 29.4);

// Current conditions: 80.0F degrees and humidity 65%
// Current conditions: 82.0F degrees and humidity 70%
// Current conditions: 78.0F degrees and humidity 90%
