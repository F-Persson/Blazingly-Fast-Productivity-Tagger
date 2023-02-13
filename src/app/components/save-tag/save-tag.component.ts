///<reference types="chrome"/>
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-tag',
  templateUrl: './save-tag.component.html',
  styleUrls: ['./save-tag.component.scss']
})
export class SaveTagComponent {
  url!: string;
  title: string = '';
  selection: string = '';
  tags: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      this.title = params['title'];
      this.selection = params['selectedText'];
    });
  }

  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }
}