import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));




  // Loop through mock-TagItem and display them in the options page
  // Add button in save tag to save the tagItem to the database


  // Make a database for the TagItem
  
  // re-use the save-tag component to use both in popup and options page
  
  // add the search bar to the top of the options page

  
  // add isEditing and isFlipped to TagItem
  
  // add flipfunction to TagItem, the angular way. 
  

  // ## Does not work yet - skip for now
  // Add function to faEdit icon to save the selection
  // Works to edit the selection but not to save it to the database
  // ## Does not work yet - skip for now
  // ## It was a typo!!!!!!!!! - it works now
  
  // TODO

  // Add topbar to options page with searchbox, flip all button
  //  and dropdown to show all tags grouped by tag 
  
  // Add post requests and get requests to the backend
  // To share the TagItem with all users in a public domain

  // instead of button in the options page - show how many times it has been tagged and upvoted or downvoted
