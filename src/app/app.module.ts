import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
// bootstrap component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ToastrModule } from 'ngx-toastr';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
// Page Route
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFirebaseBackend } from './authUtils';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Auth
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { rootReducer } from './store';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import {PageTitleEffect} from "./shared/ui/pagetitle/page-title.effect";
import {MetersListEffects} from "./store/meters/meter.effect";
import {CardsEffects} from "./store/cards/cards.effect";
import {AlertsEffects} from "./store/alerts/alerts.effect";
import {NgxEchartsModule} from "ngx-echarts";
import {NgToggleModule} from "ngx-toggle-button";
import {ConsumptionEffects} from "./store/consumption/consumption.effect";
import {LastBillingCycleChartStateEffects} from "./store/last-billing-cycle-chart/lastBillingCycleChart.effect";
import {
  CompareToPreviousYearChartEffect
} from "./store/comapre-to-previous-year-chart/comapre-to-previous-year-chart.effect";
import {DateHelperService} from "./features/dashboard/shared/utils/date-helper";
import {AuthenticationEffects} from "./store/Authentication/authentication.effects";
import {SettingsEffect} from "./store/settings/settings.effect";
import {SettingsModule} from "./features/settings/settings.module";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";



export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ScrollToModule.forRoot(),
    SlickCarouselModule,
    NgToggleModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      PageTitleEffect,
      MetersListEffects,
      CardsEffects,
      AlertsEffects,
      ConsumptionEffects,
      CompareToPreviousYearChartEffect,
      LastBillingCycleChartStateEffects,
      AuthenticationEffects,
      SettingsEffect
    ]),
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    SettingsModule,
    NgxIntlTelInputModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DateHelperService
  ],
})
export class AppModule { }
