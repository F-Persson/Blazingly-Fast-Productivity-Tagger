import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbService, TagItem } from 'src/app/services/db.service';


export interface Tag {
  tag: string;
  count: number;
  showTag: boolean;
}


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})

export class ButtonsComponent implements Tag {
  constructor(private db: DbService) { }
  @Input() text!: string;
  @Input() isDropdown!: boolean;
  @Output() showTagItem = new EventEmitter<TagItem>();

  dropDown: boolean = false;

  allOrNone: boolean = false;
  tag: string = '';
  count: number = 0;
  showTag: boolean = true;
  showItems: string[] = [];





  async hideItem(itemOfTag: Tag) {
    console.log("in hideitem");
    if (itemOfTag.tag === 'All') {
      return;
    }
    else {
      itemOfTag.showTag = false;
      this.showItems = this.showItems.filter((tag: string) => tag !== itemOfTag.tag); // remove tag from showItems
      this.showTheseItems(this.showItems);
    }
  }


  async showItem(itemOfTag: Tag) {
    console.log("in showitem");

    const allItems = await this.db.TagItem.toArray();

    if (itemOfTag.tag === 'All') {
      (await this.alltags).forEach((tag: Tag) => {
        tag.showTag = false;
      });
      allItems.forEach((tagItem: TagItem) => {
        tagItem.isShowing = true;
      });
      this.db.TagItem.bulkPut(allItems);
      return;
    }
    else {
      itemOfTag.showTag = true; // Show css in dropdown
      this.showItems.push(itemOfTag.tag); // add tag to showItems
      this.showTheseItems(this.showItems);
    }
  }

  showTheseItems(showItems: string[]) {
    const allItems = this.db.TagItem.toArray();
    allItems.then(async (items: TagItem[]) => {
      if (this.showItems.length === 0) {  // if no tags are selected, show all
        (await allItems).forEach((tagItem: TagItem) => {
          tagItem.isShowing = true;
        });
        this.db.TagItem.bulkPut(await allItems);
        return;
      }
      items.forEach((tagItem: TagItem) => { // if tags are selected, show only those
        if (showItems.some((matchtag: string) => tagItem.tags?.some((itemtag: string) => itemtag === matchtag))) {
          tagItem.isShowing = true;
        }
        else { // if no tags are selected, hide all
          tagItem.isShowing = false;
        }
      });
      this.db.TagItem.bulkPut(items);
    });
  }


  alltags: Promise<Tag[]> = this.allTags();

  async allTags() {
    const allItems = await this.db.TagItem.toArray();
    const allTags = allItems.map((item: TagItem) => item.tags).flat();
    const tagCount = allTags.length;
    allTags.sort();
    const uniqueTags = new Set(allTags).size
    const counts = allTags.reduce((acc: any, curr: any) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    const tagCounts = Object.entries(counts).map(([tag, count]) => ({ tag, count }));
    counts['All'] = uniqueTags;
    tagCounts.unshift({ tag: 'All', count: uniqueTags });
    return tagCounts.map((tagCount: any) => ({ ...tagCount, showTag: false }));
  }
}
