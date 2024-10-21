import { Query } from "../query"
import crypto from "crypto"

interface author {
	id: string,
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
	console.log("new", newAuthor)
	newAuthor.id = crypto.randomBytes(16).toString('hex');
    return await Query(`INSERT INTO author VALUES (?,?,?,?,?)`, 
		[newAuthor.id, newAuthor.firstName, newAuthor.lastName,new Date(1,1,2001),newAuthor.image])
}
async function getOne(idAuthor: string) {
    return await Query<author>("SELECT * FROM author WHERE guid=?;", idAuthor)
}
async function updateOne(idAuthor: string, updateAuthor: any) {
    return await Query<author>("UPDATE author SET firstName = ?, lastName = ?, dob = ?, image = ? WHERE guid=?;", 
		[updateAuthor.firstName, updateAuthor.lastName, new Date(1,1,2001), updateAuthor.image, idAuthor]
	)
}
async function removeOne(idAuthor: string) {
    return await Query<author>("DELETE FROM author WHERE guid=?;", idAuthor)
}
export {
    getAll,
	createOne,
	getOne,
	updateOne,
	removeOne
}