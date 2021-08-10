import { Item } from "./item.model";
import { Order } from "./order.model";

export class OrderItem {
  orderItemId:number;
  orderId:number;
  itemId:number;
  quantity:number;
  itemName: string;
  price: number;
  total: number;
}
