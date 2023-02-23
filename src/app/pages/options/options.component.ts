import { Component, EventEmitter, Output } from '@angular/core';
import { liveQuery } from 'dexie';
import { DbService, TagItem } from 'src/app/db.service';
import { aboutItem } from 'src/app/about';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {



  constructor(private db: DbService) {
    liveQuery(() => db.TagItem.toArray()).subscribe((tagItems: TagItem[]) => {
      this.tagItems = tagItems;
    });
  }
  save: boolean = false;
  tagItems: TagItem[] = [];
  searchResults: TagItem[] = [];
  hasSearchResults = false;
  flipall: boolean = false;
  showAbout: boolean = false;
  aboutItem: TagItem[] = aboutItem;


  async exportItemsToJson() {
    // get all items from db
    const allItems = await this.db.TagItem.toArray();
    // create a json string
    const json = JSON.stringify(allItems);
    // create a blob
    const blob = new Blob([json], { type: 'application/json' });
    // create a url
    const url = window.URL.createObjectURL(blob);
    // create a link
    const link = document.createElement('a');
    // set the link's href to the url
    link.href = url;
    link.download = 'tagger.json';
    // click the link
    link.click();
    // remove the link
    link.remove();
    URL.revokeObjectURL(url);

  }

  goToAbout() {
    this.showAbout = !this.showAbout;
  }

  flipAll() {
    this.flipall = !this.flipall;
    this.tagItems.forEach((item: TagItem) => {
      item.isFlipped = this.flipall;
      setTimeout(() => {
        this.db.updateItem(item);
      }, 500);
    });
  }


  async searchOnChange(event: any) {
    const searchTerm = event.target.value.trim();

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