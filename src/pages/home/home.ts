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
  public storyType = "topstories";
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

  // TODO : move this to utilities function
  openPost(item) {
    if (item.url) {
      const browser = this.iab.create(item.url, "_blank");
      browser.show();
    }
  }
}
