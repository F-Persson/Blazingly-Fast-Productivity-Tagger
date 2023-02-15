import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SaveTagComponent } from './components/save-tag/save-tag.component';
import { OptionsComponent } from './pages/options/options.component';
import { PopupComponent } from './pages/popup/popup.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DisplayitemsComponent } from './components/displayitems/displayitems.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'popup', component: PopupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaveTagComponent,
    OptionsComponent,
    PopupComponent,
    SidebarComponent,
    DisplayitemsComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true, useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
