import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  readUser:any;
  successMsg:any;
  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
   this.getAllData();
   
  }

  getAllData(){
    this.apiService.getUser().subscribe((res:any)=>{
      console.log('get user data',res);
      this.readUser=res.data;
    })
  }

  DeleteData(id:any){
  //console.log(id,"selected id")
    this.apiService.deleteUser(id).subscribe((res:any)=>{
    console.log(res,"deleted id successfully..!");
    this.successMsg=res.massage;
    this.getAllData();
  })
  
  }

  

}
