import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OptionsComponent } from './pages/options/options.component';
import { PopupComponent } from './pages/popup/popup.component';
import { DisplayitemsComponent } from './shared/displayitems/displayitems.component';
import { IconComponent } from './shared/icon/icon.component';
import { TitleComponent } from './shared/title/title.component';
import { SelectionComponent } from './shared/selection/selection.component';
import { TagsComponent } from './shared/tags/tags.component';
import { ButtonsComponent } from './shared/buttons/buttons.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackendService } from './services/backend-service.service';
import { HeaderComponent } from './components/header/header.component';

const appRoutes: Routes = [
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
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true, useHash: true }),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule { }
