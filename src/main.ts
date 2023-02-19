import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));




  // Loop through mock-TagItem and display them in the options page
  // Add button in save tag to save the tagItem to the database


  // Make a database for the TagItem
  
  // re-use the save-tag component to use both in popup and options page
  
  // add the search bar to the top of the options page

  // TODO

  // add isEditing and isFlipped to TagItem

  // add flipfunction to TagItem, the angular way. Also to flipall

  // add Tags and group by tags