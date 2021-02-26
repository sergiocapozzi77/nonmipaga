import { FurbettiService } from "./../../services/furbetti.service";
import { EventsService } from "./../../events.service";
import { Component, OnInit } from "@angular/core";
import Furbetto from "src/app/models/furbetto";
import { filter } from "rxjs/operators";
import { IMarker } from "src/app/models/location";

@Component({
  selector: "app-mappa-furbetti",
  templateUrl: "./mappa-furbetti.component.html",
  styleUrls: ["./mappa-furbetti.component.scss"],
})
export class MappaFurbettiComponent implements OnInit {
  options: { center: { lat: number; lng: number }; zoom: number };

  constructor(
    private eventsService: EventsService,
    private furbettiService: FurbettiService
  ) {
    this.eventsService.locations.subscribe((loc) => {
      this.addMarker(loc);
      this.map.setCenter(new google.maps.LatLng(loc.lat, loc.lng));
      this.map.setZoom(17);
    });
  }

  map: google.maps.Map;
  overlays: any[] = [];

  handleOverlayClick(event) {
    console.log(event);
    this.furbettiService.getFurbetto(event.overlay.customData.id).subscribe(
      (furbetto) => {
        console.log("get furbetto", furbetto);
        this.eventsService.selectFurbetto(furbetto);
      },
      (error) => {
        console.log("Error get furbetto ", error);
      }
    );
  }

  private addMarker(loc: IMarker) {
    let marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      title: loc.title,
      icon: "assets/poo.png",
    });

    marker["customData"] = loc.data;
    this.overlays.push(marker);
  }

  setMap(event) {
    this.map = event.map;
  }

  ngOnInit() {
    this.options = {
      center: { lat: 41.9028, lng: 12.4964 },
      zoom: 5,
    };

    this.eventsService.tokenReady.pipe(filter((x) => x)).subscribe(() => {
      this.furbettiService.getFurbetti().subscribe(
        (furbetti) => {
          console.log("get furbetti", furbetti);
          this.fillFurbetti(furbetti);
        },
        (error) => {
          console.log("Error get furbetti ", error);
        }
      );
    });
  }

  fillFurbetti(furbetti: Furbetto[]) {
    furbetti.forEach((fur, id) => {
      console.log(fur);
      this.addMarker({
        lat: fur.lat,
        lng: fur.lng,
        title: fur.nomeFurbetto,
        data: { id: fur.id },
      });
    });
  }
}
