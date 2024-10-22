import { Query } from "../query"
import { type book, createOne as createBook, getOne as getBook} from "./books"
import { type author, createOne as createAuthor, getOne as getAuthor } from "./authors"
import { generateRandomID } from "../../services/library/authorService"

export interface authorBook {
	id: string,
    author_guid: string,
    book_isbn: string
}
async function fetchAuthorsForBook(idBook: string) {
    let book = await getBook(idBook)
    if (book.length === 0) return null;
    return await Query<author[]>
	("SELECT a.guid, a.firstName, a.lastName, a.dob, a.image FROM author a "
	+"JOIN author_book ab ON ab.author_guid = a.guid JOIN book b ON ab.book_isbn = b.isbn "
	+"WHERE b.isbn=?;", idBook)
}
async function fetchBooksForAuthor(idAuthor: string) {
    let author = await getAuthor(idAuthor)
    if (author.length === 0) return null;
    return await Query<book[]>
	("SELECT b.isbn, b.title, b.pages, b.published, b.image FROM book b "
	+"JOIN author_book ab ON ab.book_isbn=b.isbn JOIN author a ON ab.author_guid = a.guid "
	+"WHERE a.guid=?;", idAuthor)
}
async function createBookAttachToAuthor(newBook: book, idAuthor: string) {
    let author = await getAuthor(idAuthor)
    if (author.length === 0) return null;
    await createBook(newBook)
    let authorBookId = generateRandomID(16)
    return await Query<authorBook[]>("INSERT INTO author_book VALUES (?,?,?);", [authorBookId, idAuthor, newBook.isbn])
}
async function createAuthorAttachToBook(newAuthor: author, idBook: string) {
    let book = await getBook(idBook)
    if (book.length === 0) return null;
    await createAuthor(newAuthor)
    let authorBookId = generateRandomID(16)
    return await Query<authorBook[]>("INSERT INTO author_book VALUES (?,?,?);", [authorBookId, newAuthor.guid, idBook])
}
async function removeAuthorFromBook(idAuthor: string, idBook: string) {
    let book = await getBook(idBook)
    let author = await getAuthor(idAuthor)
    if (book.length === 0 || author.length === 0) return null;
    return await Query("DELETE FROM author_book WHERE author_guid=? AND book_isbn=?", [idAuthor, idBook])
}
async function removeAllWithBook(idBook: string) {
    return await Query("DELETE FROM author_book WHERE book_isbn=?", [idBook])
}
async function removeAllWithAuthor(idAuthor: string) {
    return await Query("DELETE FROM author_book WHERE author_guid=?", [idAuthor])
}
export {
    fetchAuthorsForBook,
	fetchBooksForAuthor,
	createBookAttachToAuthor,
    createAuthorAttachToBook,
    removeAuthorFromBook,
    removeAllWithBook,
    removeAllWithAuthor
}