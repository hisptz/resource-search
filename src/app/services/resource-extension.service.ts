import { Injectable } from '@angular/core';
import {HttpClientService} from "./http-client.service";
import {Resource} from "../extensions/resource";
import {Indicator} from "../extensions/indicator";

@Injectable()
export class ResourceExtensionService {

  constructor(private http:HttpClientService) { }

  getResourceExt(name):Resource{
    if(name == "Indicator"){
      return new Indicator(this.http)
    }else{
      return new Resource(this.http);
    }
  }
}
