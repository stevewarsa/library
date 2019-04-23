import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { OverlayPanel, ConfirmationService } from 'primeng/primeng';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lb-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewBooksComponent implements OnDestroy {
  books:Book[] = [];
  private subscription:Subscription;
  private filtered:boolean = false;
  display:boolean = false;
  selectedBook: Book;

  constructor(private bookService:BookService, private confirmationService: ConfirmationService) {
    console.log('ViewBooksComponent.constructor - calling bookService.getBooks()...');
    this.loadBooks();
    this.subscription = this.bookService.bookAnnounced$.subscribe(
      books => {
        console.log('ViewBooksComponent.constructor (bookService.bookAnnounced$.subscribe) - calling loadBooks...');
        this.loadBooks();
      }
    ); 
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      books => {
        console.log('ViewBooksComponent.loadBooks - bookService.getBooks().subscribe()...');
        this.filtered = false;
        this.books = books;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    this.display = true;
  }

  deleteBook(book: Book) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this book?',
      accept: () => {
        this.bookService.deleteBook(book.id).subscribe((response: string) => {
          console.log("Here is the response for delete book: " + response);
          console.log("Reloading books now... ");
          this.loadBooks();
        });
      }
    });
  }
  
  refresh() {
    this.loadBooks();
  }
}
