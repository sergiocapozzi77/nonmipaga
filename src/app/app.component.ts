import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Non mi paga!';

  showAddPerson = false;

  toggleShowAddPerson() {
    this.showAddPerson = !this.showAddPerson;
  }
}
