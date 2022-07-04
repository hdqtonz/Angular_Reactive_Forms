import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  enterValueChange: any;

  constructor(private fb: FormBuilder) {
    //--------------Simple reactive forms---------------//
    // this.checkoutForm = this.fb.group({
    //   email: new FormControl(),
    //   quentity: new FormControl(),
    //   terms: new FormControl(),
    // });

    // -------- Reactive Form Validation using Validators---------//
    this.checkoutForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(8)],
      ],
      quentity: [null, Validators.required],
      terms: ['', Validators.requiredTrue],
      items: this.fb.array([
        //** implementing New FormArray***/
        this.fb.group({
          itemId: [1],
          itemName: [''],
          itemDesc: [''],
          itemDone: ['', Validators.requiredTrue],
        }),
      ]),
    });

    // --------Simple Form Array-------//
    //   this.checkoutForm = this.fb.group({
    //     email: [null, [Validators.required, Validators.email]],
    //     quentity: [null, Validators.required],
    //     terms: [null, Validators.requiredTrue],
    //     items: this.fb.array([new FormControl(''), new FormControl('')]),
    //   });
  }

  ngOnInit(): void {
    //---------- Status Changes on form control ---------------//
    // this.checkoutForm.get('email')?.statusChanges.subscribe((res) => {
    //   console.log(res);
    // });
    //** we can capture the validation state like 'entire form' INVALID/VALID **/
    // this.checkoutForm.statusChanges.subscribe((res) => {
    //   console.log(res);
    // });
    //---------- Value Changes ---------------//
    // this.checkoutForm.get('email')?.valueChanges.subscribe((res) => {
    //   this.enterValueChange = res;
    //   console.log(res);
    // });
    //** whenever there is any change in the form **//
    // this.checkoutForm.valueChanges.subscribe((res) => {
    //   console.log(res);
    // });
    // ----------- SetValue in reactive form -------//
    //** */  we need to setting up entire FORM value **//
    // this.checkoutForm.setValue({
    //   email: 'setTest@gmail.com',
    //   quentity: '25',
    //   terms: true,
    // });
    // -------------- patchValue -----------//
    //*  we not need to setting up entire FORM value *//
    // this.checkoutForm.patchValue({
    //   email: 'setTest@gmail.com',
    //   terms: true,
    //   items: [
    //     { itemId: '2', itemName: 'Mayur', itemDesc: 'Kumar', itemDone: true },
    //   ],
    //   // items: ['50', '55'],
    // });
  }

  //--------------- Get Controls ----------------//
  get itemsFromArray() {
    //---You can use any method for to get controls----//

    return this.checkoutForm.get('items') as FormArray; // You need to give .controls in ngFor
    // return (<FormArray>this.checkoutForm.get('items')).controls;
  }

  //------------Add item a in Form Array---------------//
  addItem() {
    // const control = new FormControl('', [Validators.required]);
    // (<FormArray>this.checkoutForm.get('items')).push(control);

    const itemId = this.itemsFromArray.length;

    const newItem = this.fb.group({
      itemId: itemId + 1,
      itemName: [''],
      itemDesc: [''],
      itemDone: ['', Validators.requiredTrue],
    });

    (<FormArray>this.itemsFromArray).push(newItem);
  }

  // -----------Reset from value----------//
  resetForm() {
    this.checkoutForm.reset();
  }

  // -----------Form submit button----------//
  submit() {
    console.log(this.checkoutForm);
    console.log(this.checkoutForm.value);
    // console.log(this.checkoutForm.value.email);

    // this.resetForm();
  }

  removeItem(i: any) {
    this.itemsFromArray.controls.splice(i, 1);
    console.log('item removed');
  }
}
