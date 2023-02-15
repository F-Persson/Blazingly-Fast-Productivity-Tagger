import { Component } from '@angular/core';
import { TagItem } from 'src/app/TagItem';
import { TagItems } from 'src/app/mock-TagItem';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})

export class OptionsComponent {
  save: boolean = false;
  public tagItems: TagItem[] = TagItems;
}


