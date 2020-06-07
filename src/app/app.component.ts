import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { OktaAuthService, UserClaims } from "@okta/okta-angular";
import { Claim } from "./models/claim.model";
import { BehaviorSubject } from "rxjs";
import { LocationService } from "./services/location.service";
import { Coord, Weather } from "./models/weather.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  ip: string;
  weatherIcon: string;
  private sidenavStatus: boolean = true;
  private claims: Claim[] = [];

  constructor(
    public oktaAuth: OktaAuthService,
    private router: Router,
    private locationService: LocationService
  ) {}
  async ngOnInit() {
    this.oktaAuth
      .isAuthenticated()
      .then((value) => this.isAuthenticated.next(value));

    const geoLoc: Coord = await this.locationService.getPosition();

    this.ip = ((await this.locationService
      .getIPAddress()
      .toPromise()) as any).ip;

    const localWeather: Weather = await this.locationService
      .getWeather(geoLoc)
      .toPromise();

    console.log(localWeather);

    this.weatherIcon =
      "http://openweathermap.org/img/wn/" +
      localWeather.current.weather[0].icon +
      "@2x.png";
  }
}
