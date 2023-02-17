//import { TagItem } from 'src/app/TagItem';
///<reference types="chrome"/>
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDB, db, TagItem } from 'src/app/db';


@Component({
  selector: 'app-save-tag',
  templateUrl: './save-tag.component.html',
  styleUrls: ['./save-tag.component.scss']
})
export class SaveTagComponent {
  save: boolean = true;
  tagItems: TagItem[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      db.TagItem.orderBy('id').reverse().first().then((maxTagItem: TagItem | undefined) => {
        const maxId: number = maxTagItem ? maxTagItem.id : 0;
        this.tagItems = [{
          id: maxId + 1,
          tags: [],
          time: new Date().toLocaleString(),
          selection: params['selectedText'],
          url: params['url'],
          title: params['title'],
          html: params['html']
        }];
      });
    });
  }
}
