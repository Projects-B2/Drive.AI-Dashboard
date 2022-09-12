import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  registerError: any;
  alreadyExists: boolean;
  
  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router, private route: ActivatedRoute) {
    this.registerError = "";
    this.alreadyExists = false;
    this.userForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
      password: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email]]
    })
   
  }

  

  ngOnInit(): void {
     
  }

  register(form: FormGroup)
  {
    console.log(this.userForm.valid);
    console.log(this.userForm.value);
    this.registerService.register(this.userForm.value.name, this.userForm.value.password, this.userForm.value.email).subscribe((data : any) => {
      var message = data["message"];
      if(message == "Success!"){
        console.log("Success");
        this.router.navigate(['/']);
      }
      else
      {
        this.registerError = message;
        this.alreadyExists = true;
        console.log(message);
      }

    } );

  }

}

