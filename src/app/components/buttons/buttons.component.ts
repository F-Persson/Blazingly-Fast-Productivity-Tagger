import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbService, TagItem } from 'src/app/db.service';


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
export class ButtonsComponent {
  constructor(private db: DbService) { }
  @Input() text!: string;
  @Input() isDropdown!: boolean;
  @Output() showTagItem = new EventEmitter<TagItem>();

  dropDown: boolean = false;

  allOrNone: boolean = false;

  async toggleAll(itemOfTag: Tag) {
    if (itemOfTag.tag === 'Hide All') {
      itemOfTag.tag = 'Show All';
      (await this.alltags).forEach((tag: Tag) => {
        tag.showTag = false;
      });
      const allItems = await this.db.TagItem.toArray();
      allItems.forEach((tagItem: TagItem) => {
        tagItem.isShowing = false;
      });
      this.db.TagItem.bulkPut(allItems);
    }
    else if (itemOfTag.tag === 'Show All') {
      itemOfTag.tag = 'Hide All';
      (await this.alltags).forEach((tag: Tag) => {
        tag.showTag = true;
      });
      const allItems = await this.db.TagItem.toArray();
      allItems.forEach((tagItem: TagItem) => {
        tagItem.isShowing = true;
      });
      this.db.TagItem.bulkPut(allItems);
    }
  }


  async showItem(itemOfTag: Tag, value: string) {
    // const allItems = await this.db.TagItem.toArray();
    if (itemOfTag.tag === 'Hide All' || itemOfTag.tag === 'Show All') {
      this.toggleAll(itemOfTag);
      return;
    }
    else {
      // Find all items with this tag and toggle their showTag property

      itemOfTag.showTag = !itemOfTag.showTag;
      const allItems = await this.db.TagItem.toArray();
      const results = allItems.filter((item: TagItem) => {
        return item.tags?.some((matchtag: string) => itemOfTag.tag == matchtag);
      });
      results.forEach((tagItem: TagItem) => {
        tagItem.isShowing = !tagItem.isShowing;
      });
      this.db.TagItem.bulkPut(results);
    }
  }


  alltags: Promise<Tag[]> = this.allTags();

  async allTags() {
    const allItems = await this.db.TagItem.toArray();
    const allTags = allItems.map((item: TagItem) => item.tags).flat();
    const tagCount = allTags.length;
    allTags.sort();
    const counts = allTags.reduce((acc: any, curr: any) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    console.log(counts);
    const tagCounts = Object.entries(counts).map(([tag, count]) => ({ tag, count }));

    // get unique tag counts

    counts['Hide All'] = tagCount;
    tagCounts.unshift({ tag: 'Hide All', count: tagCount });
    return tagCounts.map((tagCount: any) => ({ ...tagCount, showTag: true }));
  }
}
