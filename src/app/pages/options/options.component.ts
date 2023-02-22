import { Component, EventEmitter, Output } from '@angular/core';
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
  showAbout: boolean = false;

  aboutItem: TagItem[] = [
    {
      title: "Hi, my name is Francis, I'm a software developer",
      selection: "I developed this extension to improve my software skills and learn Angular.\n\nI hope that you also find it helpful.",
      url: "https://fpersson.com",
      id: 0,
      tags: ["about", "contact", "help", "feedback"],
      time: new Date().toLocaleString(),
      isEditing: false,
      isFlipped: false,
      isShowing: true,
    },
    {
      title: "TODO:",
      selection: "Make backend in C# for saving and sharing your tagItems\n\nA login option\n\nFor more info please see the github repo.\nYou'll find my contact info at the bottom of this page.",
      url: "https://github.com/F-Persson",
      id: -1,
      tags: ["Tagger", "Version 0.5", "Open Source", "feedback"],
      time: new Date().toLocaleString(),
      isEditing: false,
      isFlipped: false,
      isShowing: true,
    },
    {
      title: "How to",
      selection: "On any page:\n\n select some text (optional) and press ctrl + left click to save the page\n\npress ctrl + right click to open this option page\n\nClick the text (this text) to flip any card",
      url: "https://tothechromeextensionurl.com",
      id: -2,
      tags: ["Instructions", "Info", "Howto"],
      time: new Date().toLocaleString(),
      isEditing: false,
      isFlipped: true,
      isShowing: true,
    }
  ];

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