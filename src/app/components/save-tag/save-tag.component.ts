///<reference types="chrome"/>
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagItem } from 'src/app/TagItem';



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
      this.tagItems = [{
        id: 4,
        tags: [],
        time: new Date().toLocaleString(),
        selection: params['selectedText'],
        url: params['url'],
        title: params['title'],
      }];
    });
  }
}
