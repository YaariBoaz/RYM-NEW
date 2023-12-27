import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {br} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

/**
 * Footer component
 */
export class FooterComponent implements OnInit {
  @ViewChild('termsOfUseTemplate', {read: TemplateRef}) termsOfUseTemplate: TemplateRef<any>;
  @ViewChild('privacyTemplate', {read: TemplateRef}) privacyTemplate: TemplateRef<any>;
  @ViewChild('technicalSupportTemplate', {read: TemplateRef}) technicalSupportTemplate: TemplateRef<any>;
  @ViewChild('accessibilityStatementTemplate', {read: TemplateRef}) accessibilityStatementTemplate: TemplateRef<any>;

  // set the current year
  year: number = new Date().getFullYear();
  footerSelect: any;
  modalRef?: BsModalRef;
  termsOfUse: string[];
  accessibilityStatementTemplateArray = [];

  public get mobileFooterOptions(): typeof MobileFooterOptions {
    return MobileFooterOptions;
  }

  constructor(private modalService: BsModalService, private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.get('howAccessibilityWorkList').subscribe(data => {
      this.accessibilityStatementTemplateArray = data;
    })
  }

  openTermsOfUse(template) {
    this.modalRef = this.modalService.show(template, {class: 'terms-of-use-modal'})

  }
  openPrivacyPolicy(template) {
    this.modalRef = this.modalService.show(template, {class: 'terms-of-use-modal'})
  }

  onFooterChangedMobile($event: Event) {
    console.log(this.footerSelect);
    console.log($event);
  }

  openTechnicalSupport(template) {
    this.modalRef = this.modalService.show(template, {class: ''})
  }

  openAccessibilityStatement(template) {
    this.modalRef = this.modalService.show(template, {class: 'terms-of-use-modal'})
  }

  openFAQ() {

  }

  onChange(value: number) {
    switch (+value) {
      case MobileFooterOptions.Terms_Of_Use:
        this.openTermsOfUse(this.termsOfUseTemplate);
        break
      case MobileFooterOptions.Accessibility_Statement:
        this.openAccessibilityStatement(this.accessibilityStatementTemplate);
        break;
      case MobileFooterOptions.Privacy_Policy:
        this.openPrivacyPolicy(this.privacyTemplate);
        break;
      case MobileFooterOptions.Technical_Support:
        this.openTechnicalSupport(this.technicalSupportTemplate);
        break;
      case MobileFooterOptions.FAQ:
        this.openFAQ();
        break
    }
  }
}

export enum MobileFooterOptions {
  Terms_Of_Use,
  Privacy_Policy,
  Technical_Support,
  Accessibility_Statement,
  FAQ
}
