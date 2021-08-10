import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {

  constructor(public orderService:OrderService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if (form=null)
    form.resetForm();
    this.orderService.formData ={
      orderId: null,
      orderNo:Math.floor(100000+Math.random()*900000).toString(),
      customerId:0,
      pMethod:'',
      gTotal:0
    };
    this.orderService.orderItems=[];
  }
  AddOrEditOrderItem(orderItemIndex, orderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    dialogConfig.data = {orderItemIndex, orderId}
    this.dialog.open(OrderItemComponent,dialogConfig);
  }

  onDeleteOrderItem(orderItemId: number,i:number){
    this.orderService.orderItems.splice(i,1);
  }
}
