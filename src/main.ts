import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));




  // Loop through mock-TagItem and display them in the options page
  // Add button in save tag to save the tagItem to the database


  // Make a database for the TagItem
  
  // re-use the save-tag component to use both in popup and options page
  
  // add the search bar to the top of the options page
  
  // implement the search function

  
  // add isEditing and isFlipped to TagItem
  
  // add flipfunction to TagItem, the angular way. 
  

  // ## Does not work yet - skip for now
  // Add function to faEdit icon to save the selection
  // Works to edit the selection but not to save it to the database
  // ## Does not work yet - skip for now
  // ## It was a typo!!!!!!!!! - it works now
  
  
  // Add topbar to options page with searchbox, flip all button
  //  and dropdown to show all tags grouped by tag 
  
  // Make the "Your tags" dropdown able to select certain tags. Grey out the not selected tags
  // not exactly like that but something like that
  
  // Instead of about page, add some items to the options page - now I have both
  
  // Add todo list in "All tags"
  // Added it in about page instead
  // Add post requests and get requests to the backend

  // Move the button, displayitems, icon, selection, tags, title, to the shared folder
  // Make a header component and move the   <div class="topbar-container"> from the options page to the header component
  
  // Create an API with C# for the backend and try to connect and posting with the BackendService
  
  // TODOOOOOOOOOO !!!

  // For google oauth - use this package
  // https://www.npmjs.com/package/@abacritt/angularx-social-login

  // Add login option to sync and share the TagItem with all users in a public domain

  // Add catch to the fetch request in the displaycomponent and not in the db.services - the most upper level will catch the error

  // instead of the save button in the popup page, when in options page - show how many times it has been tagged and upvoted or downvoted
