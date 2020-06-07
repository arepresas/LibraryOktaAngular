export interface Weather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherDataCurrent;
  hourly: WeatherDataHourly[];
  daily: WeatherDataDaily[];
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface WeatherData {
  dt: number;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherElement[];
  clouds: number;
  uvi?: number;
  visibility?: number;
}

export interface WeatherDataHourly extends WeatherData {
  temp: number;
  rain?: Rain;
}

export interface WeatherDataCurrent extends WeatherData {
  temp: number;
  sunrise: number;
  sunset: number;
  rain?: number;
}

export interface WeatherDataDaily extends WeatherData {
  temp: Temp;
  sunrise: number;
  sunset: number;
  rain?: number;
}

export interface WeatherElement {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Rain {
  "1h": number;
}
