import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/usermodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = `http://localhost:3000/enquiry`;
  constructor(private http:HttpClient) { }
  
  PostRegistration(registerObj:User){
    return this.http.post<User>(`${this.baseUrl}`,registerObj)
  }

  getRegistredUser(){
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  updateRegisterUser(registerObj:User, id:number){
    return this.http.put<User>(`${this.baseUrl}/${id}`,registerObj)
  }

  deleteUser(id:number){
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }

  getRegistredUserId(id:number){
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

}
