import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {AuthGuard} from "../../core/guards/auth.guard";
import {SettingsComponent} from "../settings/settings/settings.component";


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,

    },
  { path: 'settings', component: SettingsComponent, loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
