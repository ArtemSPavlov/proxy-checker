import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectSelectedUser, userResponseError } from '../../store/selectors/user.selectors';
import { IAppState } from '../../store/state/app.state';
import { SingInService } from './sing-in.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  public form: FormGroup;
  public error: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private singInService: SingInService,
    private store: Store<IAppState>
    ) {
      // console.log('Route: ', route);
      this.store.pipe(select(userResponseError)).subscribe(
        data => {
          this.error = data
        }
      );
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('Params: ', +params.get('productId'));
      // this.product = products[+params.get('productId')];
    });

    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  onFormChange() {
    this.error = '';
  }

  login(): void {
    this.singInService.singIn(this.form.value);
  }



}
