import { RestProvider } from "./../../providers/rest/rest";
import { Component, Input, OnInit } from "@angular/core";

/**
 * Generated class for the HackerCommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "hacker-comment",
  templateUrl: "hacker-comment.html"
})
export class HackerCommentComponent implements OnInit {
  text: string;
  @Input() kids: string[];
  comments: any[];
  constructor(public rest: RestProvider) {}

  ngOnInit() {
    this.kids && this.kids.length > 0 && this.fetchComments(this.kids);
  }

  fetchComments(items) {
    this.rest.fetchItems(items).subscribe(data => {
      this.comments = data;
    });
  }
}
