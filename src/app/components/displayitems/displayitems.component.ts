import { Component, Input, ViewChild } from '@angular/core';
import { faTimes, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { SelectionComponent } from '../selection/selection.component';
import { DbService, TagItem } from 'src/app/db.service';



@Component({
  selector: 'app-displayitems',
  templateUrl: './displayitems.component.html',
  styleUrls: ['./displayitems.component.scss'],
})
export class DisplayitemsComponent {
  constructor(private db: DbService) { }

  @Input() tagItems?: TagItem[];
  @Input() save!: boolean;
  @ViewChild("SelectionComponent") selectionComponent!: SelectionComponent;



  faTimes = faTimes;
  faTrash = faTrash;
  faEdit = faEdit;
  faCheck = faCheck;


  onEdited(TagItem: TagItem) {
    console.log("Updating selection");
    this.db.updateItem(TagItem);
  }


  flipcard(TagItem: TagItem) {
    console.log("flipping item: " + TagItem.id);
    TagItem.isFlipped = !TagItem.isFlipped;
    setTimeout(() => {
      this.db.updateItem(TagItem);
    }, 500);
  }


  async editSelection(TagItem: TagItem) {
    TagItem.isEditing = !TagItem.isEditing;
  }


  async saveEdit(TagItem: TagItem) {
    console.log('Updated item: ' + TagItem.id);
    await this.db.TagItem.update(TagItem.id, {
      tags: TagItem.selection,
    });
  }


  onTagAdded(tagItem: TagItem) {
    this.db.updateItem(tagItem);
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
    this.db.updateItem(TagItem);
  }

  async onSubmit(TagItem: TagItem, save: boolean) {
    if (save) {
      console.log('Creating item ' + TagItem.id);
      await this.createItem(TagItem);
      window.close();
    } else {
      console.log('updating item ' + TagItem.id);
      await this.db.updateItem(TagItem);
    }
  }

  async createItem(TagItem: TagItem) {
    console.log('Creating item with id: ' + TagItem.id);
    await this.db.TagItem.add(TagItem, TagItem.id);
    return;
  }

  async deleteItem(TagItem: TagItem) {
    console.log('Deleted item created at: ' + TagItem.time);
    await this.db.TagItem.delete(TagItem.id);
  }
}
