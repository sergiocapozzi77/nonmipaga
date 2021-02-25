import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  title = "Non mi paga!";

  showAddPerson = false;

  toggleShowAddPerson() {
    this.showAddPerson = !this.showAddPerson;

    console.log("No token");
    this.http.get("http://localhost:3000/api/token/sign").subscribe(
      (res) => {
        console.log(res);
        if (res["token"]) {
          localStorage.setItem("token", res["token"]);
          /*
          this.http
            .get("http://localhost:3000/api/furbetti/all")
            .pipe(
              catchError((er, c) => {
                console.log("get furbetti error", er);
                return EMPTY;
              })
            )
            .subscribe((data) => {
              console.log("get furbetti", data);
            });*/
        }
      },
      (err) => {
        console.log("token error", err);
      }
    );
  }
}
