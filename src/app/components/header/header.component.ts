import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbService, TagItem } from 'src/app/services/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private db: DbService) { }

  @Input() showAbout: boolean = false;
  @Output() aboutClicked = new EventEmitter<boolean>();
  @Output() flipCards = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();

  toggleAbout() {
    this.aboutClicked.emit();
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
