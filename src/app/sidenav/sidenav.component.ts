import { Component, Input, OnInit } from "@angular/core";
import { OktaAuthService, UserClaims } from "@okta/okta-angular";
import { BehaviorSubject, Observable } from "rxjs";
import { Claim } from "../models/claim.model";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"],
})
export class SidenavComponent implements OnInit {
  @Input()
  isAuthenticated: BehaviorSubject<boolean>;
  @Input()
  ip: string;
  userName: string;
  userEmail: string;

  constructor(public oktaAuth: OktaAuthService) {}

  ngOnInit(): void {
    this.isAuthenticated.subscribe((_) => {
      if (_) {
        this.oktaAuth.getUser().then((userClaims) => {
          const claims: Claim[] = Object.entries(userClaims).map((entry) => ({
            claim: entry[0],
            value: entry[1],
          }));
          this.userName = claims.find(
            (userClaim) => userClaim.claim === "name"
          ).value;
          this.userEmail = claims.find(
            (userClaim) => userClaim.claim === "email"
          ).value;
        });
      }
    });
  }
}
