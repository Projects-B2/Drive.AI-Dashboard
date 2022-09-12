import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  incorrectCred: boolean;
  userForm: FormGroup;
  loginError: string;
  
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
    this.incorrectCred = false;
    this.loginError = "";
    this.userForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
      password: ['',[Validators.required, Validators.minLength(5)]]
    })
   
  }

  

  ngOnInit(): void {
     
  }

  login(form: FormGroup)
  {
    console.log(this.userForm.valid);
    console.log(this.userForm.value.name);
    this.loginService.login(this.userForm.value.name, this.userForm.value.password).subscribe((data: any) => {
      var message = data["message"];
      if(message == "Success!"){
        localStorage.setItem('user', this.userForm.value.name);
        console.log("Success");
        this.router.navigate(['training']);
      }
      else
      {
        this.loginError = message;
        this.incorrectCred = true;
        console.log(message);
      }

    } );

  }

}
