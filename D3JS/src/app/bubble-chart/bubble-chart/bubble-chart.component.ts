import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BubbleChartComponent implements OnInit {
  data = [
    { data: 4000, value: 0, year: 2009 },
    { data: 5000, value: 0, year: 2010 },
    { data: 6000, value: 0, year: 2010 },
    { data: 2000, value: 0, year: 2009 },
    { data: 1000, value: 0, year: 2009 },
    { data: 8000, value: 0, year: 2010 },
    { data: 8000, value: 0, year: 2009 },
    { data: 8000, value: 0, year: 2009 },
    { data: 5000, value: 0, year: 2009 },
    { data: 2000, value: 0, year: 2009 },
    { data: 6000, value: 0, year: 2009 },
    { data: 3000, value: 0, year: 2009 },
    { data: 7000, value: 0, year: 2009 },
    { data: 7000, value: 0, year: 2009 },
    { data: 4000, value: 0, year: 2009 },
    { data: 5000, value: 0, year: 2009 },
    { data: 6000, value: 0, year: 2009 },
    { data: 2000, value: 0, year: 2009 },
    { data: 1000, value: 0, year: 2009 },
    { data: 8000, value: 0, year: 2009 },
    { data: 8000, value: 0, year: 2009 },
    { data: 8000, value: 0, year: 2009 },
    { data: 5000, value: 0, year: 2009 },
    { data: 2000, value: 0, year: 2009 },
    { data: 6000, value: 0, year: 2010 },
    { data: 3000, value: 0, year: 2010 },
    { data: 7000, value: 0, year: 2010 },
    { data: 7000, value: 0, year: 2010 },

    { data: 4500, value: 1, year: 2009 },
    { data: 9000, value: 1, year: 2009 },
    { data: 2000, value: 1, year: 2009 },
    { data: 3500, value: 1, year: 2009 },
    { data: 2500, value: 1, year: 2009 },
    { data: 1500, value: 1, year: 2009 },
    { data: 8000, value: 1, year: 2009 },
    { data: 8000, value: 1, year: 2009 },
    { data: 9000, value: 1, year: 2010 },
    { data: 10000, value: 1, year: 2010 },
    { data: 3000, value: 1, year: 2010 },
    { data: 4000, value: 1, year: 2010 },
    { data: 5000, value: 1, year: 2010 },
    { data: 5000, value: 1, year: 2010 },
    { data: 4500, value: 1, year: 2009 },
    { data: 9000, value: 1, year: 2009 },
    { data: 2000, value: 1, year: 2009 },
    { data: 3500, value: 1, year: 2009 },
    { data: 2500, value: 1, year: 2009 },
    { data: 1500, value: 1, year: 2009 },
    { data: 8000, value: 1, year: 2009 },
    { data: 8000, value: 1, year: 2009 },
    { data: 9000, value: 1, year: 2010 },
    { data: 10000, value: 1, year: 2010 },
    { data: 3000, value: 1, year: 2010 },
    { data: 4000, value: 1, year: 2010 },
    { data: 5000, value: 1, year: 2010 },
    { data: 5000, value: 1, year: 2010 },

    { data: 4000, value: 2, year: 2009 },
    { data: 5000, value: 2, year: 2009 },
    { data: 6000, value: 2, year: 2009 },
    { data: 2000, value: 2, year: 2009 },
    { data: 1000, value: 2, year: 2009 },
    { data: 5000, value: 2, year: 2009 },
    { data: 9000, value: 2, year: 2009 },
    { data: 9000, value: 2, year: 2009 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 4000, value: 2, year: 2009 },
    { data: 5000, value: 2, year: 2009 },
    { data: 6000, value: 2, year: 2009 },
    { data: 2000, value: 2, year: 2009 },
    { data: 1000, value: 2, year: 2009 },
    { data: 5000, value: 2, year: 2009 },
    { data: 9000, value: 2, year: 2009 },
    { data: 9000, value: 2, year: 2009 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },
    { data: 9000, value: 2, year: 2010 },

    { data: 5000, value: 3, year: 2009 },
    { data: 6000, value: 3, year: 2009 },
    { data: 6000, value: 3, year: 2009 },
    { data: 1000, value: 3, year: 2009 },
    { data: 4000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 5000, value: 3, year: 2009 },
    { data: 6000, value: 3, year: 2009 },
    { data: 6000, value: 3, year: 2009 },
    { data: 1000, value: 3, year: 2009 },
    { data: 4000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },
    { data: 8000, value: 3, year: 2010 },

    { data: 4000, value: 4, year: 2009 },
    { data: 5000, value: 4, year: 2009 },
    { data: 6000, value: 4, year: 2010 },
    { data: 2000, value: 4, year: 2010 },
    { data: 1000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },
    { data: 8000, value: 4, year: 2010 },

    { data: 4000, value: 5, year: 2009 },
    { data: 5000, value: 5, year: 2009 },
    { data: 6000, value: 5, year: 2009 },
    { data: 2000, value: 5, year: 2009 },
    { data: 1000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 4000, value: 5, year: 2010 },
    { data: 5000, value: 5, year: 2010 },
    { data: 6000, value: 5, year: 2010 },
    { data: 2000, value: 5, year: 2010 },
    { data: 1000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },
    { data: 8000, value: 5, year: 2010 },

    { data: 4000, value: 6, year: 2009 },
    { data: 5000, value: 6, year: 2009 },
    { data: 6000, value: 6, year: 2009 },
    { data: 2000, value: 6, year: 2009 },
    { data: 1000, value: 6, year: 2010 },
    { data: 8000, value: 6, year: 2010 },
    { data: 8000, value: 6, year: 2010 },
    { data: 8000, value: 6, year: 2010 },
    { data: 8000, value: 6, year: 2010 },
    { data: 8000, value: 6, year: 2010 },
    { data: 8000, value: 6, year: 2010 },
    { data: 8000, value: 6, year: 2010 },
    { data: 8000, value: 6, year: 2010 },
    { data: 5000, value: 6, year: 2010 },

    { data: 4000, value: 7, year: 2009 },
    { data: 5000, value: 7, year: 2009 },
    { data: 6000, value: 7, year: 2009 },
    { data: 2000, value: 7, year: 2009 },
    { data: 1000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },
    { data: 8000, value: 7, year: 2010 },

    { data: 4000, value: 8, year: 2009 },
    { data: 5000, value: 8, year: 2009 },
    { data: 6000, value: 8, year: 2009 },
    { data: 2000, value: 8, year: 2009 },
    { data: 1000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },
    { data: 8000, value: 8, year: 2010 },

    { data: 4000, value: 9, year: 2009 },
    { data: 5000, value: 9, year: 2009 },
    { data: 6000, value: 9, year: 2009 },
    { data: 2000, value: 9, year: 2009 },
    { data: 1000, value: 9, year: 2010 },
    { data: 8000, value: 9, year: 2010 },
    { data: 8000, value: 9, year: 2010 },
    { data: 8000, value: 9, year: 2010 },
    { data: 8000, value: 9, year: 2010 },
    { data: 8000, value: 9, year: 2010 },
    { data: 9000, value: 9, year: 2010 },
    { data: 5000, value: 9, year: 2010 },
    { data: 9000, value: 9, year: 2010 },
    { data: 5000, value: 9, year: 2010 }
  ];

  // Scale definition
  color = d3.scaleOrdinal(d3.schemeSet2);
  xScale = d3
    .scaleLinear()
    .domain([2009, 2010])
    .range([200, 700]);
  yScale = d3
    .scaleLinear()
    .domain([0, 9])
    .range([100, 400]);
  circleNodePack: any;
  circlePack: any;
  simulation: any;
  bubble: any;

  ngOnInit() {}

  getBubbleChart() {
    d3.select('#bubble-chart-container')
      .select('.content')
      .selectAll('button')
      .on('click', (d, i, nodes) => {
        d3.select('#bubble-chart-container')
          .select('.content')
          .selectAll('button')
          .classed('active', false);
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
    this.circleNodePack = data =>
      d3.pack().size([500, 300])(
        d3
          .hierarchy({ children: data })
          .sum(d => {
            return d['data'] / 1000;
          })
          .sort(function(a, b) {
            return b.value - a.value;
          })
      );

    this.circlePack = this.circleNodePack(this.data);

    // Force Simulation
    this.simulation = d3
      .forceSimulation()
      .force(
        'collision',
        d3.forceCollide().radius(function(d) {
          return +d['r'] + 1;
        })
      )
      .on('tick', () => {
        this.bubble
          .attr('cx', function(d, i) {
            return d.x;
          })
          .attr('cy', function(d, i) {
            return d.y;
          });
      });

    // Chart
    this.bubble = d3
      .select('#bubble-chart-container')
      .select('svg')
      .select('g')
      .selectAll('circle')
      .data(this.circlePack.leaves())
      .enter()
      .append('circle')
      .style('fill', (d, i) => {
        return this.color(d['data']['value'].toString());
      })
      .style('stroke', function(d, i) {
        if (d['data']['year'] === 2009) {
          return 'black';
        }
        return null;
      })
      .style('stroke-width', 1)
      .attr('r', function(d, i) {
        return d['r'];
      });
    this.simulation.nodes(this.circlePack.leaves());
    this.groupBubble();
  }

  splitBubble() {
    console.log('Inside Split');
    this.simulation
    .force('x', d3.forceX().x((d, i) => {
          if (d['data']['year'] === 2009) {
            return d['x'] - this.xScale(d['data']['year']);
          }
      return 400;
    }))
    .force('y', d3.forceY().y((d, i) => {
        return this.yScale(d['data']['value']);
    }));
    this.simulation
      .alpha(1)
      .alphaDecay(0.07)
      .restart();
  }

  groupBubble() {
    console.log('Inside Group');
    this.simulation
      .force('x', d3.forceX().x(function(d) {
          return 400;
      }))
      .force('y', d3.forceY().y((d, i) => {
          return this.yScale(d['data']['value']);
      }).strength(0.5));

    this.simulation
      .alpha(0.7)
      .alphaDecay(0.07)
      .restart();
  }
}
