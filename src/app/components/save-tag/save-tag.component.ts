///<reference types="chrome"/>
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagItem } from 'src/app/TagItem';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';


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
  // @Input() tagItems: TagItem[] = [];
  // @Input() save!: boolean;
  id!: number;
  tags: string[] = [];
  time!: string;
  selection: string = '';
  url!: string;
  title: string = '';
  save: boolean = true;
  public tagItems: TagItem[] = [];
  faTimes = faTimes;
  faTrash = faTrash;

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

  // this.url = params['url'],
  //   this.title = params['title'],
  //   this.selection = params['selectedText'],
  //   this.tags = [],
  //   this.time = new Date().toLocaleString(),
  //   this.id = 4

  // this.url = params['url'];
  // this.title = params['title'];
  // this.selection = params['selectedText'];
  shorten(str: string, len: number): string {
    if (str.length <= len) {
      return str;
    } else {
      return str.slice(0, len) + '...';
    }
  }

  addTag(event: Event, TagItem: TagItem) {
    event.preventDefault();
    const inputElement = document.getElementById('tags') as HTMLInputElement;
    const tag = inputElement.value.trim();
    if (tag.length > 0) {
      TagItem.tags?.push(tag);
      inputElement.value = '';
    }
  }

  deleteTag(tagItem: TagItem, index: number) {
    tagItem.tags?.splice(index, 1);
  }

  deleteItem(id: number) {
    this.tagItems = this.tagItems.filter(t => t.id !== id);
  }

  onSubmit(event: Event) {
    if (this.save) {
      alert('Saving this');
    } else {
      alert("updating this");
    }
    // const newItem = {
    //   text: this.text,
    //   day: this.day,
    //   reminder: this.reminder,
    // };

    return;
  }
}