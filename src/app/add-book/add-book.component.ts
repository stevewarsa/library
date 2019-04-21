import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { SelectItem } from "primeng/primeng";
import { Constants } from '../constants';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'lb-add-book',
  templateUrl: './add-book.component.html'
})
export class AddBookComponent implements OnInit {
  authors:string[] = [];
  matchingAuthors:string[] = [];
  validationMessage: string = null;
  bookLocations: SelectItem[] = Constants.bookLocations;
  selectedShelf: string;
  shelfs: SelectItem[] = Constants.shelfs;
  rowInBookShelf: number;
  positions: SelectItem[] = Constants.positions;
  positionInRow: string;
  bookTypes: SelectItem[] = Constants.bookTypes;
  selectedBookType: string;
  
  constructor(private bookService:BookService) { 
    //var keyups = Observable.fromEvent($("#author"), "keyup");
  }

  ngOnInit() {
    this.bookService.getAuthors().subscribe(
      authors => {
        console.log('AddBookComponent.ngOnInit - bookService.getAuthors().subscribe()...');
        this.authors = authors;
      }
    );
  }

  keyTyped(value:string) {
    this.matchingAuthors = [];
    let tempMatchingAuthors:string[] = [];
    if (value.length < 2) {
      return;
    }
    for (let author of this.authors) {
      if (author.indexOf(value) >= 0) {
        tempMatchingAuthors.push(author);
      }
    }
    this.matchingAuthors = tempMatchingAuthors;
  }

  updateAuthorFormValue(newAuthor:string, f:FormGroup, input:any) {
    f.value.author = newAuthor;
    input.value = newAuthor;
  }

  addBook(book:Book, f:FormGroup) {
    if (!book.type_of_book || book.type_of_book === null || book.type_of_book.length === 0) {
      this.validationMessage = "Please select type of book first";
      return;
    }
    this.validationMessage = null;
    this.bookService.addBook(book).subscribe(
      x => {
          if (x == 'success') {
            console.log('AddBookComponent.addBook - sucessfully added book, announcing new book to listeners...');
            this.bookService.announceNewBook(book);
            f.reset();
            this.matchingAuthors = [];
          }
      });
  }
}
