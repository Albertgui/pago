import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { Products } from 'src/app/models/products';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public payPalConfig ?: IPayPalConfig;
  cartItems: any = [];
  total: number = 0;

  constructor(private messageService: MessageService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.initConfig();
    if (this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: environment.clientid,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
              // Pedir el total y convertirlo a string para hacer el check
                amount: {
                    currency_code: 'USD',
                    value: this.getTotal().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.getTotal().toString()
                        }
                    }
                },
              // Pedir la lista de articulos de la función
                items: this.getItemsList()
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point');
            JSON.stringify(data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
  }

  getItem(): void{
    this.messageService.getMessage().subscribe((product: Products) => {
      let x = false;
      this.cartItems.forEach((item: { productId: number; qty: any; }) => {
        if (item.productId === product.id){
          x = true;
          item.qty++;
        }
      });
      if (!x){
        const carrito = new CartItemModel(product);
        this.cartItems.push(carrito);
      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);
    });
  }
  
  // Retornar la lista para totalizar el monto a cobrar
  getItemsList(): any[]{
    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel) => {
      item = {
        name: it.productName,
        quantity: it.qty,
        unit_amount: {value: it.productPrice, currency_code: 'USD'}
      };
      items.push(item);
    });
    return items;
  }

  getTotal(): number{
    let total = 0;
    this.cartItems.forEach((item: { qty: number; productPrice: number; }) => {
      total += item.qty * item.productPrice;
    });
    return +total.toFixed(2);
  }

  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deleteItem(i: number): void {
    if (this.cartItems[i].qty > 1){
      this.cartItems[i].qty--;
    }
    else{
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }
}

