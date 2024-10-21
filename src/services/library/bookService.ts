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