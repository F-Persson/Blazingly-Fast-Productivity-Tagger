import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagItem } from 'src/app/services/db.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input() tagItem!: TagItem;
  @Output() tagAdded = new EventEmitter<TagItem>();

  addTag(event: Event) {
    event.preventDefault();
    const inputElement = document.getElementById(`tags${this.tagItem.id}`) as HTMLInputElement;
    const tag = inputElement.value.trim().toLowerCase();
    if (this.tagItem.tags?.includes(tag)) {
      inputElement.value = '';
      return;
    }
    this.tagItem.tags?.push(tag);
    inputElement.value = '';
    this.tagAdded.emit(this.tagItem);
  }
}
