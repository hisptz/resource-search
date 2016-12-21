import {HttpClientService} from "../services/http-client.service";

export class Resource {

  tabs = [
    {
      title: "Detail Info",
      active: true,
      type: "info"
    }
  ];

  constructor(protected http:HttpClientService) {
  }
}
