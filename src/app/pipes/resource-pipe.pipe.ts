import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resourcePipe'
})
export class ResourcePipePipe implements PipeTransform {

  order = ["indicators", "validationRules","dataElements"];

  transform(resources:any, args?:any):any {
    let retunrArray = [];
    this.order.forEach((o)=> {
      let newResource = null;
      resources.some((resource:any,index)=> {
        if (resource.plural == o) {
          newResource = resource;
          resources.splice(index, 1)
          return true;
        }
      })
      if(newResource != null){
        retunrArray.push(newResource);
      }
    })
    return retunrArray.concat(resources);
  }

}
