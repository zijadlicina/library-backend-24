import { bookService } from "../../services"
import { Query } from "../query"
import crypto from "crypto"

interface book {
	isbn: string,       // International Standard Book Number (unique)
	title: string,      
	pages: Number,      // Total page numbers
	published: Number,  // Year of publication
	authors: []         // Zero, one or multiple authors,
	image: String       // URL of image
}

async function getAll() {
    return await Query<book[]>("SELECT * FROM book;")
}
async function createOne(newBook: book) {
	newBook.isbn = bookService.generateRandomISBN13()
    return await Query(`INSERT INTO book VALUES (?,?,?,?,?)`, 
		[newBook.isbn, newBook.title, newBook.pages, newBook.published, newBook.image])
}
async function getOne(idBook: string) {
    return await Query<book>("SELECT * FROM book WHERE isbn=?;", idBook)
}
async function updateOne(idBook: string, updateBook: any) {
    return await Query<book>("UPDATE book SET title = ?, pages = ?, published = ?, image = ? WHERE isbn=?;", 
		[updateBook.title, updateBook.pages, updateBook.published, updateBook.image, idBook]
	)
}
async function removeOne(idBook: string) {
    return await Query<book>("DELETE FROM book WHERE isbn=?;", idBook)
}
export {
    getAll,
	createOne,
	getOne,
	updateOne,
	removeOne
}