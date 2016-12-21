import {Indicator} from "./indicator";
import {Resource} from "./resource";
export class ResourceExtension {

  name="Name";
  constructor(){

  }
  getResourceExt(name):Resource{
    if(name == "Indicator"){
      return new Indicator()
    }else{
      return new Resource();
    }
  }
}
