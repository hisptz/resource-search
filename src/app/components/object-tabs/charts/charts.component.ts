import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  @Input() url:any;
  @Input() schema:any;
  @Input() config:any;
  constructor() { }

  structure = {
    'type': 'table',
    'tableConfiguration': {
      'rows': ['ou', 'dx', 'pe', 'YfvoyE8tTrk'] ,
      'columns': ['co', 'QDSfLpYNZ3l']
    }
  }
  data = {"headers":[{"name":"dx","column":"Data","type":"java.lang.String","hidden":false,"meta":true},{"name":"pe","column":"Period","type":"java.lang.String","hidden":false,"meta":true},{"name":"ou","column":"Organisation unit","type":"java.lang.String","hidden":false,"meta":true},{"name":"value","column":"Value","type":"java.lang.Double","hidden":false,"meta":false}],"metaData":{"names":{"YfvoyE8tTrk":"Catfish Ward","A4BPhZhOrzc.QDSfLpYNZ3l":"WF01 2-Malengo ya Uzalishaji/Tija wa matunda Grape","dx":"Data","pe":"Period","ou":"Organisation unit","AsgiIABsA69":"Hawk Ward","iH7LSuDKBxU":"Crow Ward","2014Q3":"Jul to Sep 2014","PwOdmPqofaP":"Owl Ward"},"dx":["A4BPhZhOrzc.QDSfLpYNZ3l"],"pe":["2014Q3"],"ou":["YfvoyE8tTrk","iH7LSuDKBxU","AsgiIABsA69","PwOdmPqofaP"],"co":[]},"rows":[["A4BPhZhOrzc.QDSfLpYNZ3l","2014Q3","YfvoyE8tTrk","3.0"],["A4BPhZhOrzc.QDSfLpYNZ3l","2014Q3","AsgiIABsA69","3.0"],["A4BPhZhOrzc.QDSfLpYNZ3l","2014Q3","PwOdmPqofaP","2.0"],["A4BPhZhOrzc.QDSfLpYNZ3l","2014Q3","iH7LSuDKBxU","2.0"]],"width":4,"height":4}
  loading;
  loadingError;
  ngOnInit() {
    this.loading = false;
    this.loadingError = false;
  }

}
