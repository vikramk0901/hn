import { JobPage } from "./../job/job";
import { ShowPage } from "./../show/show";
import { AskPage } from "./../ask/ask";
import { NewPage } from "./../new/new";
import { BestPage } from "./../best/best";
import { Component } from "@angular/core";
import { HomePage } from "../home/home";
@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = NewPage;
  tab3Root = BestPage;
  tab4Root = AskPage;
  tab5Root = ShowPage;
  tab6Root = JobPage;

  constructor() {}
}
