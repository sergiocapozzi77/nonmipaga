import { IFurbetto } from "./models/furbetto";
import { IMarker } from "./models/location";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  tokenReady = new BehaviorSubject(false);
  furbetti = new Subject<IMarker>();
  selectedFurbetto = new Subject<IFurbetto>();

  constructor() {}

  setTokenReady() {
    this.tokenReady.next(true);
  }

  addLocation(location: IMarker) {
    this.furbetti.next(location);
  }

  selectFurbetto(furbetto: IFurbetto) {
    this.selectedFurbetto.next(furbetto);
  }
}
