import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { datamodel } from './model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employeeform: any;
  data:datamodel[] | undefined;
  datamodel!: datamodel;




  
 
  constructor(private formbuilder: FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.employeeform = this.formbuilder.group({

      employeeid: ['', [Validators.required,Validators.maxLength(10),Validators.max(9999999999)]],
      name: ['', [Validators.required,Validators.maxLength(50)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern("[a-z]+[0-9]+[@]+[a-z]+[.]+[a-z]+"),Validators.maxLength(50)]],
      phonenumber: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.min(1000000000),Validators.max(999999999999)]],
      salary: ['', [Validators.required,Validators.maxLength(6)]],
      gender: ['', Validators.required],

    })
    this.getemployee();
}


get employeeid(){
  return this.employeeform.get('employeeid')
}

get name(){
  return this.employeeform.get('name')
}

get dob(){
  return this.employeeform.get('dob')
}
get email(){
  return this.employeeform.get('email')
}
get phonenumber(){
  return this.employeeform.get('phonenumber')
}
get salary(){
  return this.employeeform.get('salary')
}
get gender(){
  return this.employeeform.get('gender')
}
addemployee(data:datamodel){
  console.log(data)
  this.api.addemployee(data).subscribe((res=>{
      this.employeeform.reset();
  }))
  this.getemployee();
}

getemployee(){
  this.api.getemployee().subscribe(res=>{
    this.data=res;
  })
}

delete(id:number){
  this.api.deleteemployee(id).subscribe(res=>{
    this.datamodel=res;
  })
   this.getemployee();
}



}
