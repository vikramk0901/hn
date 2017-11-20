import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Generated class for the HackerItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "hacker-item",
  templateUrl: "hacker-item.html"
})
export class HackerItemComponent {
  text: string;
  @Input("item") hackerItem: any;
  @Input() pos: string;
  @Output() onPostClick = new EventEmitter<any>();
  @Output() onFetchComments = new EventEmitter<any>();

  constructor() {
    this.text = "Hello World";
  }

  openPost(item) {
    this.onPostClick.emit(item);
  }

  fetchComments(item) {
    this.onFetchComments.emit(item);
  }
}
