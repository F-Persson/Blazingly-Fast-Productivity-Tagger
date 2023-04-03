import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbService, TagItem } from 'src/app/services/db.service';
import { BackendService } from 'src/app/services/backend-service.service';

// TODO: Remake this component to be more generic and reusable

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private db: DbService, private BackendService: BackendService) { }

  @Input() showAbout: boolean = false;
  @Output() aboutClicked = new EventEmitter<boolean>();
  @Output() flipCards = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  @Output() showAll = new EventEmitter<boolean>();

  toggleAbout() {
    this.aboutClicked.emit();
  }


  AllTagsItem: TagItem[] = [];
  YourTagsItem: TagItem[] = [];


  async ngOnInit() {
    this.YourTagsItem = await this.GetYourTags();
    this.AllTagsItem = await this.GetAllTags();
  }

  async GetAllTags(): Promise<TagItem[]> {
    return new Promise<TagItem[]>((resolve, reject) => {
      let all_tags: TagItem[] = [];
      this.BackendService.getAll().subscribe((data: TagItem[]) => {
        all_tags = data;
        resolve(all_tags);
      }, (error: any) => {
        reject(error);
      });
    });
  }


  async GetYourTags() {
    const allItems = this.db.TagItem.toArray();
    return allItems;
  }

  allTags() {
    console.log("Getting all tags");
    this.showAll.emit();
  }

  flipall: boolean = false;
  flipAll() {
    this.flipCards.emit();
  }

  async searchOnChange(event: any) {
    const searchTerm = event.target.value.trim();

    if (searchTerm.length === 0) {
      this.search.emit('');
      return;
    }
    this.search.emit(searchTerm);
  }
}
