import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/sharedservice.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  formValue!: FormGroup
  filteredStudentData: any[];
  roll: number;
  name: string;
  Student: any[];
  errorText: string;
  
  constructor(private api: ApiService,private router:Router,private sharedservice:SharedService) { }

  ngOnInit(): void {
    this.filteredStudentData = []
    this.Student = []
    this.getAllData()
  }

  //GET method
  getAllData() {
    this.api.getAllStudents().subscribe(res => {
      console.log(typeof (res));

      this.filteredStudentData.push(...res)

    })
  }

  SearchData() {
  
    console.log(this.filteredStudentData)
    this.Student = []
    this.errorText=undefined
    
    if (this.filteredStudentData.find(data => data.rollno === this.roll && data.name === this.name)) {

     this.Student.push(this.filteredStudentData.find(data => data.rollno === this.roll && data.name === this.name))
      console.log(this.Student)
      const result = this.Student;
      this.sharedservice.sharedArray = result;
    }
    else
    {
      this.errorText="Wrong Details !!!!";
      console.log("Wrong Details!!!");
    }
    this.router.navigate(['/app-result']);
  }
}
