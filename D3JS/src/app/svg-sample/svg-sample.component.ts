import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-svg-sample',
  templateUrl: './svg-sample.component.html',
  styleUrls: ['./svg-sample.component.css']
})
export class SvgSampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  sample1() {
    d3.select('.svg-container')
      .append('svg')
      .attr('height', 200)
      .attr('width', 200)
      .style('border', '1px solid red');
    d3.select('.svg-container')
      .selectAll('svg')
      .append('line')
      .attr('x1', 200)
      .attr('x2', 50)
      .attr('y1', 100)
      .attr('y2', 200)
      .style('stroke', 'steelblue');
  }
}
