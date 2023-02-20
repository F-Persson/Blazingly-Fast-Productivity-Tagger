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





  async showItem(itemOfTag: Tag) {
    console.log('showing tag: ' + itemOfTag.showTag);
    itemOfTag.showTag = !itemOfTag.showTag;
    console.log('showing tag: ' + itemOfTag.showTag);
    const allItems = await this.db.TagItem.toArray();
    if (itemOfTag.tag === 'All') {
      allItems.forEach((tagItem: TagItem) => {
        tagItem.isShowing = !tagItem.isShowing;
      });
      this.db.TagItem.bulkPut(allItems);
      return;
    }
    else {
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
    counts['All'] = tagCount;
    tagCounts.unshift({ tag: 'All', count: tagCount });
    return tagCounts.map((tagCount: any) => ({ ...tagCount, showTag: true }));
  }
}
