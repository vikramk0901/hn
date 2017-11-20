import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import * as _ from "lodash";
import { PostPage } from "./../post/post";

/**
 * Generated class for the BestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-best",
  templateUrl: "best.html"
})
export class BestPage {
  constructor(
    public navCtrl: NavController,
    public rest: RestProvider,
    public iab: InAppBrowser
  ) {}
  public stories = [];
  public storyType = "beststories";
  ionViewDidLoad() {
    this.fetchTopStories(null);
  }

  fetchTopStories(refersher) {
    this.rest.getPosts(this.storyType).subscribe(data => {
      this.stories = data;
      refersher && refersher.complete();
    });
  }

  //TODO : Check if there are items left to be loaded
  loadMore(infiniteScroll) {
    let items = this.rest.getItems(this.storyType);
    if (
      items.indexOf(_.last(this.stories).id) > -1 &&
      items.length > this.stories.length
    ) {
      let indexOf = items.indexOf(_.last(this.stories).id) + 1;
      let ids = items.slice(indexOf, indexOf + 20);
      this.rest.fetchItems(ids).subscribe(data => {
        this.stories = this.stories.concat(data);
        infiniteScroll && infiniteScroll.complete();
      });
    } else {
      infiniteScroll && infiniteScroll.complete();
    }
  }

  fetchComments(item) {
    this.navCtrl.push(PostPage, {
      item: item
    });
  }

  trackByFn(index, item) {
    return item.id; // or item.id
  }

  openPost(item) {
    if (item.url) {
      const browser = this.iab.create(item.url, "_blank");
      browser.show();
    }
  }
}
