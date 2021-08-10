import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItem } from 'src/app/shared/order-item.model';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: [
  ]
})
export class OrderItemComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];
  isValid: boolean = true;

  constructor(public dialogRef: MatDialogRef<OrderItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private itemService:ItemService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    if (this.data.orderItemIndex == null)
    this.formData = {
      orderItemId: null,
      orderId: this.data.orderId,
      itemId: 0,
      itemName: '',
      price: 0,
      quantity: 0,
      total: 0
    }
    else
    this.formData = Object.assign({},this.orderService.orderItems[this.data.orderItemIndex]);
  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.price = 0;
      this.formData.itemName = '';
    }
    else {
      this.formData.price = this.itemList[ctrl.selectedIndex - 1].price;
      this.formData.itemName = this.itemList[ctrl.selectedIndex - 1].name;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.total = parseFloat((this.formData.quantity * this.formData.price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null)
        this.orderService.orderItems.push(form.value);
      else
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.itemId == 0)
      this.isValid = false;
    else if (formData.quantity == 0)
      this.isValid = false;
    return this.isValid;
  }

}
