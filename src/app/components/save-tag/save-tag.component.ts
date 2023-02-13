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
  title?: string;
  selection?: string;
  tags: string[] = [];
  tagInput: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      this.title = params['title'];
      this.selection = params['selectedText'];
    });
  }

  // constructor(private route: ActivatedRoute) {
  //   chrome.runtime.onMessage.addListener((message: any) => {
  //     if (message.action === 'setPopup') {
  //       this.url = message.url;
  //       this.title = message.title;
  //       this.selection = message.selection;
  //       // chrome.browserAction.setPopup({ popup: 'index.html#popup' });
  //       chrome.windows.getCurrent(function (currentWindow) {
  //         const windowWidth = 400;
  //         const windowHeight = 400;
  //         chrome.windows.create(
  //           {
  //             url: "index.html#popup",
  //             type: "popup",
  //             width: windowWidth,
  //             height: windowHeight,
  //           }
  //         );
  //       });
  //     }
  //   });
  // }
}