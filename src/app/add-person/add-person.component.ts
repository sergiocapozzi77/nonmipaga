import { IMarker } from "./../models/location";
import { EventsService } from "./../events.service";
import { LocationService } from "./../map/location.service";
import { FurbettiService } from "./../services/furbetti.service";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { comuniItaliani } from "../../data/comuni";
import { keys } from "../../keys";
import { FilterService, MessageService } from "primeng/api";
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
    mail: ["", [Validators.email, Validators.required]],
    strada: ["", Validators.required],
    comune: ["", Validators.required],
    // cap: ["", Validators.required],
    provincia: ["", Validators.required],
    lat: ["", Validators.required],
    lng: ["", Validators.required],
    info: [""],
  });

  addressValid: boolean;
  comuni: string[] = comuniItaliani.map((x) => x.nome);
  name: string;
  /*addresses: any[] = [
    { formatted_address: "aa" },
    { formatted_address: "bb" },
    { formatted_address: "cc" },
  ];*/

  loading: boolean = false;
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

        let strada = this.getAddress_componentsElement(
          this._selectedAddress.address_components,
          "route"
        );

        if (!strada) {
          strada = this.getAddress_componentsElement(
            this._selectedAddress.address_components,
            "street_address"
          );
        }

        if (strada) {
          let streetNumber = this.getAddress_componentsElement(
            this._selectedAddress.address_components,
            "street_number"
          );
          if (streetNumber) {
            strada = `${strada}, ${streetNumber}`;
          }
          this.profileForm.get("strada").setValue(strada);
        }
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

  getAddress_componentsElement(addressComponents: any[], key: string) {
    let item = addressComponents.find((x) => x.types.includes(key));
    if (item) {
      return item.long_name;
    }

    return null;
  }

  constructor(
    private fb: FormBuilder,
    private furbettoService: FurbettiService,
    private locationService: LocationService,
    private eventsService: EventsService,
    private messageService: MessageService
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
        this.addressValid = true;
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

  onSearch(event) {
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
            this.messageService.add({
              severity: "error",
              summary: "Indirizzo non trovato",
              detail: "Riprova inserendo l'indirizzo corretto",
            });
          } else if (results.length == 1) {
            this.addresses = results;
            this.selectedAddress = results[0];
          } else {
            this.addresses = results;
          }
        },
        (error) => {
          console.log("error", error);
          this.messageService.add({
            severity: "error",
            summary: "Errore di comunicazione con google map",
            detail:
              "Si e' verificato un errore in google map. Riprova piu' tardi",
          });
        }
      );
  }

  onSelectAddress(event) {
    console.log("onSelectAddress", event);
  }

  onSubmit() {
    console.info(this.profileForm.value);
    this.loading = true;
    this.furbettoService.addFurbetto(this.profileForm.value).subscribe(
      (data) => {
        this.loading = false;
        console.log("Furbetto added", data);
        let loc: IMarker = {
          lat: this.profileForm.get("lat").value,
          lng: this.profileForm.get("lng").value,
          title: this.profileForm.get("nomeFurbetto").value,
          data: data,
        };
        this.onAdded.emit();
        this.eventsService.addLocation(loc);
        //this.eventsService.addFurbetto(this.profileForm.value);
        this.messageService.add({
          severity: "success",
          summary: "Furbetto aggiunto",
          detail:
            "Grazie per la tua segnalazione. Ti auguro di cacciare il tuo parassita al piu' presto",
        });

        this.profileForm.reset();
        this.addresses = null;
        this.addressError = "";
        this.selectedAddress = null;
      },
      (error) => {
        this.loading = false;
        console.log("Furbetto Error", error);
        this.messageService.add({
          severity: "error",
          summary: "Si e' verificato un errore",
          detail: error,
        });

        this.onAdded.emit({});
      }
    );
  }

  onClose(event) {
    console.log("Panel closed");
    this.onAdded.emit(null);
  }
}
