import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // void is to specify that, this event has no pay load, or any any data getting emitetd with it.
  // @Output specifies that, this event is listenable from outside

  @Output() sidenavToggle = new EventEmitter<void>();



  onToggleSidenav() {
   this.sidenavToggle.emit();
  }


}
