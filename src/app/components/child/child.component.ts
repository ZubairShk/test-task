import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit,OnChanges {
@Input() employeeDetails: any
  constructor(public commonService : CommonService) { }
  tableData = []
  ageRange: { name: string; value: any; }[] = [] ;
  ageGroup = 0

  ngOnInit(): void {
    this.initialize()
  }

  initialize() {
    this.tableData = JSON.parse(JSON.stringify(this.employeeDetails))
    let ages = this.employeeDetails.map((data: { employee_age: any; }) => data.employee_age)
    // this.ageGroup = ages[0]
    this.ageRange = this.commonService.getAgeWithDiffOf20(ages)
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes.employeeDetails) {
        this.employeeDetails = changes.employeeDetails.currentValue
        this.initialize()
      }
  }

  getTitle(name: String) {
    return name.replace(/_/g, ' ');
  }

  setAgeGroup(val:any) {
    console.log(val.target.value)
    this.ageGroup = parseInt(val.target.value)
    let maxAge =  parseInt(val.target.value) + 20
    console.log(maxAge)
    this.tableData = this.employeeDetails.filter((data: any) => {
      return data.employee_age >= val.target.value && data.employee_age <= maxAge
    })
  }

  resetSorting() {
    this.ageGroup = 0
    this.tableData = this.employeeDetails
  }

  sortDetails(order:String) {
    console.log('order',order)
    if (order == 'acc') {
      this.tableData.sort(function(a:any, b:any) {
        return a.employee_salary - b.employee_salary;
  });
    } else {
      this.tableData.sort(function(a:any, b:any) {
        return b.employee_salary - a.employee_salary;
  });
    }
  }

}
