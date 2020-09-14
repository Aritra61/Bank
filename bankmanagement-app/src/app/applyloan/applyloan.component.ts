import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { ApplyLoanService } from '../apply-loan.service';
import { filter, map } from 'rxjs/operators';
import { LoginService } from '../login.service';
import { MatCardModule } from '@angular/material/card';
import { Customer } from '../customer';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.css']
})
export class ApplyloanComponent implements OnInit {
  minDate: Date;
  response: any;
  roi: any;
  initialDeposit: number;
  accountHolderName: string;
  id: string;
  customer: Customer;

  constructor(private loanService: ApplyLoanService, private loginService: LoginService,private route: ActivatedRoute, private router: Router) {

    this.minDate = new Date();

  }

  ngOnInit(): void {



    //console.log(this.response);
    //this.display();
    //this.getInterestRates("personal");
    //console.log(this.roi);
    
    this.id = this.route.snapshot.params['id'];
    console.log('Id value:'+this.id);
    this.customer = this.loginService.getCustomerById(this.id);

    // this.accountHolderName = this.loginService.getAccountHolderName();
    // this.initialDeposit = this.loginService.getInitialDeposit();
    this.accountHolderName=this.customer.name;
    this.initialDeposit=this.customer.initialDepositAmount;
    console.log(this.initialDeposit);
    console.log(this.accountHolderName);

  }

  display() {
    console.log(this.response);

  }

  async getInterestRates(loanType: string) {
    await this.loanService.getInterestRates().toPromise().then(data => {
      this.response = data
    });

    this.roi = this.response.find(e => e.type == loanType).rate;
    //console.log(this.roi);

  }

  form = new FormGroup({
    'loanType': new FormControl('', Validators.required),
    'loanAmount': new FormControl('', Validators.required),
    'rateOfInterest': new FormControl({ value: '', disabled: true }, Validators.required),
    'loanDuration': new FormControl('', Validators.required),
    'applyDate': new FormControl('',),
    'issueDate': new FormControl('', []),
    'courseFee': new FormControl('',),
    'courseName': new FormControl('',),
    'annualIncome': new FormControl('',),
    'companyName': new FormControl('',),
    'fatherName': new FormControl('',),
    'occupation': new FormControl('',),
    'designation': new FormControl('',),
    'ytotalExperience': new FormControl('',),
    'yexperiencewithCurrentCompany': new FormControl('',),
    'totalExperience': new FormControl('',),
    'experiencewithCurrentCompany': new FormControl('',),
    'rationCard': new FormControl('',)
    //'picker':new FormControl('',Validators.required)
  });
  
  

  submit() {

    let formValue = { ...this.form.value };

    //   for (let prop in formValue) {
    //   if (!formValue[prop]) {
    //     delete formValue[prop];
    //   }
    // }
    console.log(formValue);
    console.log(this.form.valid);
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    this.generateAlert();

  }

  onOptionsSelected(loan: string) {
    this.getInterestRates(loan);
    this.form.get('loanType').setValue(loan);
  }

  generateAlert() {
    alert('Your ' + this.form.controls.loanType.value + ' loan request successfuly sent for verification,transaction id:' + 'BMS' + Math.random().toString(36).substr(2, 9));
  }
}
