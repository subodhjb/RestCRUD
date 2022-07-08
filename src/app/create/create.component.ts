import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormGroup,Validators, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  //userForm!:FormGroup;
  errMsg:any;
  successMsg:any;
  getparamid:any;

  constructor( private apiService:ApiServiceService, private route:ActivatedRoute ) { }

  ngOnInit(): void {
  
    this.getparamid = this.route.snapshot.paramMap.get('id');

  if(this.getparamid){
      this.apiService.getSingleData(this.getparamid).subscribe((res:any)=>{
      console.log(res,'selected updated data');
      this.userForm.patchValue({
        name:res.data[0].name,
        email:res.data[0].email,
        phone:res.data[0].phone
      })
    })
   }
  }

  userForm = new FormGroup({
    'name' : new FormControl('',Validators.required),
    'email': new FormControl('',Validators.required),
    'phone': new FormControl('',Validators.required)
  });


  userSubmit(){
      //console.log(this.userForm.value);
      if(this.userForm.value){
      console.log(this.userForm.value);
      this.apiService.createUser(this.userForm.value).subscribe((res:any)=>{
      console.log(res,'data added successfully');
      this.userForm.reset();
      this.successMsg = res.massage;
        })
      }
      else{
        this.errMsg="All filds are required";
      }
  }

  

  update(){
   //console.log(this.userForm.value)
   if(this.userForm.valid){
    this.apiService.updateUser(this.userForm.value,this.getparamid).subscribe((res:any)=>{
      console.log(res,'data updated successfully');
      this.successMsg = res.massage;
      this.userForm.reset();
    })
    
  } else{
    this.errMsg='all filed required';
  }
  }

}
