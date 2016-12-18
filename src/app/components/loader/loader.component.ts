import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() text:any;
  constructor() {

  }
  ngOnInit() {
    //this.interval = setInterval(this.randomText, 3000)
  }
}
