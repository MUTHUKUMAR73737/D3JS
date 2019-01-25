import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
@Component({
  selector: 'app-sample-bubble',
  templateUrl: './sample-bubble.component.html',
  styleUrls: ['./sample-bubble.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SampleBubbleComponent implements OnInit {

  // export class BubbleChartComponent implements OnInit {
    data = [
       {data: 4000, value: 0, year: 2009},
       {data: 500, value: 0, year: 2009},
       {data: 500, value: 0, year: 2009},
       {data: 5000, value: 0, year: 2009}
      ];

    // Scale definition
       color  = d3.scaleOrdinal(d3.schemeSet2);
       xScale = d3.scaleLinear().domain([2009, 2010]).range([200, 700]);
       yScale = d3.scaleLinear().domain([0, 9]).range([100, 400]);
       parentNodePack: any;
       parentPack: any;
       simulation: any;
       bubble: any;

    ngOnInit() {
      this.getBubbleChart();
    }

  getBubbleChart() {
console.log('zzz');
    d3.select('#bubble-chart-container').select('.content').selectAll('button').on('click', (d, i, nodes) => {
      d3.select('#bubble-chart-container').select('.content').selectAll('button').classed('active', false);
          const button = d3.select(nodes[i]);
          button.classed('active', true);
          const buttonId = button.attr('id');
          // bubble selection
          if (buttonId === 'split') {
            this.splitBubble();
          } else {
            this.groupBubble();
          }
    });

    // Circle pack
    this.parentNodePack = data =>
      d3.pack().size([500, 300])(
        d3.hierarchy({ children: data }).sum(d => {
          // if (data['value'] === 0) {
            return d['data'] / 1000;
          // } else {
          //   return null;
          // }

        })
        .sort(function(a, b) {
            return  a.value - b.value;
         })
      );

    this.parentPack = this.parentNodePack(this.data);

    // Force Simulation
    //  this.simulation = d3.forceSimulation()
    //      .force('collision', d3.forceCollide().radius(function(d) {
    //         return +d['r'] + 1;
    //      }))
    //     .on('tick', () => {
    //         this.bubble
    //         .attr('cx', function(d, i) {
    //            return d.x;
    //         })
    //         .attr('cy', function(d, i) {
    //            return d.y;
    //         });
    //     });

    // Chart
    this.bubble = d3.select('#bubble-chart-container').select('svg')
    // .select('g')
      .selectAll('circle')
      .data(this.parentPack.descendants())
      .enter()
      .append('circle')
      .style('fill', (d, i) => {
        console.log(d);
        if (d['data']['value'] >= 0 && d['data']['value'] < 7) {
          return this.color(d['data']['value'].toString());
        }
        return 'black';
      })
      .style('stroke', function(d, i) {
        if ( d['data']['year'] === 2009) {
          return 'black';
        }
        return null;
      })
      .style('stroke-width', 1)
        .attr('r', function(d, i) {
          return d['r'];
      })
      .attr('cx', function(d, i) {
                   return d['x'];
                })
                .attr('cy', function(d, i) {
                   return d['y'];
                });

    // this.simulation.nodes(this.parentPack.leaves());
    this.groupBubble();

  }

    splitBubble() {
      console.log('Inside Split');
          //  this.simulation
          //     .force('x', d3.forceX().x((d, i) => {
          //         if ((d['data']['year']) === 2009) {
          //           if (i >= 0 && i < 6) {
          //               console.log(i, d['x']);
          //               console.log( (this.xScale(d['data']['year']) ) );
          //           }
          //            return d['x'] - (this.xScale(d['data']['year']) ) ;
          //         }
          //         return 400;
          //     }))
          //     .force('y', d3.forceY().y((d, i) => {
          //       return this.yScale(d['data']['value']);
          //     }));

          //  this.simulation.alpha(1).alphaDecay(0.07).restart();
    }

    groupBubble() {
      console.log('Inside Group');
      //   this.simulation
      //   .force('x', d3.forceX().x(function(d) {
      //     return 400;
      //   }))
      //   .force('y', d3.forceY().y((d, i) =>  {
      //       return this.yScale(d['data']['value']);
      //   }).strength(0.5));

      // this.simulation.alpha(0.7).alphaDecay(0.07).restart();
    }


  // }

}
