import { makeSqlUpdateQuery } from "../../services/library/bookService"
import { Query } from "../query"
import { removeAllWithBook } from "./authorBook"

export interface book {
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
    return await Query(`INSERT INTO book VALUES (?,?,?,?,?)`, 
		[newBook.isbn, newBook.title, newBook.pages, newBook.published, newBook.image])
}
async function getOne(idBook: string) {
    return await Query<book>("SELECT * FROM book WHERE isbn=?;", idBook)
}
async function updateOne(idBook: string, updatedBook: any) {
	let sqlQueryVal = makeSqlUpdateQuery(updatedBook, idBook)
	if (sqlQueryVal[0] === 0) return {status: 400, message: "No fields were provided. Please ensure you include one of the fields: title, pages, published and image."}
    return await Query<book>(sqlQueryVal[0], sqlQueryVal[1])
}
async function removeOne(idBook: string) {
	await removeAllWithBook(idBook)
    return await Query<book>("DELETE FROM book WHERE isbn=?;", idBook)
}
export {
    getAll,
	createOne,
	getOne,
	updateOne,
	removeOne
}