import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarModel } from './_model/CarModel';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_crud_local_storage';
  car: CarModel = new CarModel()
  carList: CarModel[] = []
  carForm: FormGroup = new FormGroup({})
   //load data from storage when page is loaded
   constructor(){
    this.createForm()
    const oldData = localStorage.getItem("CarData")
    //check to see if local storage is not empty
    if(oldData != null){
      //convert data to string format
      const parsedData = JSON.parse(oldData)
      this.carList = parsedData
  }
}
  createForm(){
    this.carForm = new FormGroup({
      carId: new FormControl(this.car.carId),
      ownerName: new FormControl(this.car.ownerName, [Validators.required]),
      make: new FormControl(this.car.make,[Validators.required]),
      model: new FormControl(this.car.model),
      year: new FormControl(this.car.year),
      color: new FormControl(this.car.color),
      mileage: new FormControl(this.car.mileage, [Validators.maxLength(6)])
    })
  }
 

  onSave(){
    const oldData = localStorage.getItem("CarData")
    //check to see if local storage is not empty
    if(oldData != null){
      //convert data to string format
      const parsedData = JSON.parse(oldData)
      //generate an id
      this.carForm.controls['carId'].setValue(parsedData.length + 1)
      this.carList.unshift(this.carForm.value)
    }
    else{
      this.carList.unshift(this.carForm.value)
    }
    //save the data to the local storage
    localStorage.setItem("CarData", JSON.stringify(this.carList))
    this.car = new CarModel()
    this.createForm()
  }

  onEdit(item: CarModel){
    this.car = item
    this.createForm()
  }

  onUpdate(){
    const record = this.carList.find(n => n.carId == this.carForm.controls['carId'].value)
    if(record != undefined){
      record.ownerName = this.carForm.controls['ownerName'].value
      record.make = this.carForm.controls['make'].value
      record.model = this.carForm.controls['model'].value
      record.color = this.carForm.controls['color'].value
      record.year = this.carForm.controls['year'].value
      record.mileage = this.carForm.controls['mileage'].value
    }
    localStorage.setItem("CarData", JSON.stringify(this.carList))
    this.car = new CarModel()
    this.createForm()
  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure want to delete?")
    if(isDelete){
      const index = this.carList.findIndex(n => n.carId == id)
      this.carList.splice(index, 1)
      localStorage.setItem("CarData", JSON.stringify(this.carList))
    }
  }

  onReset(){
    this.car = new CarModel()
    this.createForm()
  }
}
