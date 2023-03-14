import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { DbService, TagItem } from 'src/app/services/db.service';
import { aboutItem } from 'src/app/pages/about';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  aboutItem: TagItem[] = aboutItem;
  save: boolean = false;
  tagItems: TagItem[] = [];

  constructor(private db: DbService) {
    liveQuery(() => db.TagItem.toArray()).subscribe((tagItems: TagItem[]) => {
      this.tagItems = tagItems;
    });
  }


  showAbout: boolean = false;
  toggleAbout() {
    this.showAbout = !this.showAbout;
  }


  flipall: boolean = false;
  flipAll() {
    this.flipall = !this.flipall;
    this.tagItems.forEach((item: TagItem) => {
      item.isFlipped = this.flipall;
      setTimeout(() => {
        this.db.updateItem(item);
      }, 500);
    });
  }

  searchResults: TagItem[] = [];
  hasSearchResults = false;
  async onSearch(searchTerm: string) {
    if (searchTerm.length === 0) {
      this.searchResults = [];
      this.hasSearchResults = false;
      return;
    }
    this.hasSearchResults = true;


    const allItems = await this.db.TagItem.toArray();
    const results = allItems.filter((item: TagItem) => {
      return item.url.toLowerCase().includes(searchTerm.toLowerCase())
        || item.title.toLowerCase().includes(searchTerm.toLowerCase())
        || item.selection.toLowerCase().includes(searchTerm.toLowerCase())
        || item.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    this.searchResults = results.map((result: TagItem) => {
      return result;
    });
    console.log('Search results: ', this.searchResults);
  }
}