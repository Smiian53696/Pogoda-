export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin'; // Dostępne jednostki temperatury w aplikacji

export interface WeatherCondition { // Opis warunków pogodowych (z API)
  main: string; // Główna kategoria
  description: string; // Opis tekstowy
  icon: string;
}

export interface WeatherData { // Struktura danych aktualnej pogody
  id: number; //ID miasta z API
  name: string;
  dt: number;
  main: {
    temp: number; // Temperatura
    feels_like: number;  //Odczuwalna
    humidity: number; // Wilgotność
    pressure: number; // Ciśnienie
  };
  weather: WeatherCondition[];
  wind: { // Dane wiatru
    speed: number;
  };
  clouds: {
    all: number;
  };
}

export interface ForecastItem { // Jeden wpis prognozy
  dt: number;
  main: {
    temp: number;
  };
  weather: WeatherCondition[];
  dt_txt: string;
}

export interface ForecastData { // Cała odpowiedź prognozy
  list: ForecastItem[];
  city: {
    name: string;
  };
}