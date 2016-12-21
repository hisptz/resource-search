import {Indicator} from "./indicator";
import {Resource} from "./resource";
export class ResourceExtension {

  constructor(){

  }
  getResourceExt(name):Resource{
    if(name == "Indicator"){
      return new Indicator(null)
    }else{
      return new Resource(null);
    }
  }
}
