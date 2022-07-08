import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiUrl = "http://localhost:3000/userRoutes";
  createUrl = "http://localhost:3000/userRoutes";

  constructor( private http:HttpClient ) { }

  //get data
 getUser():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

 //create data
   createUser(data:any):Observable<any>{
   console.log(data,'data created successfully');
   return this.http.post(`${this.createUrl}`,data);
 }

 //delete data
   deleteUser(id:any):Observable<any>{
   let ids=id;
   return this.http.delete(`${this.createUrl} / ${ids}}`);
 }

 //update data
  updateUser(data:any,id:any):Observable<any>{
  let ids=id; 
  return this.http.put(`${this.createUrl} / ${ids}`,data);
 }

 //single update data
   getSingleData(id:any):Observable<any>{
   let ids=id;
   return this.http.get(`${this.createUrl} / ${ids}`);
 }

}
