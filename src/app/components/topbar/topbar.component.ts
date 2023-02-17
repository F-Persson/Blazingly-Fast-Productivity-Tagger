import { Component } from '@angular/core';
import { db, TagItem } from 'src/app/db';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  searchResults?: TagItem[];

  async searchOnChange(event: any) {
    const searchTerm = event.target.value.trim();

    if (searchTerm.length === 0) {
      this.searchResults = [];
      return;
    }

    const results = await db.TagItem.where('tags').anyOfIgnoreCase(searchTerm)
      .or('selection').startsWithIgnoreCase(searchTerm)
      .or('title').startsWithIgnoreCase(searchTerm)
      .or('url').startsWithIgnoreCase(searchTerm)
      .toArray();
  }
}
