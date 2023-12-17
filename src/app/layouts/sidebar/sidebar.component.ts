import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, TemplateRef} from '@angular/core';
import MetisMenu from 'metismenujs';
import {EventService} from '../../core/services/event.service';
import {Router, NavigationEnd} from '@angular/router';

import {HttpClient} from '@angular/common/http';

import {MENU, MENU_MOBILE} from './menu';
import {MenuItem} from './menu.model';
import {TranslateService} from '@ngx-translate/core';
import {Store} from "@ngrx/store";
import {selectContactUsData} from "../../store/contact-us/contact-us.selector";
import {fetchContactUsData} from "../../store/contact-us/contact-us.action";
import {Observable} from "rxjs";
import {ContactUsDetails, MessageSubjects} from "../../store/contact-us/contact-us.reducer";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

/**
 * Sidebar component
 */
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef;
  @Input() isCondensed = false;
  menu: any;
  data: any;

  menuItems: MenuItem[] = [];
  menuItemsMobile: MenuItem[] = [];

  @ViewChild('sideMenu') sideMenu: ElementRef;
  currentSelectedTabIndex = 0;
  contactUsInfo$: Observable<{ contactDetails: ContactUsDetails; messageSubject: MessageSubjects[] }>;
  modalRef: BsModalRef<unknown>;
  selectedSubject: MessageSubjects = {MessageSubjectsText: 'Select One'};
  contactUsForm = this.fb.group({
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
  })
  isSubmitted = false;

  constructor(private eventService: EventService,
              private router: Router,
              public fb: FormBuilder,
              public translate: TranslateService,
              private http: HttpClient,
              private modalService: BsModalService,
              private store: Store) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._scrollElement();
      }
    });
  }

  ngOnInit() {
    this.initialize();
    this._scrollElement();
    this.store.dispatch(fetchContactUsData());
    this.contactUsInfo$ = this.store.select(selectContactUsData);
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
  }

  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500)
          if (this.scrollRef.SimpleBar !== null)
            this.scrollRef.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
      }
    }, 300);
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }


  /**
   * Initialize
   */
  initialize(): void {
    this.menuItems = MENU;
    this.menuItemsMobile = MENU_MOBILE;
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  navigateToFeature(item: MenuItem) {
    this.router.navigate([item.route]);
  }

  OpenContactUsDialog(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  changeSubject(subjectName: Event) {
    this.subject.setValue((subjectName.target as any).value, {
      onlySelf: true
    })
  }

  get subject() {
    return this.contactUsForm.get('subject');
  }

  get message() {
    return this.contactUsForm.get('message');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.contactUsForm.valid) {
      return false;
    }
  }
}
