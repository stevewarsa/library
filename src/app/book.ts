export class Book {
    constructor(
        public title: string, 
        public subtitle: string, 
        public author: string, 
        public bookLocation: string,
        public shelf: number,
        public positionInRow: string,
        public type_of_book: string
    ) { }
}
