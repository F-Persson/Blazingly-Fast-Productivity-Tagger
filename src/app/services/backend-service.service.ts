import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagItem } from 'src/app/services/db.service';

@Injectable()
export class BackendService {
  constructor(private http: HttpClient) { }
  private readonly WEBHOOK_URL = "https://localhost:7293/api/TagItems";

  postData(data: TagItem) {
    // URL of your back end server
    const url = this.WEBHOOK_URL;

    const apiItem = {
      id: data.id,
      tags: data.tags,
      time: data.time,
      selection: data.selection,
      url: data.url,
      title: data.title,
      metaDescription: data.metaDescription
    };

    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(apiItem);
    // Make a post request and return an Observable
    return this.http.post(url, body, options);
  }
}
