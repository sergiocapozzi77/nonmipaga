import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ToolbarModule } from "primeng/toolbar";
import { AddPersonComponent } from "./add-person/add-person.component";
import { ButtonModule } from "primeng/button";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AutoCompleteModule } from "primeng/autocomplete";

@NgModule({
  declarations: [AppComponent, AddPersonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
