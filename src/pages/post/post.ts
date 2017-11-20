import { InAppBrowser } from "@ionic-native/in-app-browser";
import { RestProvider } from "./../../providers/rest/rest";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-post",
  templateUrl: "post.html"
})
export class PostPage {
  item = {
    kids: []
  };
  comments = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public iab: InAppBrowser
  ) {
    this.item = this.navParams.get("item");
  }

  ionViewDidLoad() {
    if (this.item.kids && this.item.kids.length > 0) {
      this.rest.fetchItems(this.item.kids).subscribe(data => {
        this.comments = data.filter(comment => {
          return comment.text;
        });
      });
    }
  }

  openPost(item) {
    if (item.url) {
      const browser = this.iab.create(item.url, "_blank");
      browser.show();
    }
  }

  getNestedComments(comments) {}
}
