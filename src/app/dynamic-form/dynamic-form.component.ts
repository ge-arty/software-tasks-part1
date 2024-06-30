import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { dateRangeValidator } from '../validators.ts/dataRangeValidator';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.jobForm = this.fb.group({
      companyName: ['', Validators.required],
      companyWebsite: [
        '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      companyDescription: [''],
      positions: this.fb.array([this.createPosition()]),
    });
  }

  get positions(): FormArray {
    return this.jobForm.get('positions') as FormArray;
  }

  createPosition(): FormGroup {
    return this.fb.group(
      {
        positionName: ['', Validators.required],
        positionLevel: ['', Validators.required],
        positionDescription: [''],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      },
      { validators: dateRangeValidator }
    );
  }

  addPosition() {
    this.positions.push(this.createPosition());
  }

  removePosition(index: number) {
    this.positions.removeAt(index);
  }

  onSubmit() {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
    }
  }
}
