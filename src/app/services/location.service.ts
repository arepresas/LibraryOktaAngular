import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import envConfig from "../app.config";
import { Observable } from "rxjs";
import { Coord, Weather } from "../models/weather.model";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  openWeatherApiKey: string;
  currentIpUrl = "http://api.ipify.org/?format=json";
  openWeatherUrl = "http://api.openweathermap.org/data/2.5/onecall";

  constructor(private http: HttpClient) {
    this.openWeatherApiKey = envConfig.secrets.openWeatherApiKey;
  }

  getPosition(): Promise<Coord> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lon: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getIPAddress() {
    return this.http.get(this.currentIpUrl);
  }

  getWeather(coords: Coord): Observable<Weather> {
    let params = new HttpParams();
    params = params.append("lat", coords.lat.toString());
    params = params.append("lon", coords.lon.toString());
    params = params.append("units", "metric");
    params = params.append("lang", "en");
    params = params.append("appid", this.openWeatherApiKey);

    return this.http.get(this.openWeatherUrl, {
      params: params,
    }) as Observable<Weather>;
  }
}
