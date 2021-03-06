import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { PostPage } from "../pages/post/post";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { RestProvider } from "../providers/rest/rest";
import { PipesModule } from "../pipes/pipes.module";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { BestPage } from "../pages/best/best";
import { JobPage } from "./../pages/job/job";
import { ShowPage } from "./../pages/show/show";
import { AskPage } from "./../pages/ask/ask";
import { NewPage } from "./../pages/new/new";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PostPage,
    BestPage,
    NewPage,
    AskPage,
    ShowPage,
    JobPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PostPage,
    BestPage,
    NewPage,
    AskPage,
    ShowPage,
    JobPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    InAppBrowser
  ]
})
export class AppModule {}
