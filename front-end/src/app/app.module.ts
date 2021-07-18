import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { SearchFilterLastPipe } from './search-filter-last.pipe';
import { SearchAgePipe } from './search-age.pipe';
import { SearchStatePipe } from './search-state.pipe';
import { SearchCountryPipe } from './search-country.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchFilterPipe,
    SearchFilterLastPipe,
    SearchAgePipe,
    SearchStatePipe,
    SearchCountryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
