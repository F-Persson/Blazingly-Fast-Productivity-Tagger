import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



// TODO

// Loop through mock-TagItem and display them in the options page

// Make a database for the TagItem

// Add button in save tag to save the tagItem to the database