import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagItem } from 'src/app/services/db.service';


@Injectable()

export class DiscordService {
  constructor(private http: HttpClient) { }
  private readonly DISCORD_WEBHOOK_URL = "fdsadf://discord.com/api/webhooks/1072515831201812522/Xx0h2zX4eG5eWVDCfMdT9XDOX-UQzK8_OjCL0rgZzSQIDFtYG2Mazz7QldQwsuAjtXUB";

  postData(data: TagItem) {
    // URL of your back end server
    const url = this.DISCORD_WEBHOOK_URL;
    const body = {
      "username": "From Chrome Extension",
      "content": data.selection,
      "embeds": [
        {
          "author": {
            "name": data.id,
            "url": data.url,
          },
          "title": data?.title || "No title",
          "description": data.metaDescription,
          "color": 15258703,
          "fields": [
            {
              "name": "Tags",
              "value": data?.tags?.join(", ") || "No tags",
              "inline": true
            },
            {
              "name": "Time",
              "value": data.time,
              "inline": true
            }
          ]
        }
      ]
    }


    // Optional options object containing headers, params, etc.
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const bodyString = JSON.stringify(body);

    // Make a post request and return an Observable
    return this.http.post(url, bodyString, options);
  }
}
