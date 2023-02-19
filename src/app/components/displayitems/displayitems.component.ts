import { Component, Input } from '@angular/core';
import { db, TagItem } from 'src/app/db';
import { faTimes, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-displayitems',
  templateUrl: './displayitems.component.html',
  styleUrls: ['./displayitems.component.scss'],
})
export class DisplayitemsComponent {
  @Input() tagItems?: TagItem[];
  @Input() save!: boolean;


  faTimes = faTimes;
  faTrash = faTrash;
  faEdit = faEdit;
  faCheck = faCheck;


  async onEdited(TagItem: TagItem) {
    console.log("This doesn't work yet. Feel free to help me out! https://github.com/F-Persson/tagger");
    await db.TagItem.update(TagItem.id, {
      Selection: TagItem.selection,
    });
  }

  async reloadTags() {
    this.tagItems = await db.TagItem.toArray();
    for (let i = 0; i < this.tagItems.length; i++) {
      console.log(this.tagItems[i].selection);
    }
  }


  flipcard(TagItem: TagItem) {
    console.log("flipping item-" + TagItem.id);
    TagItem.isFlipped = !TagItem.isFlipped;
    setTimeout(() => {
      this.updateItem(TagItem);
    }, 500);
  }


  async editSelection(TagItem: TagItem) {
    TagItem.isEditing = !TagItem.isEditing;
  }


  async saveEdit(TagItem: TagItem) {
    console.log('Updated item: ' + TagItem.id);
    await db.TagItem.update(TagItem.id, {
      tags: TagItem.selection,
    });
  }


  onTagAdded(tagItem: TagItem) {
    this.updateItem(tagItem);
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
    this.updateItem(TagItem);
  }

  async onSubmit(TagItem: TagItem, save: boolean) {
    if (save) {
      console.log('Creating item ' + TagItem.id);
      await this.createItem(TagItem);
      window.close();
    } else {
      console.log('updating item ' + TagItem.id);
      await this.updateItem(TagItem);
    }
  }

  async createItem(TagItem: TagItem) {
    console.log('Creating item with id: ' + TagItem.id);
    await db.TagItem.add(TagItem, TagItem.id);
    return;
  }

  async deleteItem(TagItem: TagItem) {
    console.log('Deleted item created at: ' + TagItem.time);
    await db.TagItem.delete(TagItem.id);
  }

  async updateItem(TagItem: TagItem) {
    console.log('Updated item: ' + TagItem.id);
    console.log("New selection: " + TagItem.selection);
    await db.TagItem.update(TagItem.id, {
      tags: TagItem.tags,
      Selection: TagItem.selection,
      isFlipped: TagItem.isFlipped,
    });
  }
}
