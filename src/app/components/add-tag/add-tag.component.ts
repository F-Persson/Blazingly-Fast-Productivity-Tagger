import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TagItem } from 'src/app/TagItem';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements TagItem {
  @Output() tagAdded = new EventEmitter<string[]>();
  @Output() tagDeleted = new EventEmitter<string[]>();
  id!: number;
  tags: string[] = [];
  time!: string;
  selection: string = '';
  url!: string;
  title: string = '';

  faTimes = faTimes;

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
