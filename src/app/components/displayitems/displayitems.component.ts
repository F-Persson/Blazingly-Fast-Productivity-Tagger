import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagItem } from 'src/app/TagItem';
import { TagItems } from 'src/app/mock-TagItem';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-displayitems',
  templateUrl: './displayitems.component.html',
  styleUrls: ['./displayitems.component.scss'],
})
export class DisplayitemsComponent {
  @Input() tagItems?: TagItem[];
  @Input() save!: boolean;


  //save: boolean = false;

  id!: number;
  tags: string[] = [];
  time!: string;
  selection: string = '';
  url!: string;
  title: string = '';

  //public tagItems: TagItem[] = TagItems;
  faTimes = faTimes;
  faTrash = faTrash;


  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }

  addTag(event: Event, TagItem: TagItem) {
    event.preventDefault();
    const inputElement = document.getElementById('tags') as HTMLInputElement;
    const tag = inputElement.value.trim();
    if (tag.length > 0) {
      TagItem.tags?.push(tag);
      inputElement.value = '';
    }
  }

  deleteTag(TagItem: TagItem, tag: string) {
    TagItem.tags = TagItem.tags?.filter((t) => t !== tag);
  }

  deleteItem(id: number) {
    this.tagItems = this.tagItems?.filter(t => t.id !== id);
  }

  onSubmit(TagItem: TagItem, save: boolean) {
    if (save) {
      alert("creating this");
    } else {
      this.updateItem(TagItem);
    }
  }

  updateItem(TagItem: TagItem) {
    alert('updating item ' + TagItem.id);
  }
}
