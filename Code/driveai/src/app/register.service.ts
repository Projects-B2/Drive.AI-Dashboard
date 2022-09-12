import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = "/api/"

  constructor(private http: HttpClient) { }
  register(username: string, password: string, email: string) {
    return this.http.post(this.apiUrl+`insert/`, { "name": username, "password": password, 'email': email });
}

}
