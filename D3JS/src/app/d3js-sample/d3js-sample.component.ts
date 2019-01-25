import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3js-sample',
  templateUrl: './d3js-sample.component.html',
  styleUrls: ['./d3js-sample.component.css']
})
export class D3JSSampleComponent implements OnInit {
  constructor() {}

  title = 'D3JS-Sample';

  name: String = 'ASPIRE';
  data: any;
  paragraph: any;
  sampleText: any;
  myData = ['HELLO', 'WORLD'];
  myData_1 = [4, 1, 6, 2, 8, 9];
  employeeArray = new Array();
  id: number;

  ngOnInit() {}

  sample() {
    // Get D3 version
    d3.select('body')
      .append('h5')
      .text(d3.version);
    // Select first paragraph element and apply style color=red
    d3.select('p').style('color', 'red');
    // Select body and append 'p' tag and include text for appended paragraph
    d3.select('body')
      .append('p')
      .text('Second paragraph.');
    // Select element DIV and insert another element('p') inside DIV
    d3.select('div')
      .insert('p')
      .text('Third paragraph.');
    // Select class and apply style to that class
    d3.select('.container').style('background', 'lightgray');
    // Select class and insert input element into that class => Default input type is text
    d3.select('.container').insert('input');
    // set attribute for above created input[type='text'] using container class
    d3.select('input').attr('type', 'checkbox');
    // set attribute
    d3.select('input').attr('checked', true);
    // apply class for HTML element
    d3.select('button').classed('error', true);

  }

  sample1() {
    this.data = [1, 2, 3];
    this.paragraph = d3
      .select('.container1')
      .selectAll('p')
      .data(this.data)
      // .enter()
      .text(( data, index, nodes) => {
        // console.log('Data -  ' + data);
        // console.log('Index -  ' + index);
        // console.log(data[index]);
        return +data;
      });
  }

  sample2() {
    // To change attribute value dynamically
    d3.select('.container2')
      .selectAll('p')
      .style('color', function(data, index, nodes) {
        // console.log(data);
        nodes[index]['text'] = nodes[index]['innerHTML'];
        if (nodes[index]['text'].indexOf('Error') >= 0) {
          return 'red';
        } else if (nodes[index]['text'].indexOf('Warning') >= 0) {
          return 'green';
        }
      });
  }

  sample3() {
    d3.selectAll('p')
      .on('mouseover', function() {
        d3.select(this).style('background', 'steelblue').style('color', 'white');
        // To get mouse event
        // console.log(d3.mouse(this));
      })
      .on('mouseout', function() {
        d3.select(this).style('background', 'white').style('color', 'steelblue');
      });
  }

  sample4() {
    d3.select('.container3')
      .transition()
      .ease(d3.easeLinear)
      .delay(2000)
      .duration(5000)
      .style('background-color', 'yellowgreen');
  }

  sample5() {
    d3.select('.container4')
      .selectAll('p')
      .data(this.myData)
      .text(function(data) {
        return data;
      });
  }

  sample6() {
    // Data visualization - datum()
    d3.select('body')
      .select('p')
      .datum(100)
      .text(function(data, index) {
        return data;
      });

    // create HTML element from looping of input data and apply style with some condition
    d3.select('.container5')
      .selectAll('div')
      .data(this.myData_1)
      .enter()
      .append('div')
      .style('color', function(data) {
        if (data % 2 === 0) {
          return 'blue';
        } else {
          return 'green';
        }
      })
      .text(function(data) {
        return data + ' ';
      });
  }
}
