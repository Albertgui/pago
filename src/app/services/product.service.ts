import { Injectable, OnInit } from '@angular/core';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{

  products: Products[] = [

    new Products(1, 'Dead Space', 'Un clásico de terror de ciencia ficción vuelve totalmente reconstruido desde cero con fidelidad visual elevada y audio atmosférico 3D.', 72.54, 'https://m.media-amazon.com/images/I/61eRp4xzR1L._AC_.jpg'),
    new Products(2, 'God of War Ragnarök', 'Siente tu viaje a través de los reinos nórdicos, hecho posible por una retroalimentación háptica inmersiva y la funcionalidad de disparo adaptable.', 51.84, 'https://m.media-amazon.com/images/I/817y77i7EFL._SL1500_.jpg'),
    new Products(3, 'The Last of Us Part I', 'En una civilización devastada, Joel, un protagonista cansado, es contratado para contrabandear a Ellie de 14 años de una zona de cuarentena militar.', 76.70, 'https://m.media-amazon.com/images/I/81l41iKPF3L._SL1500_.jpg'),
    new Products(4, 'Elden Ring', 'Es un juego de acción de fantasía y el juego más grande de FromSoftware hasta la fecha, situado dentro de un mundo lleno de misterio y peligro.', 41.29, 'https://m.media-amazon.com/images/I/71ApMdd+7bL._SL1361_.jpg')

  ];

  constructor() { }

  getProducts(): Products[]{
    return this.products;
  }

  ngOnInit(): void {

  }

}
