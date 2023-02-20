import { Component, Input } from '@angular/core';
import { TagItem, db } from 'src/app/db';

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
    // get length of list
    const tagCount = allTags.length;
    allTags.sort();
    const counts = allTags.reduce((acc: any, curr: any) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    console.log(counts); // Logs correct but 4 times
    // Add tag with name All that has the length of the list
    const tagCounts = Object.entries(counts).map(([tag, count]) => ({ tag, count }));
    counts['All'] = tagCount;
    // Add 'All' to the beginning of the list
    tagCounts.unshift({ tag: 'All', count: tagCount });
    return tagCounts;
  }
}
