///<reference types="chrome"/>
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService, TagItem } from 'src/app/services/db.service';
import { DiscordService } from 'src/app/services/discord-service.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent {
  constructor(private route: ActivatedRoute, private db: DbService, private DiscordService: DiscordService) { }
  save: boolean = true;
  tagItems: TagItem[] = [];



  onSubmit(data: TagItem) {
    // Call the postData() method from the service component
    this.DiscordService.postData(data).subscribe(
      // Handle success
      (response: any) => {
        console.log('Data posted successfully', response);
      },
      // Handle error
      (error: any) => {
        console.error('Error posting data', error);
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.db.TagItem.orderBy('id').reverse().first().then((maxTagItem: TagItem | undefined) => {
        const maxId: number = maxTagItem ? maxTagItem.id : 0;
        this.tagItems = [{
          id: maxId + 1,
          tags: [],
          time: new Date().toLocaleString(),
          selection: params['selectedText'],
          url: params['url'],
          title: params['title'],
          metaDescription: params['metaDescription'],
          isEditing: false,
          isFlipped: false,
          isShowing: true
        }];
        this.onSubmit(this.tagItems[0]);
      });
    });
  }
}
