import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagItem } from 'src/app/services/db.service';

// export interface ApiItem {
//   tagId: number;
//   tags: string[];
//   time: string;
//   selection: string;
//   url: string;
//   title: string;
//   metaDescription?: string;
// };

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
  private readonly URL = "https://localhost:7293/api/TagItems";


  getAll(): any {
    return this.http.get(this.URL);
  }

  postData(data: TagItem): any {
    // const apiItem: ApiItem = {
    //   tagId: data.id,
    //   tags: data.tags,
    //   time: data.time,
    //   selection: data.selection,
    //   url: data.url,
    //   title: data.title,
    //   metaDescription: data.metaDescription
    // };

    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(data);
    return this.http.post(this.URL, body, options);
  }
}
