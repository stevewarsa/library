import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Constants } from '../constants';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'lb-random-book',
  templateUrl: './random-book.component.html',
  styleUrls: ['./random-book.component.css']
})
export class RandomBookComponent implements OnInit {
  bookTypes: SelectItem[] = Constants.bookTypes;
  selectedBookType: string;
  randomBook: Book = null;

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  getRandomBook() {
    this.bookService.getRandomBook(this.selectedBookType).subscribe((randomBook: Book) => {
      this.randomBook = randomBook;
    });
  }
}
