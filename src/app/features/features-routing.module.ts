import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings/settings.component";
import {MessagesComponent} from "./messages/messages/messages.component";

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "messages",
    component: MessagesComponent
  },
  {
    path: "home",
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
