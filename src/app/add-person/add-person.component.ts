import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { comuniItaliani } from "../../data/comuni";
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";

@Component({
  selector: "app-add-person",
  templateUrl: "./add-person.component.html",
  styleUrls: ["./add-person.component.scss"],
  providers: [FilterService],
})
export class AddPersonComponent {
  profileForm = this.fb.group({
    nome: ["", Validators.required],
    nomeFurbetto: ["", Validators.required],
    mail: ["", [Validators.email]],
    strada: ["", Validators.required],
    comune: ["", Validators.required],
    cap: ["", Validators.required],
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
  get aliases() {
    return this.profileForm.get("aliases") as FormArray;
  }

  constructor(private fb: FormBuilder) {
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
  }

  comuniResults: string[];

  searchComune(event) {
    console.log("searching", event);
    this.comuniResults = this.comuni.filter((x) =>
      x.toLowerCase().startsWith(event.query.toLowerCase())
    );
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: "Nancy",
      address: {
        street: "123 Drew Street",
      },
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(""));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
