import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {fetchSettingsData} from "../../../store/settings/settings.action";
import {selectSettingsData} from "../../../store/settings/settings.selector";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(fetchSettingsData());
    this.store.select(selectSettingsData).subscribe(data => {
      debugger
    })
  }
}
