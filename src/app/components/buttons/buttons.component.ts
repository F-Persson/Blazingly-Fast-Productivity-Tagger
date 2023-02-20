import { Component, Input } from '@angular/core';
import { TagItem, db } from 'src/app/db';
import { from } from 'rxjs';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  @Input() text!: string;
  @Input() isDropdown!: boolean;

  dropDown = false;
  alltags = this.allTags();



  async allTags() {
    const allItems = await db.TagItem.toArray();
    const allTags = allItems.map((item: TagItem) => item.tags).flat();
    return allTags;
  }
}
