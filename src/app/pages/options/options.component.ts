import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TagItem } from 'src/app/db';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  save: boolean = false;
  tagItems: TagItem[] = [];


  constructor() {
    liveQuery(() => db.TagItem.toArray()).subscribe((tagItems: TagItem[]) => {
      this.tagItems = tagItems;
    });
  }
}