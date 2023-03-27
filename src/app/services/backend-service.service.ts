import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagItem } from 'src/app/services/db.service';

@Injectable()
export class BackendService {
  tagId!: number;
  tags!: string[];
  time!: string;
  selection!: string;
  url!: string;
  title!: string;
  metaDescription?: string;

  constructor(private http: HttpClient) { }
  private readonly URL = "https://blazingapi.azurewebsites.net/api/tagitems";


  getAll(): any {
    return this.http.get(this.URL);
  }

  postData(data: TagItem): any {

    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(data);
    return this.http.post(this.URL, body, options);
  }
}
