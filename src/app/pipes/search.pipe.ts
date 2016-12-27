import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(resources: any, searchText: any): any {
    if(searchText){
      let retArray = [];
      resources.forEach((resource)=>{
        if(resource.displayName.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
          retArray.push(resource);
        }
      })
      return retArray;
    }else{
      return resources;
    }
  }

}
