class PurchasedBooks {
    constructor(purchaseid, bookid, purchasedate, purchasetype, expirydate, readpagecount, status) {
        this.purchaseid = purchaseid;
        this.bookid = bookid;
        this.purchasedate = purchasedate;
        this.purchasetype = purchasetype;
        this.expirydate = expirydate;
        this.readpagecount = readpagecount;
        this.status = status;
    }
}
export default PurchasedBooks;