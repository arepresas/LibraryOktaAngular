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

import { Component, OnDestroy, OnInit } from "@angular/core";
import * as OktaSignIn from "@okta/okta-signin-widget";
import envConfig from "../app.config";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  signIn: any;
  constructor() {
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an ODIC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: envConfig.oidc.issuer.split("/oauth2")[0],
      clientId: envConfig.oidc.clientId,
      redirectUri: envConfig.oidc.redirectUri,
      logo: "/assets/angular.svg",
      i18n: {
        en: {
          "primaryauth.title": "Sign in to Angular & Company",
        },
      },
      authParams: {
        pkce: true,
        responseMode: "query",
        issuer: envConfig.oidc.issuer,
        display: "page",
        scopes: envConfig.oidc.scopes,
      },
    });
  }

  ngOnInit() {
    this.signIn.renderEl(
      { el: "#sign-in-widget" },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err;
      }
    );
  }

  ngOnDestroy(): void {
    this.signIn.remove();
  }
}
