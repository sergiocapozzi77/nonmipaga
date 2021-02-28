import { environment } from "src/environments/environment";
import { EventsService } from "./events.service";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { keys } from "src/keys";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MessageService],
})
export class AppComponent {
  constructor(
    private http: HttpClient,
    private eventsService: EventsService,
    private messageService: MessageService
  ) {
    this.requestToken();
  }

  title = "Non mi paga!";

  requestToken() {
    console.log("No token");
    this.http.get(environment.baseUrl + "token/sign").subscribe(
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
