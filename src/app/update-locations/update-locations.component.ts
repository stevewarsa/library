import { Component, OnInit } from '@angular/core';
import { SelectItem } from "primeng/primeng";
import { Book } from '../book';
import { Constants } from '../constants';
import { BookService } from '../book.service';

@Component({
  selector: 'lb-update-locations',
  templateUrl: './update-locations.component.html',
  styleUrls: ['./update-locations.component.css']
})
export class UpdateLocationsComponent implements OnInit {

  title: string;
  searchMode: boolean = true;
  editMode: boolean = false;
  editingBook: Book = null;
  books: Book[] = [];
  bookLocations: SelectItem[] = Constants.bookLocations;
  selectedShelf: string;
  shelfs: SelectItem[] = Constants.shelfs;
  rowInBookShelf: number;
  positions: SelectItem[] = Constants.positions;
  positionInRow: string;
  errorMessage: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  getByTitle() {
    this.bookService.searchBooks(this.title).subscribe((books: Book[]) => {
      console.log("Here are the books:");
      console.log(books);
      this.books = books;
      this.searchMode = false;
    });
  }

  editBook(book: Book) {
    this.editingBook = book;
    this.editMode = true;
    this.searchMode = false;
  }

  submitChanges() {
    this.editingBook.bookLocation = this.selectedShelf;
    this.editingBook.shelf = this.rowInBookShelf;
    this.editingBook.positionInRow = this.positionInRow;
    this.bookService.updateBook(this.editingBook).subscribe(response => {
      if (response === "success") {
        this.editMode = false;
        this.searchMode = true;
        this.editingBook = null;
        this.title = null;
        // this.selectedShelf = null;
        // this.rowInBookShelf = -1;
        // this.positionInRow = null;
      } else {
        this.errorMessage = response;
      }
    });
  }
  tryAgain() {
    this.editMode = false;
    this.searchMode = true;
    this.editingBook = null;
    this.errorMessage = null;
  }
  backToSearch() {
    this.editMode = false;
    this.searchMode = true;
    this.editingBook = null;
    this.title = null;
    this.selectedShelf = null;
    this.rowInBookShelf = -1;
    this.positionInRow = null;
}
}
