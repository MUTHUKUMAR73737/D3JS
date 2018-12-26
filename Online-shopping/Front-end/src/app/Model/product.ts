export class Product {
  private productID: Number;
  private productName: String;
  private productType: String;
  private productPrice: Number;
  private offer: String;
  private productDiscount: Number;
  private stock: Number;
  private productBrand: String;
  private productColor: String;
  private description: String;
  private imageLocation: Object;
  private specification: Object;

  get _productColor() {
    return this.productColor;
  }

  set _productColor(color) {
    this.productColor = color;
  }

  get _productID() {
    return this.productID;
  }

  set _productID(productID) {
    this.productID = productID;
  }

  get _productName() {
    return this.productName;
  }

  set _productName(productName) {
    this.productName = productName;
  }

  get _productType() {
    return this.productType;
  }

  set _productType(productType) {
    this.productType = productType;
  }

  get _productPrice() {
    return this.productPrice;
  }

  set _productPrice(price) {
    this.productPrice = price;
  }

  get _offer() {
    return this.offer;
  }

  set _offer(offer) {
     this.offer  = offer;
  }

  get _productDiscount() {
    return this.productDiscount;
  }

  set _productDiscount(discount) {
    this.productDiscount = discount;
  }


  get _stock() {
    return this.stock;
  }

  set _stock(stock) {
    this.stock = stock;
  }

  get _productBrand() {
    return this.productBrand;
  }

  set _productBrand(brand) {
    this.productBrand = brand;
  }
  get _description() {
    return this.description;
  }

  set _description(description) {
    this.description = description;
  }

  get _imageLocation() {
    return this.imageLocation;
  }

  set _imageLocation(image) {
    this.imageLocation = image;
  }

  get _specification() {
    return this.specification;
  }

  set _specification(specification) {
    this.specification = specification;
  }

}
