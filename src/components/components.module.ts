import { IonicModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { HackerItemComponent } from "./hacker-item/hacker-item";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [HackerItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [HackerItemComponent]
})
export class ComponentsModule {}
