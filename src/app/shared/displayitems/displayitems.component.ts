import { Component, Input, ViewChild } from '@angular/core';
import { faTimes, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { SelectionComponent } from '../selection/selection.component';
import { DbService, TagItem } from 'src/app/services/db.service';
import { BackendService } from 'src/app/services/backend-service.service';


@Component({
  selector: 'app-displayitems',
  templateUrl: './displayitems.component.html',
  styleUrls: ['./displayitems.component.scss'],
})
export class DisplayitemsComponent {
  constructor(private db: DbService, private BackendService: BackendService) { }
  @Input() showFooter: boolean = false;
  @Input() tagItems?: TagItem[];
  @ViewChild("SelectionComponent") selectionComponent!: SelectionComponent;

  faTimes = faTimes;
  faTrash = faTrash;
  faEdit = faEdit;
  faCheck = faCheck;

  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }

  @Input() save!: boolean;
  async onEdited(TagItem: TagItem): Promise<void> {
    console.log("Updating selection");
    await this.db.updateItem(TagItem);
  }

  flipcard(TagItem: TagItem): void {
    console.log("flipping item: " + TagItem.id);
    TagItem.isFlipped = !TagItem.isFlipped;
    setTimeout(async () => {
      await this.db.updateItem(TagItem);
    }, 500);
  }

  async onTagAdded(tagItem: TagItem): Promise<void> {
    await this.db.updateItem(tagItem);
  }

  async deleteTag(TagItem: TagItem, tag: string): Promise<void> {
    console.log('Deleting tag ' + tag + ' from item ' + TagItem.id);
    TagItem.tags = TagItem.tags?.filter((t) => t !== tag);
    await this.db.updateItem(TagItem);
  }

  async deleteItem(TagItem: TagItem): Promise<void> {
    console.log('Deleted item created at: ' + TagItem.time);
    await this.db.TagItem.delete(TagItem.id);
  }

  async onSubmit(TagItem: TagItem, save: boolean) {
    if (save) { // And if user is not logged in
      console.log('Creating item ' + TagItem.id);
      await this.db.createItem(TagItem);

      // Call the postData() method from the service component
      await this.BackendService.postData(TagItem).subscribe(
        // Handle success
        (response: any) => {
          console.log('Data posted successfully', response);
          window.close();
        },
        // Handle error
        (error: any) => {
          console.error('Error posting data', error);
        }
      );

    } else {
      console.log('updating item ' + TagItem.id);
      await this.db.updateItem(TagItem);
    }
  }
}
