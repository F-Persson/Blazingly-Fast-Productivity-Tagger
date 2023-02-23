import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OptionsComponent } from './pages/options/options.component';
import { PopupComponent } from './pages/popup/popup.component';
import { DisplayitemsComponent } from './components/displayitems/displayitems.component';
import { IconComponent } from './components/icon/icon.component';
import { TitleComponent } from './components/title/title.component';
import { SelectionComponent } from './components/selection/selection.component';
import { TagsComponent } from './components/tags/tags.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FooterComponent } from './components/footer/footer.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'popup', component: PopupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent,
    PopupComponent,
    DisplayitemsComponent,
    IconComponent,
    TitleComponent,
    SelectionComponent,
    TagsComponent,
    ButtonsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true, useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
