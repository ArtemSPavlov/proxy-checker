import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { userResponseError } from "src/app/store/selectors/user.selectors";
import { IAppState } from "src/app/store/state/app.state";
import { UserService } from "../user.service";
import { PasswordChangeService } from "./password-change.service";

@Component({
    selector: 'password-change',
    templateUrl: './password-change.component.html',
    styleUrls: ['./password-change.component.scss']
  })
  export class PasswordChangeComponent implements OnInit {
    public form: FormGroup;
    public error: any;
    public status: string;

    constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private passwordChangeService: PasswordChangeService,
      private store: Store<IAppState>,
      private userService: UserService,
      ) {
        this.store.pipe(select(userResponseError)).subscribe(
          data => {
            this.error = data
          }
        );
      }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: '',
        password: '',
      });
    }

    onFormChange() {
      this.error = '';
    }

    submit(): void {
      this.passwordChangeService.setRequest(this.form.value).subscribe(
          data => {
              this.status = data;
              setTimeout(() => {
                  this.userService.removeAuthorizedUser();
                  this.router.navigate(['']);
              }, 1000)
            }
      );
    }
}