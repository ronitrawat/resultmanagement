import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { StudentData } from './student.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  formValue!: FormGroup
  studentModelObj: StudentData = new StudentData;
  allStudentData: any;
  size:number;
  filteredStudentData:any[];
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.filteredStudentData=[]
    this.formValue = this.formBuilder.group({
      rollno: [''],
      name: [''],
      dob: [''],
      score: [''],
      skill: ['']
    })
    this.getAllData();
  }

  //Now Subscribing our Data which is mapped via Services
  //POST method
  addStudent() {
    this.studentModelObj.rollno = this.formValue.value.rollno;
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.dob = this.formValue.value.dob;
    this.studentModelObj.score = this.formValue.value.score;
    this.studentModelObj.skill = this.formValue.value.skill;

    this.api.postStudent(this.studentModelObj).subscribe(res => {
      console.log(res);
      alert("Record Added SuccessFully!!!");
      let ref=document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.getAllData(); //when post method called automatic data is inserted, no need to refresh
    }, err => {
      alert("Something Wrong Occured!!");
    })
  }

  //GET method
  getAllData() {
    this.api.getAllStudents().subscribe(res => {
      this.allStudentData = res;
      this.size=this.allStudentData.length;
      console.log(this.size);
    })
  }

  //DELETE metod
  deleteStudent(data: any) {
    this.api.deleteStudent(data.id).subscribe(res => {
      alert("Record Deleted Successfully!!!");
      this.getAllData();
    })
  }

  //getting data in the edit form
  editStudent(data: any) {
    this.studentModelObj.id = data.id;
    this.formValue.controls['rollno'].setValue(data.rollno);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['dob'].setValue(data.dob);
    this.formValue.controls['score'].setValue(data.score);
    this.formValue.controls['skill'].setValue(data.skill);
  }

  //update function to update changes(if any)
  updateStudent() {
    this.studentModelObj.rollno = this.formValue.value.rollno;
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.dob = this.formValue.value.dob;
    this.studentModelObj.score = this.formValue.value.score;
    this.studentModelObj.skill = this.formValue.value.skill;

    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id).subscribe(res => {
      alert("Student Data Updated!!!");
      let reff=document.getElementById("exit");
      reff?.click();
      this.formValue.reset();
      this.getAllData();
    })
  }
}
