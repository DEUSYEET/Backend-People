import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAge'
})
export class SearchAgePipe implements PipeTransform {

  transform(values: any[], searchString: string): any[] {
    // console.log(values);  
    return values.filter((item) =>
      (
        searchString === "" || item.dob.age==searchString
      )
    );
  }

}
