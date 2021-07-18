import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchState'
})
export class SearchStatePipe implements PipeTransform {

  transform(values: any[], searchString: string): any[] {
    // console.log(values);  
    return values.filter((item) =>
      (
        searchString === "" || item.location.state.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }

}
