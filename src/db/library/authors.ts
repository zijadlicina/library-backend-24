import { makeSqlUpdateQuery } from "../../services/library/authorService"
import { Query } from "../query"
import { removeAllWithAuthor } from "./authorBook"

export interface author {
	guid: string,
	firstName: String,
	lastName: String,
	dob: Date,  	// date of birth
	books: []       // Zero, one or multiple books,
	image: String   // URL of image
}

async function getAll() {
    return await Query<author[]>("SELECT * FROM author;")
}
async function createOne(newAuthor: author) {
    return await Query(`INSERT INTO author VALUES (?,?,?,?,?)`, 
		[newAuthor.guid, newAuthor.firstName, newAuthor.lastName, newAuthor.dob, newAuthor.image])
}
async function getOne(idAuthor: string) {
    return await Query<author>("SELECT * FROM author WHERE guid=?;", idAuthor)
}
async function updateOne(idAuthor: string, updatedAuthor: any) {
	let sqlQueryVal = makeSqlUpdateQuery(updatedAuthor, idAuthor)
	if (sqlQueryVal[0] === 0) return {status: 400, message: "No fields were provided. Please ensure you include one of the fields: firstName, lastName, dob and image."}
    return await Query<author>(sqlQueryVal[0], sqlQueryVal[1])
}
async function removeOne(idAuthor: string) {
	await removeAllWithAuthor(idAuthor)
    return await Query<author>("DELETE FROM author WHERE guid=?;", idAuthor)
}
export {
    getAll,
	createOne,
	getOne,
	updateOne,
	removeOne
}