import { Order } from "./order.model"

export class Customer {
  customerId: number
  name: string
  orders: Order[]
}
