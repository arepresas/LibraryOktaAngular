/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { OktaAuthService, UserClaims } from "@okta/okta-angular";
import { Claim } from "./models/claim.model";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private sidenavStatus: boolean = true;
  private claims: Claim[] = [];

  constructor(public oktaAuth: OktaAuthService, private router: Router) {}
  async ngOnInit() {
    this.oktaAuth
      .isAuthenticated()
      .then((value) => this.isAuthenticated.next(value));
  }

  onOpenSidenav($event: boolean) {
    this.sidenavStatus = $event;
  }
}
