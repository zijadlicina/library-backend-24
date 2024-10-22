import { book } from "../../db/library/books";

export function generateRandomISBN13(): string{
    let isbn = "";
    for (let i = 0; i < 12; i++) {
        isbn += Math.floor(Math.random() * 10);  // Nasumična cifra između 0 i 9
    }
    let checkDigit = 0;
    for (let i = 0; i < 12; i++) {
        checkDigit += (i % 2 === 0 ? 1 : 3) * parseInt(isbn.charAt(i));
    }
    checkDigit = (10 - (checkDigit % 10)) % 10;
    isbn += checkDigit;

    return isbn;
}
export function makeSqlUpdateQuery(updatedBook: book, idBook: string): any[]{
    let sqlQuery: string = "UPDATE book SET ";
	let queryParams = [];
	let queryValues: any[] = [];
	if (updatedBook.title) {
		queryParams.push("title = ?") 
		queryValues.push(updatedBook.title) 
	}
	if (updatedBook.pages) {
		queryParams.push("pages = ?")
		queryValues.push(updatedBook.pages) 
	}
	if (updatedBook.published) {
		queryParams.push("published = ?")
		queryValues.push(updatedBook.published) 
	}
	if (updatedBook.image) {
		queryParams.push("image = ?")
		queryValues.push(updatedBook.image) 
	}
    if (queryParams.length === 0) return [0, 0]
	sqlQuery += queryParams.join(", ")
	sqlQuery += " WHERE isbn=?;"
	queryValues.push(idBook)
    return [sqlQuery, queryValues]
}