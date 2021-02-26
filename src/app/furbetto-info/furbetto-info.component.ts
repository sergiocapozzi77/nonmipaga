import { IFurbetto } from "./../models/furbetto";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-furbetto-info",
  templateUrl: "./furbetto-info.component.html",
  styleUrls: ["./furbetto-info.component.scss"],
})
export class FurbettoInfoComponent implements OnInit {
  @Input() furbetto: IFurbetto;
  constructor() {}

  ngOnInit() {}
}
