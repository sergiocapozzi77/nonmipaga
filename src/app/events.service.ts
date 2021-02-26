import { IFurbetto } from "./models/furbetto";
import { IMarker } from "./models/location";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  tokenReady = new BehaviorSubject(false);
  locations = new Subject<IMarker>();
  selectedFurbetto = new Subject<IFurbetto>();
  furbetti = new Subject<IFurbetto>();

  constructor() {}

  addFurbetto(furbetto: IFurbetto) {
    this.furbetti.next(furbetto);
  }

  setTokenReady() {
    this.tokenReady.next(true);
  }

  addLocation(location: IMarker) {
    this.locations.next(location);
  }

  selectFurbetto(furbetto: IFurbetto) {
    this.selectedFurbetto.next(furbetto);
  }
}
