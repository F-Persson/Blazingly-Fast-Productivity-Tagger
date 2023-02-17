import { Component, EventEmitter, Input, Output } from '@angular/core';
import { db, TagItem } from 'src/app/db';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-displayitems',
  templateUrl: './displayitems.component.html',
  styleUrls: ['./displayitems.component.scss'],
})
export class DisplayitemsComponent {
  @Input() tagItems?: TagItem[];
  @Input() save!: boolean;

  id!: number;
  tags: string[] = [];
  time!: string;
  selection: string = '';
  url!: string;
  title: string = '';
  html: string = '';

  faTimes = faTimes;
  faTrash = faTrash;

  isRotated = false;
  rotate(TagItem: TagItem) {
    this.isRotated = !this.isRotated;
    console.log(this.isRotated);
  }

  addTag(event: Event, TagItem: TagItem) {
    event.preventDefault();
    const inputElement = document.getElementById(
      `tags${TagItem.id}`
    ) as HTMLInputElement;
    const tag = inputElement.value.trim();
    TagItem.tags?.push(tag);
    inputElement.value = '';
  }

  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }

  deleteTag(TagItem: TagItem, tag: string) {
    console.log('Deleting tag ' + tag + ' from item ' + TagItem.id);
    TagItem.tags = TagItem.tags?.filter((t) => t !== tag);
  }

  onSubmit(TagItem: TagItem, save: boolean) {
    if (save) {
      console.log('Creating item ' + TagItem.id);
      this.createItem(TagItem);
    } else {
      console.log('updating item ' + TagItem.id);
      this.updateItem(TagItem);
    }
  }

  async createItem(TagItem: TagItem) {
    console.log('Creating item with id: ' + TagItem.id);
    await db.TagItem.add(TagItem, TagItem.id);
  }

  async deleteItem(TagItem: TagItem) {
    console.log('Deleted item created at: ' + TagItem.time);
    await db.TagItem.delete(TagItem.id);
  }

  async updateItem(TagItem: TagItem) {
    console.log('Updated item: ' + TagItem.id);
    await db.TagItem.update(TagItem.id, {
      tags: TagItem.tags,
    });
  }
}
