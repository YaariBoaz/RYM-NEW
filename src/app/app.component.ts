import {Component, OnInit} from '@angular/core';
import {NgxEchartsDirective} from "ngx-echarts";
import {Router} from "@angular/router";
import {LoadingService} from "./core/helpers/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private router: Router, public loadingService: LoadingService) {
    this.router.navigate(['']);
  }

  ngOnInit() {
  }
}
