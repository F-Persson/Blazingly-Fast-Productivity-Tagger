import { Component } from '@angular/core';
import { TagItem } from 'src/app/TagItem';
import { TagItems } from 'src/app/mock-TagItem';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements TagItem {
  id!: number;
  tags: string[] = [];
  time!: string;
  selection: string = '';
  url!: string;
  title: string = '';

  tagItems: TagItem[] = TagItems;


  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }

  addTag(event: Event) {
    event.preventDefault();
    const inputElement = document.getElementById('tags') as HTMLInputElement;
    const tag = inputElement.value.trim();
    if (tag.length > 0) {
      this.tags.push(tag);
      inputElement.value = '';
    }
  }

  deleteTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }
}
