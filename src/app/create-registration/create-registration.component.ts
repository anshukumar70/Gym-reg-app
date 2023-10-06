import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/usermodel';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})

export class CreateRegistrationComponent {
  public packages = ['Yearly', 'Monthly', 'Weekly']
  public Gender = ['Male', 'Female'];
  public options = ['Yes', 'No'];
  public ImportantList: string[] = [
    'Toxic Fat Reduction',
    'Energy and Endurance',
    'Building Lean  Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness'
  ];
  public registrationForm!: FormGroup;
  public userIdUpdate !: number;
  public isUpdateActive: boolean = false;
  public isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: ToastrService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      FirstName: (''),
      LastName: [''],
      Email: [''],
      Mobile: [''],
      Weight: [''],
      Height: [''],
      Bmi: [''],
      BmiResult: [''],
      trainerOpt: [''],
      Gender: [''],
      packeges: [''],
      ImportantList: [''],
      option: [''],
      Date: ['']

    });
    this.registrationForm.controls['Height'].valueChanges.subscribe(res => {
      this.CalculateBmi(res);
    });


    if (this.activateRoute.params !== undefined) {
      this.activateRoute.params.subscribe(value => {
        this.userIdUpdate = value['id'];
        this.api.getRegistredUserId(this.userIdUpdate).subscribe(res => {

          this.isUpdateActive = true;
          this.fillFormToUpdate(res);
        })
      })
    } else if (this.activateRoute.params !== '') {
      this.router.navigate(['/register'])
    }


  }

  submit() {
    this.api.PostRegistration(this.registrationForm.value).subscribe(res => {
      this.toast.success("Success", 'Enquery Added');
      this.registrationForm.reset();
    })
  }

  update() {
    this.api.updateRegisterUser(this.registrationForm.value, this.userIdUpdate).subscribe(res => {
      this.toast.success("Success", 'Enquery Updated');
      this.registrationForm.reset();
      this.router.navigate(['/list'])
    })
  }

  CalculateBmi(heightValue: number) {
    const weight = this.registrationForm.value.Height;
    const Height = heightValue;
    const bmi = weight / (Height * Height);
    this.registrationForm.controls['Bmi'].patchValue(bmi);

    // if (bmi<18.5) {

    //   this.registrationForm.controls['BmiResult'].patchValue('unederweight')
    // } else {
    //   this.registrationForm.controls['BmiResult'].patchValue('obese')

    // }

    switch (true) {
      case bmi < 18.5:
        console.log(("UnderWeight"))
        this.registrationForm.controls['BmiResult'].patchValue("UnderWeight");
        break;

      case (bmi >= 18.5 && bmi < 25):
        console.log(("Normal"))
        this.registrationForm.controls['BmiResult'].patchValue("Normal");
        break;

      case (bmi >= 25 && bmi < 30):
        console.log(("Overweight"))
        this.registrationForm.controls['BmiResult'].patchValue("Overweight");
        break;

      default:
        console.log(("Obese"))
        this.registrationForm.controls['BmiResult'].patchValue("Obese");
        break;
    }

  }

  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Mobile: user.Mobile,
      Weight: user.Weight,
      Height: user.Height,
      Bmi: user.Bmi,
      BmiResult: user.BmiResult,
      trainerOpt: user.trainerOpt,
      Gender: user.Gender,
      packeges: user.packeges,
      ImportantList: user.ImportantList,
      option: user.option,
      Date: user.Date
    })
  }
}
