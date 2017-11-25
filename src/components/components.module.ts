import { IonicModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { HackerItemComponent } from "./hacker-item/hacker-item";
import { CommonModule } from "@angular/common";
import { HackerCommentComponent } from './hacker-comment/hacker-comment';
@NgModule({
  declarations: [HackerItemComponent,
    HackerCommentComponent],
  imports: [CommonModule, IonicModule],
  exports: [HackerItemComponent,
    HackerCommentComponent]
})
export class ComponentsModule {}
