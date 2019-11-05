import { Component, HostBinding, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { IsButton, IsModalService } from "../../../../lib";
// import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { AdminAuthService } from "app/modules/auth/services/admin-auth.service";
import { IsToasterService, IsToastPosition } from "../../../../lib/toaster";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @HostBinding() class: string =
    "d-flex flex-column col p-0 overflow-y-auto overflow-x-hidden";
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  verifyCodeForm: FormGroup;
  newPasswordForm: FormGroup;
  errorMessage: string;
  unAuthorized: boolean = false;
  emailPhase: boolean = false;
  codePhase: boolean = false;
  passPhase: boolean = false;
  emailVerified: boolean = false;
  email: string = "";

  constructor(
    // private authService: AuthService,
    private authService: AdminAuthService,
    private router: Router,
    private toaster: IsToasterService,
    private isModal: IsModalService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });

    this.verifyCodeForm = new FormGroup({
      vcode: new FormControl(null, [Validators.required])
    });

    this.newPasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  onLoginSubmit(
    form: FormGroup,
    btn: IsButton,
    veirfyTemplate: TemplateRef<any>,
    activeTemplate: TemplateRef<any>
  ) {
    this.unAuthorized = false;
    if (this.loginForm.valid) {
      btn.startLoading();
      let user = this.loginForm.value;
      this.authService.login(user.email, user.password).subscribe(
        res => {
          localStorage.setItem(
            "Authorization",
            `Bearer ${res.access_token}`
          );
          this.toaster.popSuccess("Logged In Successfully", {
            position: IsToastPosition.BottomRight
          });
          btn.stopLoading();
          this.router.navigate(["admin", "dashboard"]);
        },
        err => {
          if (err.status === 401) {
            this.unAuthorized = true;
            btn.stopLoading();
            return;
          }
          if (err.error.indexOf("verified") > -1) {
            this.isModal.open(veirfyTemplate, { data: err.error });
            btn.stopLoading();
            return;
          }

          if (err.error.indexOf("active") > -1) {
            this.isModal.open(activeTemplate, { data: err.error });
            btn.stopLoading();
            return;
          }
        }
      );
    } else {
      return;
    }
  }

  toLoginForm() {
    this.emailPhase = false
    this.codePhase = false 
    this.passPhase = false
  }
  onForgotEmailSubmit(btn: IsButton) {
    if (this.forgotPasswordForm.valid) {
      let temp = this.forgotPasswordForm.value;
      let data = {
        email: temp.email,
        passOrCode: ""
      };
      btn.startLoading();
      this.authService
        .forgotEmailPost(data)
        .subscribe(forgotEmailResponse => {
          this.emailVerified = forgotEmailResponse.data.emailVerified;
          if (this.emailVerified == false) {
            this.unAuthorized = true;
            btn.stopLoading();
          } else {
            this.toaster.popSuccess("Email Verified Successfully. We have Sent You an Email of Verification Code", {
              position: IsToastPosition.BottomRight
            });
            this.unAuthorized = false;
            this.emailPhase = false
            this.codePhase = true
            btn.stopLoading();
            this.email = data.email;
            this.forgotPasswordForm.reset();
          }
        });
    }
  }

  onVerifyCodeFormSubmit(btn: IsButton){
    if (this.verifyCodeForm.valid) {
      btn.startLoading();
      let temp = this.verifyCodeForm.value;
      let data = {
        email: this.email,
        passOrCode: temp.vcode
      };
      this.authService
        .forgotVerifyCodePost(data)
        .subscribe(forgotCodeResponse => {
          this.emailVerified = forgotCodeResponse.data.emailVerified;
          if (this.emailVerified == false) {
            this.unAuthorized = true;
            btn.stopLoading();
          } else {
            this.toaster.popSuccess("Code Verified Successfully. Please Set Your New Password", {
              position: IsToastPosition.BottomRight
            });
            this.codePhase = false
            this.passPhase = true
            btn.stopLoading();
            this.email = data.email;
            this.verifyCodeForm.reset();
          }
        });
    }

  }
  onSubmitNewPasswordForm(btn: IsButton) {
    if (this.newPasswordForm.valid && this.newPasswordForm.value.password === this.newPasswordForm.value.confirmPassword) {
      btn.startLoading();
      let temp = this.newPasswordForm.value;
      let data = {
        email: this.email,
        passOrCode: temp.password
      };
      this.authService
        .forgotPasswordPost(data)
        .subscribe(forgotPassResponse => {
          this.emailVerified = false;
          this.emailPhase = false
          this.codePhase = false
          this.passPhase = false
          this.newPasswordForm.reset();
          btn.stopLoading();
        });
    }
  }
}
