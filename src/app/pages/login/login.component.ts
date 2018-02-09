import { Router } from '@angular/router';
import { Character } from './../../interfaces/model';
import { RESPONSE_STATUS } from './../../common/constants';
import { HelperService } from './../../services/helper.service';
import { ApiService } from './../../services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ElementRef } from '@angular/core';
import { NOTIFICATION_PLACES, LOCALSTORE_KEY } from 'app/common/constants';

declare var $: any;

@Component({
  selector: 'app-login-cmp',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  formLogin: FormGroup;

  constructor(
    private element: ElementRef,
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService,
    private router: Router,
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);

    this.formLogin = this.renderFormLogin();
  }

  renderFormLogin() {
    return this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(4)]],
      Password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login() {
    if (this.formLogin.valid) {
      this.helperService.showLoading();
      let that = this;
      $.getJSON('//freegeoip.net/json/?callback=?', function (result) {
        let params = {
          account: that.formLogin.value.UserName,
          pass: that.formLogin.value.Password,
          ip: result.ip
        }

        that.apiService.postNoHeader('login', params).subscribe(res => {
          console.log(res);
          if (res.status === RESPONSE_STATUS.SUCCESS) {
            sessionStorage.setItem(LOCALSTORE_KEY.ACCOUNT, JSON.stringify(res.data));

            new Promise((resolve, reject) => {
              Promise.all([
                that.apiService.getBankInfo(res.data.memb___id),
                that.apiService.getInfoCharacter(res.data.memb___id)
              ]).then(
                ([bankInfo, charInfo]) => {
                  console.log(bankInfo);
                  let chars: Character[];
                  chars = charInfo.data;

                  console.log(chars);
                  that.router.navigate(['/dashboard']);
                  that.helperService.hideLoading();
                });
            });
          } else {
            that.helperService.hideLoading();
          }
          // that.helperService.showNotification(NOTIFICATION_PLACES.BOTTOM, NOTIFICATION_PLACES.RIGHT, res.status, res.message);
        });
      });
    } else {
      this.validateAllFormFields(this.formLogin);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
}
