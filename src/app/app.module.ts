import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ViewBooksComponent } from './view-books/view-books.component';
import { UpdateLocationsComponent } from './update-locations/update-locations.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule, DialogModule, InputTextModule, DropdownModule, TabViewModule, OverlayPanelModule, ButtonModule, DataListModule, InputTextareaModule } from 'primeng/primeng';
import { BookService } from './book.service';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    ViewBooksComponent,
    UpdateLocationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    TabViewModule,
    OverlayPanelModule,
    ButtonModule,
    DataListModule,
    InputTextareaModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
