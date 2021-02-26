import { FurbettiService } from './../services/furbetti.service';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { comuniItaliani } from "../../data/comuni";
import { keys } from "../../keys";
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import Furbetto from "../models/Furbetto";

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
    provincia: [
      {
        value: null,
        disabled: true,
      },
    ],
  });

  comuni: string[] = comuniItaliani.map((x) => x.nome);
  name: string;
  selectedComune: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private furbettoService: FurbettiService) {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12,
    };

    console.log("comuniItaliani", this.comuni);
    this.profileForm.get("comune").valueChanges.subscribe((val) => {
      if (val) {
        let comune = comuniItaliani.filter((x) => x.nome === val);
        console.log("comune", comune);
        this.profileForm.controls["provincia"].setValue(
          comune[0].provincia.nome
        );
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.furbettoService.addFurbetto(this.profileForm.value).subscribe(
      (data) => {
        console.log("addFurbetto ", data);
      })
  }

  locate(strada: string, comune: string) {
    const par = encodeURIComponent(strada + ', ' + comune);
    this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${par}&key=${keys.google}`
      )
      .subscribe(
        (data) => {
          console.log("coordinates ", data);
        },

        (error) => {
          console.log("error", error);
        }
      );
  }
}
