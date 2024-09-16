import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../model/emp';

@Component({
  selector: 'app-local-storage',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.scss']
})
export class LocalStorageComponent {

  employeForm: FormGroup = new FormGroup({});
  employeObj: Employee = new Employee();
  employeeList: Employee[] = [];
  editingIndex: number | null = null;  // Store the index of the employee being edited

  constructor() {
    this.createFrom();

    if (this.isLocalStorageAvailable()) {
      const oldData = localStorage.getItem("empData");
      if (oldData != null) {
        this.employeeList = JSON.parse(oldData);
      }
    }
  }

  createFrom() {
    this.employeForm = new FormGroup({
      empId: new FormControl(null),
      name: new FormControl(''),  // corrected values for each control
      email: new FormControl(''),
      contact: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      address: new FormControl('')
    });
  }

  saveData() {
    if (this.isLocalStorageAvailable()) {
      if (this.editingIndex === null) {
        // Add new employee
        const oldData = localStorage.getItem("empData");
        if (oldData != null) {
          const parseData = JSON.parse(oldData);
          this.employeForm.controls['empId'].setValue(parseData.length + 1);
          this.employeeList = parseData;
        } else {
          this.employeForm.controls['empId'].setValue(1);
        }

        this.employeeList.unshift(this.employeForm.value);
      } else {
        // Update existing employee
        this.employeeList[this.editingIndex] = this.employeForm.value;
        this.editingIndex = null;
      }

      localStorage.setItem("empData", JSON.stringify(this.employeeList));
      this.employeForm.reset();
    }
  }

  editData(employee: Employee) {
    this.employeForm.patchValue(employee);
    this.editingIndex = this.employeeList.indexOf(employee); // Set the index for editing
  }

  removeData(index: number) {
    this.employeeList.splice(index, 1);
    localStorage.setItem("empData", JSON.stringify(this.employeeList)); // Update local storage
  }

  isLocalStorageAvailable(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }
}
