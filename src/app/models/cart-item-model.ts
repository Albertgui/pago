import { Products } from "./products";

export class CartItemModel {

  productId: number;
  productName: string;
  productPrice: number;
  qty: number;

  constructor(product: Products) {

    this.productId = product.id;
    this.productName = product.name;
    this.productPrice = product.price;
    this.qty = 1;

  }

}
