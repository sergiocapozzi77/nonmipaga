import { IMarker } from "./../models/location";
import { EventsService } from "./../events.service";
import { LocationService } from "./../map/location.service";
import { FurbettiService } from "./../services/furbetti.service";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { comuniItaliani } from "../../data/comuni";
import { keys } from "../../keys";
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import Furbetto from "../models/furbetto";

@Component({
  selector: "app-add-person",
  templateUrl: "./add-person.component.html",
  styleUrls: ["./add-person.component.scss"],
  providers: [FilterService],
})
export class AddPersonComponent {
  options: any;

  profileForm: FormGroup = this.fb.group({
    nome: ["", Validators.required],
    nomeFurbetto: ["", Validators.required],
    mail: ["", [Validators.email]],
    strada: ["", Validators.required],
    comune: ["", Validators.required],
    // cap: ["", Validators.required],
    provincia: ["", Validators.required],
    lat: ["", Validators.required],
    lng: ["", Validators.required],
    info: [""],
  });

  comuni: string[] = comuniItaliani.map((x) => x.nome);
  name: string;
  /*addresses: any[] = [
    { formatted_address: "aa" },
    { formatted_address: "bb" },
    { formatted_address: "cc" },
  ];*/

  addresses: any[];
  selectedComune: string;

  @Output() onAdded = new EventEmitter<any>();

  private _selectedAddress: any;
  public get selectedAddress(): any {
    return this._selectedAddress;
  }
  public set selectedAddress(value: any) {
    this._selectedAddress = value;
    console.log("setting selected address to ", value);
    if (this._selectedAddress) {
      try {
        this.profileForm
          .get("lat")
          .setValue(this._selectedAddress.geometry.location.lat);
        this.profileForm
          .get("lng")
          .setValue(this._selectedAddress.geometry.location.lng);
      } catch (error) {
        console.log("setting selected address to error", error);
        this.profileForm.get("lat").setValue(null);
        this.profileForm.get("lng").setValue(null);
      }
    } else {
      this.profileForm.get("lat").setValue(null);
      this.profileForm.get("lng").setValue(null);
    }
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private furbettoService: FurbettiService,
    private locationService: LocationService,
    private eventsService: EventsService
  ) {
    console.log("comuniItaliani", this.comuni);
    this.profileForm.get("comune").valueChanges.subscribe((val) => {
      if (val) {
        let comune = comuniItaliani.filter((x) => x.nome === val);
        console.log("comune", comune);
        this.profileForm.get("provincia").setValue(comune[0].provincia.nome);
      }
    });

    this.profileForm.valueChanges.subscribe((val) => {
      if (val.comune && val.strada) {
        //   this.locate(val.strada, val.comune);
      }
    });
  }

  comuniResults: string[];

  searchComune(event) {
    console.log("searching", event);
    this.comuniResults = this.comuni.filter((x) =>
      x.toLowerCase().startsWith(event.query.toLowerCase())
    );
  }

  addressError: string;

  onSearch() {
    this.addressError = "";
    this.addresses = null;

    this.locationService
      .locate(
        this.profileForm.get("strada").value,
        this.profileForm.get("comune").value
      )
      .subscribe(
        (data) => {
          console.log("coordinates ", data);
          let results = data["results"];
          if (results.length == 0) {
            this.addressError = "l'indirizzo risulta errato";
          } else if (results.length == 1) {
            this.addresses = results;
            this.selectedAddress = results[0];
          } else {
            this.addresses = results;
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
  }

  onSelectAddress(event) {
    console.log("onSelectAddress", event);
  }

  onSubmit() {
    console.info(this.profileForm.value);

    this.furbettoService.addFurbetto(this.profileForm.value).subscribe(
      (data) => {
        console.log("Furbetto added", data);
        let loc: IMarker = {
          lat: this.profileForm.get("lat").value,
          lng: this.profileForm.get("lng").value,
          title: this.profileForm.get("nomeFurbetto").value,
          data: data,
        };
        this.onAdded.emit();
        this.eventsService.addLocation(loc);

        this.profileForm.reset();
        this.addresses = null;
        this.addressError = "";
        this.selectedAddress = null;
      },
      (error) => {
        console.log("Furbetto Error", error);
        this.onAdded.emit({});
      }
    );
  }

  onClose() {
    console.log("Panel closed");
    this.onAdded.emit(null);
  }
}
