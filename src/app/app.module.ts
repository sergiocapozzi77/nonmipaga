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
import { GMapModule } from "primeng/gmap";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { MainViewComponent } from "./main-view/main-view/main-view.component";
import { RouterModule, Routes } from "@angular/router";
import { SidebarModule } from "primeng/sidebar";
import { MappaFurbettiComponent } from "./map/mappa-furbetti/mappa-furbetti.component";
import { ListboxModule } from "primeng/listbox";
import { GoogleMapsModule } from "@angular/google-maps";
import { FurbettoInfoComponent } from "./furbetto-info/furbetto-info.component";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { ChipModule } from "primeng/chip";
const routes: Routes = [{ path: "", component: MainViewComponent }];

@NgModule({
  declarations: [
    AppComponent,
    AddPersonComponent,
    MainViewComponent,
    MappaFurbettiComponent,
    FurbettoInfoComponent,
  ],
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
    GMapModule,
    HttpClientModule,
    SidebarModule,
    ListboxModule,
    GoogleMapsModule,
    InputTextareaModule,
    ScrollPanelModule,
    ToastModule,
    DialogModule,
    ChipModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
