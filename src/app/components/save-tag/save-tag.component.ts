import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddTagComponent } from '../add-tag/add-tag.component';

@Component({
  selector: 'app-save-tag',
  templateUrl: './save-tag.component.html',
  styleUrls: ['./save-tag.component.scss']
})
export class SaveTagComponent {
  url: string = "https://example.com";
  title?: string = "Page title";
  selection?: string = "selected text";
  tags: string[] = [];
  tagInput: string = '';

}