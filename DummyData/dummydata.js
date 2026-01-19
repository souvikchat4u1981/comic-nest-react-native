import Books from "../models/books";
import PurchasedBooks from "../models/purchasedBooks";

export const BOOKS = [
    new Books("1", "Batman and Two Face", "cover1", "cover1", "Author 1", "Action Comics", "Language 1", "Description 1", 10, 5, true, 20, "Publisher 1", "2022-01-01", "Edition 1", "sample.pdf", "image1", "pdf"),
    new Books("2", "Black Spidey", "cover2", "cover2", "Author 2", "Action Comics", "Language 2", "Description 2", 15, 7, true, 200, "Publisher 2", "2022-01-02", "Edition 2", "sample.pdf", "image1", "pdf"),
    new Books("3", "Avenger Assemble", "cover3", "cover3", "Author 3", "Graphics Novel", "Language 3", "Description 3", 20, 10, false, 300, "Publisher 3", "2022-01-03", "Edition 3", "sample.pdf", "image1", "pdf"),
    new Books("4", "Book4", "cover4", "cover4", "Author 4", "Graphics Novel", "Language 4", "Description 4", 25, 12, true, 400, "Publisher 4", "2022-01-04", "Edition 4", "sample.pdf", "image1", "pdf"),
    new Books("5", "Book5", "cover5", "cover5", "Author 5", "Graphics Novel", "Language 5", "Description 5", 30, 15, true, 500, "Publisher 5", "2022-01-05", "Edition 5", "sample.pdf", "image1", "pdf"),
    new Books("6", "Book6", "cover6", "cover6", "Author 6", "Graphics Novel", "Language 6", "Description 6", 35, 18, true, 600, "Publisher 6", "2022-01-06", "Edition 6", "sample.pdf", "image1", "pdf"),
    new Books("7", "Book7", "cover7", "cover7", "Author 7", "Thriller Comics", "Language 7", "Description 7", 40, 20, true, 700, "Publisher 7", "2022-01-07", "Edition 7", "sample.pdf", "image1", "pdf"),
    new Books("8", "Book8", "cover8", "cover8", "Author 8", "Thriller Comics", "Language 8", "Description 8", 45, 25, true, 800, "Publisher 8", "2022-01-08", "Edition 8", "sample.pdf", "image1", "epub"),
    new Books("9", "Book9", "cover9", "cover9", "Author 9", "Historial", "Language 9", "Description 9", 50, 30, true, 900, "Publisher 9", "2022-01-09", "Edition 9", "sample.pdf", "image1", "epub"),
    new Books("10", "Book10", "cover10", "cover10", "Author 10", "Historial", "Language 10", "Description 10", 55, 35, true, 1000, "Publisher 10", "2022-01-10", "Edition 10", "sample.pdf", "image1", "epub"),
]

export const PURCHASED_BOOKS = [
    new PurchasedBooks("1", "1", "2022-01-01", "Purchase", "2022-01-01", "10", "Active"),
    new PurchasedBooks("2", "2", "2022-01-02", "Rent", "2022-01-02", "0", "Active"),
    new PurchasedBooks("3", "3", "2022-01-03", "Purchase", "2022-01-03", "0", "Active"),
    new PurchasedBooks("4", "4", "2022-01-04", "Purchase", "2022-01-04", "0", "Active"),
    new PurchasedBooks("5", "5", "2022-01-05", "Purchase", "2022-01-05", "0", "Active"),
]