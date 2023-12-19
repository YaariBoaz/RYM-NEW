import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

/**
 * Footer component
 */
export class FooterComponent implements OnInit {

  // set the current year
  year: number = new Date().getFullYear();
  modalRef?: BsModalRef;
  termsOfUse: string[];
  accessibilityStatementTemplateArray = [];

  constructor(private modalService: BsModalService, private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.get('howAccessibilityWorkList').subscribe(data =>{
      this.accessibilityStatementTemplateArray = data;
    })
  }

  openTermsOfUse(template) {
    this.modalRef = this.modalService.show(template, {class: 'terms-of-use-modal'})

  }

  openPrivacyPolicy(template) {
    this.modalRef = this.modalService.show(template, {class: 'terms-of-use-modal'})
  }

  openTechnicalSupport(template) {
    this.modalRef = this.modalService.show(template, {class: ''})
  }

  openAccessibilityStatement(template) {
    this.modalRef = this.modalService.show(template, {class: 'terms-of-use-modal'})
  }

  openFAQ() {

  }
}
