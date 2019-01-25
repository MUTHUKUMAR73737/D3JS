import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-css-animation-sample',
  templateUrl: './css-animation-sample.component.html',
  styleUrls: ['./css-animation-sample.component.css']
})
export class CssAnimationSampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // d3.select('body').DOM.text('HELLO WORLD');
  }
}
