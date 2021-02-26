import { EventsService } from "./events.service";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private http: HttpClient, private eventsService: EventsService) {
    this.requestToken();
  }

  title = "Non mi paga!";

  requestToken() {
    console.log("No token");
    this.http.get("http://localhost:3000/api/token/sign").subscribe(
      (res) => {
        console.log(res);
        if (res["token"]) {
          localStorage.setItem("token", res["token"]);
          this.eventsService.setTokenReady();
        }
      },
      (err) => {
        console.log("token error", err);
      }
    );
  }
}
