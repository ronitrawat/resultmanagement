import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { SharedService } from '../sharedservice.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']

})
export class ResultComponent implements OnInit {
  searchResults: any;
  sharedArray: any[];

  filteredStudentData: any[];

  roll: number;
  name: string;
  Student: any[];
  errorText: string;
 
  constructor(private api: ApiService,private sharedservice: SharedService) { 
    this.sharedArray = this.sharedservice.sharedArray;
  }

  ngOnInit(): void {
    

    console.log(this.sharedArray);
  }
  
  }
