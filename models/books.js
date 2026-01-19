class Books {
    constructor(bookid, bookname, bookimage, thumbnailImage, author, genere, language, bookdescription, purchasePrice, rentPrice, isRentAvailable, pageCount, publisher, publishingDate, edition, booklink, imagesfolder, booktype) {
        this.bookid = bookid;
        this.bookname = bookname;
        this.bookimage = bookimage;
        this.thumbnailImage = thumbnailImage;
        this.author = author;
        this.genere = genere;
        this.language = language;
        this.bookdescription = bookdescription;
        this.purchasePrice = purchasePrice;
        this.rentPrice = rentPrice;
        this.isRentAvailable = isRentAvailable;
        this.pageCount = pageCount;
        this.publisher = publisher;
        this.publishingDate = publishingDate;
        this.edition = edition;
        this.booklink = booklink;
        this.imagesfolder = imagesfolder;
        this.booktype = booktype;
    }
}

export default Books;