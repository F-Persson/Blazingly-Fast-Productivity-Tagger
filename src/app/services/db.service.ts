import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface TagItem {
  id: number;
  tags: string[];
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

  getAllItems(): Promise<TagItem[]> {
    return this.TagItem.toArray();
  }

  async createItem(TagItem: TagItem): Promise<void> {
    console.log('Creating item with id: ' + TagItem.id);
    await db.TagItem.add(TagItem, TagItem.id);
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