import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/customer.model';
import { CustomerService } from 'src/app/shared/customer.service';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {

  customerList: Customer[];
  isValid: boolean = true;

  constructor(public orderService: OrderService,
    public dialog: MatDialog,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.resetForm();

    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[])
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.orderService.formData = {
      orderId: null,
      orderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      customerId: 0,
      pMethod: '',
      gTotal: 0
    };
    this.orderService.orderItems = [];
  }
  AddOrEditOrderItem(orderItemIndex, orderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, orderId }
    this.dialog.open(OrderItemComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }

  onDeleteOrderItem(orderItemId: number, i: number) {
    this.orderService.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.orderService.formData.gTotal = this.orderService.orderItems.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);
    this.orderService.formData.gTotal = parseFloat(this.orderService.formData.gTotal.toFixed(2));

  }

  validateForm() {
    this.isValid = true;
    if (this.orderService.formData.customerId == 0)
      this.isValid = false;
    else if (this.orderService.orderItems.length == 0)
      this.isValid = false;
    return this.isValid;

  }

  onSubmit(form:NgForm){
    if(this.validateForm())
    {

    }
  }
}
