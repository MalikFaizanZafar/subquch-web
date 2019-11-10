import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { AuthConfig } from "./modules/auth/auth.config";
import { environment } from "../environments/environment";
import { UserAuthService } from "./modules/auth/services/auth.service";
import { NgbDropdown, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "./shared/services/data.service";
import { AdsDialogBoxComponent } from "./modules/admin/components/ads-dialog-box/ads-dialog-box.component";
import { PopupAdDialogComponent } from './modules/admin/components/popup-ad-dialog/popup-ad-dialog.component';
import { SliderAdDialogComponent } from './modules/admin/components/slider-ad-dialog/slider-ad-dialog.component';
import { BannerAdDialogComponent } from './modules/admin/components/banner-ad-dialog/banner-ad-dialog.component';
import { MobileAdDialogComponent } from './modules/admin/components/mobile-ad-dialog/mobile-ad-dialog.component';
import { AddBuisnessDialogComponent } from "./modules/admin/components/add-buisness-dialog/add-buisness-dialog.component";
import { DeleteBuisnessDialogComponent } from "./modules/admin/components/delete-buisness-dialog/delete-buisness-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    AdsDialogBoxComponent,
    PopupAdDialogComponent,
    SliderAdDialogComponent,
    BannerAdDialogComponent,
    MobileAdDialogComponent,
    AddBuisnessDialogComponent,
    DeleteBuisnessDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB-EsaismaaJDTBDg0F2l-28Z-7zsVCTWU ",
      libraries: ["places"]
    }),
    SocialLoginModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBVuIpEpE4Ke9xam26eRzVZItTslj6iTMY",
      authDomain: "subquch-d4369.firebaseapp.com",
      databaseURL: "https://subquch-d4369.firebaseio.com",
      projectId: "subquch-d4369",
      storageBucket: "gs://subquch-d4369.appspot.com",
      messagingSenderId: "54989238851"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgbDropdownModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: AuthConfig
    },
    GoogleMapsAPIWrapper,
    UserAuthService,
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddBuisnessDialogComponent, DeleteBuisnessDialogComponent, AdsDialogBoxComponent, PopupAdDialogComponent, SliderAdDialogComponent, BannerAdDialogComponent, MobileAdDialogComponent
  ]
})
export class AppModule {}
