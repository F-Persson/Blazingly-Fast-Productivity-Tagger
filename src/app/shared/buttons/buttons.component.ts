import { Component, Input, SimpleChanges } from '@angular/core';
import { DbService, TagItem, Tag } from 'src/app/services/db.service';

// TODO: Remake this component to be more generic and reusable

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})

export class ButtonsComponent implements Tag {
  constructor(private db: DbService) { }
  @Input() alltags: boolean = false;
  @Input() text!: string;
  @Input() isDropdown!: boolean;
  @Input() tagItem: TagItem[] = [];

  dropDown: boolean = false;
  allOrNone: boolean = false;
  tag: string = '';
  count: number = 0;
  showTag: boolean = true;
  showItems: string[] = [];

  TagItem: TagItem[] = [];


  Tags: Tag[] = [];
  AllTags: Tag[] = [];

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['tagItem']) {
      this.TagItem = changes['tagItem'].currentValue;
      this.Tags = await this.all_Tags(this.TagItem);
    }
  }


  // Returns an array of tags and the number of times they appear in the tagItem
  async all_Tags(allItems: TagItem[]) {
    // Gets all tags
    const allTags = allItems.map((item: TagItem) => item.tags).flat();
    // Gets the number of tags
    const tagCount = allTags.length;
    // Sorts the tags alphabetically
    allTags.sort();
    // Gets the number of unique tags
    const uniqueTags = new Set(allTags).size
    // Counts the number of times each tag appears
    const counts = allTags.reduce((acc: any, curr: any) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    // Creates an array of objects with the tag and the number of times it appears
    const tagCounts = Object.entries(counts).map(([tag, count]) => ({ tag, count }));
    // Adds an All tag to the array
    counts['All'] = uniqueTags;
    tagCounts.unshift({ tag: 'All', count: uniqueTags });
    // Returns an array of objects with the tag and the number of times it appears, as well as a showTag property
    return tagCounts.map((tagCount: any) => ({ ...tagCount, showTag: false }));
  }


  async hideItem(itemOfTag: Tag, allOrYours: boolean, tagItem: TagItem[]) {
    if (itemOfTag.tag === 'All') {
      return;
    }
    else {
      itemOfTag.showTag = false;
      this.showItems = this.showItems.filter((tag: string) => tag !== itemOfTag.tag); // remove tag from showItems
      this.showTheseItems(this.showItems, allOrYours, tagItem);
    }
  }


  async showItem(itemOfTag: Tag, allOrYours: boolean, allItems: TagItem[]) {
    console.log(allOrYours);
    if (itemOfTag.tag === 'All') {
      (await this.all_Tags(allItems)).forEach((tag: Tag) => {
        tag.showTag = false;
      });
      allItems.forEach((tagItem: TagItem) => {
        tagItem.isShowing = true;
      });
      if (allOrYours == false) {
        this.db.TagItem.bulkPut(allItems);
        this.Tags = await this.all_Tags(this.TagItem);
      }
      return;
    }
    else {
      itemOfTag.showTag = true; // Show css in dropdown
      this.showItems.push(itemOfTag.tag); // add tag to showItems
      this.showTheseItems(this.showItems, allOrYours, allItems);
    }
  }

  async showTheseItems(showItems: string[], allOrYours: boolean, allItems: TagItem[]) {
    if (this.showItems.length === 0) {  // if no tags are selected, show all
      allItems.forEach((tagItem: TagItem) => {
        tagItem.isShowing = true;
      });
      if (allOrYours == false)
        this.db.TagItem.bulkPut(allItems);
      this.TagItem = allItems;
      return;
    }
    allItems.forEach((tagItem: TagItem) => { // if tags are selected, show only those
      if (showItems.some((matchtag: string) => tagItem.tags?.some((itemtag: string) => itemtag === matchtag))) {
        tagItem.isShowing = true;
      }
      else { // if no tags are selected, hide all
        tagItem.isShowing = false;
      }
    });
    if (allOrYours == false) {
      this.db.TagItem.bulkPut(allItems);
    }
  }
}
