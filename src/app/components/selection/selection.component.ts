import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagItem } from 'src/app/db';
import { faTimes, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent {
  @Input() TagItem!: TagItem;
  @Output() textEdited = new EventEmitter<TagItem>();
  faCheck = faCheck;

  textareaValue!: string;

  ngOnInit() {
    this.textareaValue = this.TagItem.selection;
  }


  edited(TagItem: TagItem) {
    TagItem.selection = this.textareaValue;
    console.log("this.TagItem.selection: " + this.TagItem.selection);
    this.textEdited.emit(this.TagItem);
  }

  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }


}
