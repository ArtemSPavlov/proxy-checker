import { AddDialogService } from './add-dialog-window.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/types/user.type';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { userResponseError } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-add-dialog-window',
  templateUrl: './add-dialog-window.component.html',
  styleUrls: ['./add-dialog-window.component.scss']
})
export class AddDialogWindowComponent {

  public form: FormGroup;
  public error: any;
  public error_messages = {
    'login': [
      { type: 'required', message: 'First Name is required.' },
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' }
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'passwordNotMatch', message: '!passwordConfirmed' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'passwordNotMatch', message: '!passwordConfirmed' }
    ],
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private addDialogService: AddDialogService,
    private store: Store<IAppState>
    ) {
      this.store.pipe(select(userResponseError)).subscribe(
        data => {
          this.error = data
        }
      );
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // this.product = products[+params.get('productId')];
    });

    this.form = this.formBuilder.group({
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    }, {
      validators: this.passwordConfirmed.bind(this)
    });
  }

  onFormChange(): void {
    this.error = '';
    console.log('Form control: ', this.form);
  }

  login(): void {
    this.addDialogService.singIn(this.form.value);
  }

  passwordConfirmed(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
