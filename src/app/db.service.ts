import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface TagItem {
  id: number;
  tags?: string[];
  time: string;
  selection: string;
  url: string;
  title: string;
  isEditing: boolean;
  isFlipped: boolean;
  isShowing: boolean;
  metaDescription?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  TagItem !: Table<TagItem>;

  constructor() {
    super("ngdexieliveQuery");
    this.version(1).stores({
      TagItem: 'id,tags,time,selection,url,title,isEditing,isFlipped,isShowing,metaDescription'
    });
    this.TagItem = this.table('TagItem');
  }

  // add tagItem
  async addItem(TagItem: TagItem) {
    try {
      await this.TagItem.add(TagItem);
    } catch (error) {
      console.log(error);
    }
  }

  // delete tagItem
  async deleteItem(id: number) {
    try {
      await this.TagItem.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  // get all tagItems
  async getAllItems(): Promise<TagItem[]> {
    try {
      return await this.TagItem.toArray();
    } catch (error) {
      console.log(error);
      return [];
    }
  }


  async updateItem(TagItem: TagItem) {
    await db.TagItem.update(TagItem.id, {
      tags: TagItem.tags,
      selection: TagItem.selection,
      isFlipped: TagItem.isFlipped,
    });
  }


}

export const db = new DbService();