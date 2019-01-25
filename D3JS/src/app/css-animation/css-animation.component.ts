import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-css-animation',
  templateUrl: './css-animation.component.html',
  styleUrls: ['./css-animation.component.css']
})
export class CssAnimationComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    // sample
    d3.select('.sample-container-sample')
      .append('svg')
      .append('g')
      .selectAll('.asdf')
      .data([[100, 200, 800], [300, 400, 900], [500, 600, 1000]])
      .enter()
      .append('g')
      .attr('class', '.asdf')
      .attr('transform', (d, i) => `translate(${i *  70}, 50)`)
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('transform', (d, i) => `translate(${i *  30}, 50)`)
      .attr('x', (d, i ) => {
        console.log(d);
        return i + 1 * 20;
      } )
      .attr('y', (d, i) => 20)
      .attr('width',  30)
      .attr('height', (d, i) => i + 1 * 100)
      .attr('fill', 'yellowgreen');

  }
}
