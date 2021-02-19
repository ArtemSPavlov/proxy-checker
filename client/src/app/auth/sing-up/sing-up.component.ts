import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SingUpService } from './sing-up.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  form: FormGroup;
  response: any;
  error: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private singUpService: SingUpService
    ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: '',
      email: '',
      password: '',
    })
  }

  submitForm(): void {
      if(this.form.status === "VALID"){
        this.singUpService.createUser(this.form.value)
          .then(this.response)
          .catch(this.error);

        // this.router.navigate(['auth']);
      }
  }

}
