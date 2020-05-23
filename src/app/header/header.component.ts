import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OktaAuthService } from "@okta/okta-angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Input()
  isAuthenticated: BehaviorSubject<boolean>;
  @Input()
  sidenavStatus: boolean;
  @Output()
  sidenavStatusChange = new EventEmitter<boolean>();

  title = "My Application";

  constructor(public oktaAuth: OktaAuthService) {}

  ngOnInit(): void {}

  logout() {
    this.oktaAuth.logout("/");
  }

  private toggleSidebar() {
    this.sidenavStatus = !this.sidenavStatus;
    this.sidenavStatusChange.emit(this.sidenavStatus);
  }
}
