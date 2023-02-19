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
  @Output() textareaValueChange = new EventEmitter<string>();

  textareaValue!: string;

  ngOnInit() {
    this.textareaValue = this.TagItem.selection;
  }



  edited() {
    this.textareaValueChange.emit(this.textareaValue);
  }


  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }

  faCheck = faCheck;

  // async edited(TagItem: TagItem) {
  //   const inputElement = document.getElementById(`edit${this.TagItem.id}`) as HTMLInputElement;
  //   console.log("inputElement: " + inputElement);
  //   const newSelection = inputElement.value.trim();
  //   console.log("newSelection: " + newSelection);
  // }
  // this.TagItem.selection = newSelection;
  // inputElement.value = '';
  // this.selectionChange.emit(this.TagItem);

  // newSelection(event: Event) {
  //   event.preventDefault();
  //   const inputElement = document.getElementById(`edit${this.TagItem.id}`) as HTMLInputElement;
  //   const newSelection = inputElement.value.trim();
  //   this.TagItem.selection = newSelection;
  //   inputElement.value = '';
  //   this.selectionChange.emit(this.TagItem);
  // }

  // onSelectionChange(selectionInput: HTMLInputElement) {
  //   this.selectionChange.emit(selectionInput.value);
  // }
  // onSelectionChange(newSelection: string, TagItem: TagItem) {
  //   TagItem.selection = newSelection;
  //   TagItem.isEditing = false;
  // }

  // onSelectionClick(TagItem: any) {
  //   this.editSelection(TagItem);
  // }
}
