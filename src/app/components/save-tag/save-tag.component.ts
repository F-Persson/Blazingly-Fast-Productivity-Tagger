///<reference types="chrome"/>
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagItem } from 'src/app/TagItem';

// import { Subscription } from 'rxjs';
// use with
//  @Output() onAddTask: EventEmitter<Tagitem> = new EventEmitter();
// 


@Component({
  selector: 'app-save-tag',
  templateUrl: './save-tag.component.html',
  styleUrls: ['./save-tag.component.scss']
})
export class SaveTagComponent implements TagItem {
  // set id to the last id in the array

  id!: number;
  tags: string[] = [];
  time!: string;
  selection: string = '';
  url!: string;
  title: string = '';
  // save: boolean = true;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {

      this.url = params['url'],
        this.title = params['title'],
        this.selection = params['selectedText'],
        this.tags = [],
        this.time = new Date().toLocaleString(),
        this.id = 4

      // this.url = params['url'];
      // this.title = params['title'];
      // this.selection = params['selectedText'];
    });
  }

  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }

  onSubmit(event: Event) {
    // if (this.save) {
    alert('Saving this');
    // const newItem = {
    //   text: this.text,
    //   day: this.day,
    //   reminder: this.reminder,
    // };

    return;
    // } else {
    //   alert("updating this");
    // }
  }
}