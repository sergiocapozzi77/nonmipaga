import { IFurbetto } from "./../../models/furbetto";
import { EventsService } from "./../../events.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main-view",
  templateUrl: "./main-view.component.html",
  styleUrls: ["./main-view.component.scss"],
})
export class MainViewComponent implements OnInit {
  showSidebar = false;
  showFurbettoSidebar = false;
  constructor(private eventService: EventsService) {}
  selectedFurbetto: IFurbetto;
  showInfo = false;
  ngOnInit() {
    this.eventService.selectedFurbetto.subscribe((furbetto) => {
      this.selectedFurbetto = furbetto;
      this.showFurbettoSidebar = true;
    });
  }

  toggleShowSidebar() {
    this.showSidebar = true;
  }

  furbettoAdded(event) {
    console.log("Furbetto added", event);
    this.showSidebar = false;
  }
}
