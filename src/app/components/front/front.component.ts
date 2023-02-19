import { Component, Input } from '@angular/core';
import { TagItem } from 'src/app/db';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent {
  @Input() tagItems!: TagItem;
}
