import { Injectable } from '@angular/core';
import {HttpClientService} from "./http-client.service";
import {Resource} from "../extensions/resource";
import {Indicator} from "../extensions/indicator";
import {ValidationRule} from "../extensions/validation-rule";
import {DataElement} from "../extensions/data-element";

@Injectable()
export class ResourceExtensionService {

  constructor(private http:HttpClientService) { }

  getResourceExt(name):Resource{
    name = name.split(' ').join('');
    if(name == "Indicator"){
      return new Indicator(this.http)
    }else if(name == "ValidationRule") {
      return new ValidationRule(this.http)
    }else if(name == "DataElement") {
      return new DataElement(this.http)
    }else
    {
      return new Resource(this.http);
    }
  }
}
