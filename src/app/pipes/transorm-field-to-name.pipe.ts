import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transormFieldToName'
})
export class TransormFieldToNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value.charAt(0).toUpperCase() + value.slice(1)).replace(/([A-Z])/g, ' $1').trim()
  }

}
