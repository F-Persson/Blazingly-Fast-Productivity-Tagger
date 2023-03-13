import { Component, Input, ViewChild } from '@angular/core';
import { faTimes, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { SelectionComponent } from '../selection/selection.component';
import { DbService, TagItem } from 'src/app/services/db.service';



@Component({
  selector: 'app-displayitems',
  templateUrl: './displayitems.component.html',
  styleUrls: ['./displayitems.component.scss'],
})
export class DisplayitemsComponent {
  constructor(private db: DbService) { }
  @Input() showFooter: boolean = false;
  @Input() tagItems?: TagItem[];
  @Input() save!: boolean;
  @ViewChild("SelectionComponent") selectionComponent!: SelectionComponent;


  faTimes = faTimes;
  faTrash = faTrash;
  faEdit = faEdit;
  faCheck = faCheck;
  inAbout = false;

  onShowAboutChange() {
    this.inAbout = !this.inAbout;
  }


  async onEdited(TagItem: TagItem): Promise<void> {
    if (this.save) {
      TagItem.isEditing = !TagItem.isEditing;
    }
    else {
      console.log("Updating selection");
      await this.db.updateItem(TagItem);
    }
  }


  flipcard(TagItem: TagItem): void {
    console.log("flipping item: " + TagItem.id);
    TagItem.isFlipped = !TagItem.isFlipped;
    setTimeout(async () => {
      await this.db.updateItem(TagItem);
    }, 500);
  }


  editSelection(TagItem: TagItem): void {
    TagItem.isEditing = !TagItem.isEditing;
  }


  async saveEdit(TagItem: TagItem): Promise<void> {
    console.log('Updated item: ' + TagItem.id);
    await this.db.TagItem.update(TagItem.id, {
      tags: TagItem.selection,
    });
  }


  async onTagAdded(tagItem: TagItem): Promise<void> {
    await this.db.updateItem(tagItem);
  }


  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }

  async deleteTag(TagItem: TagItem, tag: string): Promise<void> {
    console.log('Deleting tag ' + tag + ' from item ' + TagItem.id);
    TagItem.tags = TagItem.tags?.filter((t) => t !== tag);
    await this.db.updateItem(TagItem);
  }

  async onSubmit(TagItem: TagItem, save: boolean): Promise<void> {
    if (save) {
      console.log('Creating item ' + TagItem.id);
      await this.db.createItem(TagItem);
      window.close();
    } else {
      console.log('updating item ' + TagItem.id);
      await this.db.updateItem(TagItem);
    }
  }

  async deleteItem(TagItem: TagItem): Promise<void> {
    console.log('Deleted item created at: ' + TagItem.time);
    await this.db.TagItem.delete(TagItem.id);
  }
}
