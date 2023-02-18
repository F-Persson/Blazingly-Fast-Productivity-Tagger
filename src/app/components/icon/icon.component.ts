import { Component, Input, EventEmitter, Output } from '@angular/core';
import { db, TagItem } from 'src/app/db';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() tagItems!: TagItem
  @Input() color?: string;
  @Input() icon!: IconProp;
  @Input() className?: string;

}
