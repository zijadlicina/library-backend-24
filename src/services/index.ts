export * as authorService from "./library/authorService"
export * as bookService from "./library/bookService"

export function isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}