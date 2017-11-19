import { PostPage } from "./../post/post";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import * as _ from "lodash";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public rest: RestProvider,
    public iab: InAppBrowser
  ) {}
  public stories = [];
  ionViewDidLoad() {
    this.fetchTopStories(null);
  }

  fetchTopStories(refersher) {
    this.rest.getPosts().subscribe(data => {
      this.stories = data;
      refersher && refersher.complete();
    });
  }

  loadMore(infiniteScroll) {
    this.rest.loadMore(_.last(this.stories).id).subscribe(data => {
      this.stories = this.stories.concat(data);
      infiniteScroll.complete();
    });
  }

  fetchComments(item) {
    this.navCtrl.push(PostPage, {
      item: item
    });
  }

  openPost(item) {
    const browser = this.iab.create(item.url, "_blank");
    browser.show();
  }
}
