import { Component, Input } from '@angular/core';
import { TagItem } from 'src/app/services/db.service';
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
