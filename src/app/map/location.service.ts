import { keys } from "./../../keys";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  constructor(private http: HttpClient) {}

  locate(strada: string, comune: string) {
    console.log("locating " + strada + " " + comune);
    const par = encodeURIComponent(`${strada}, ${comune},Italy`);
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${par}&key=${keys.google}`
    );
  }
}
