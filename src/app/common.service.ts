import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  url = 'https://dummy.restapiexample.com/api/v1/employees'

  getEmployeeDetails() {
    return this.http.get<any>(this.url).pipe(map(
      data => { return data }
      )
      )
  }

  getAgeWithDiffOf20(ages:[]) {
  // Find the minimum and maximum numbers in the array
  let min = Math.min(...ages);
  let max = Math.max(...ages);

  // Calculate the number of elements needed in the new array
  let numElements = Math.floor((max - min) / 20) + 1;

  // Create a new array with the desired number of elements
  let result = new Array(numElements);

  // Fill the new array with values starting from the minimum number
  for (let i = 0; i <= numElements; i++) {
    result[i] = min + (i * 20);
  }

  console.log('result',result)
  let ageRange: { name: string; value: any; }[] = [] ;
  result.filter((age, i, arr)=> {
    let ageRangeObj = {
      name: `${age} - ${age+20}`,
      value: age
    }
    console.log('arr[arr.length -1]',arr[arr.length -1])
    if (age !== arr[arr.length -1]) {
      ageRange.push(ageRangeObj)
    }
  })
   return ageRange;
}
}
