import { OrderItem } from "./order-item.model"

export class Item {
  itemId: number
  name: string
  price: number
  orderItems: OrderItem[]
}
