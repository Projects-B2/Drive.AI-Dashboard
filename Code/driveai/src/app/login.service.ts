import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = "/api/"

  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    return this.http.post(this.apiUrl+`get_user/`, { "name": username, "password": password });
}

}
