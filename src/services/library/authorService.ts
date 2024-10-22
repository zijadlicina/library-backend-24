import crypto from "crypto"
import { author } from "../../db/library/authors";

export function generateRandomID(bytes: number): string{
    return crypto.randomBytes(bytes).toString('hex');
}
export function makeSqlUpdateQuery(updatedAuthor: author, idAuthor: string): any[]{
    let sqlQuery: string = "UPDATE author SET ";
	let queryParams = [];
	let queryValues: any[] = [];
	if (updatedAuthor.firstName) {
		queryParams.push("firstName = ?") 
		queryValues.push(updatedAuthor.firstName) 
	}
	if (updatedAuthor.lastName) {
		queryParams.push("lastName = ?")
		queryValues.push(updatedAuthor.lastName) 
	}
	if (updatedAuthor.dob) {
		queryParams.push("dob = ?")
		queryValues.push(updatedAuthor.dob) 
	}
	if (updatedAuthor.image) {
		queryParams.push("image = ?")
		queryValues.push(updatedAuthor.image) 
	}
    if (queryParams.length === 0) return [0, 0]
	sqlQuery += queryParams.join(", ")
	sqlQuery += " WHERE guid=?;"
	queryValues.push(idAuthor)
    return [sqlQuery, queryValues]
}