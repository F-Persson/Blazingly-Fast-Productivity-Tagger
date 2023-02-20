import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { DbService, TagItem } from 'src/app/db.service';


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
      return {
        id: result.id,
        tags: result.tags,
        time: result.time,
        selection: result.selection,
        url: result.url,
        title: result.title,
        isEditing: result.isEditing,
        isFlipped: result.isFlipped,
        isShowing: result.isShowing,
      };
    });
    console.log('Search results: ', this.searchResults);
  }


}