import { Component, OnInit, Input } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-page-title',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PagetitleComponent implements OnInit {

  @Input() breadcrumbItems;
  @Input() title: string;
  userInfo:Observable<{ firstName:string,lastName:string }>;

  constructor(private store:Store) { }

  ngOnInit() {
    // this.store.dispatch(getPageTitleData());
    //this.userInfo = this.store.select(selectUserName);
  }

}
