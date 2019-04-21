import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class BookService {
  private _url:string = "http://ps11911.com/library/php/";
  // Observable string sources
  private bookAnnouncedSource = new Subject<Book>();
  bookAnnounced$:Observable<Book> = this.bookAnnouncedSource.asObservable();

  constructor(private httpService: HttpClient) {
  }
  
  addBook(book:Book):Observable<any> {
    console.log('BookService.addBook - calling server to add new book...')
    return this.httpService.post(this._url + 'add_book.php', book);
  }
  
  updateBook(book:Book):Observable<any> {
    console.log('BookService.addBook - calling server to update book...')
    return this.httpService.post(this._url + 'update_book.php', book);
  }

  announceNewBook(book:Book) {
    console.log('BookService.announceNewBook - announcing new book...')
    this.bookAnnouncedSource.next(book);
  }

  getBooks():Observable<any> {
    console.log('BookService.getBooks - calling ' + this._url + 'get_books.php...')
    return this.httpService.get(this._url + 'get_books.php');
  }

  searchBooks(searchText:string):Observable<any> {
    console.log('BookService.getBooks - calling ' + this._url + 'get_books.php...')
    return this.httpService.get(this._url + 'search_books.php?searchText=' + searchText);
  }

  getAuthors():Observable<any> {
    console.log('BookService.getAuthors - calling ' + this._url + 'get_authors.php...')
    return this.httpService.get(this._url + 'get_authors.php');
  }
}