import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { EmployeeModel } from '../model/employee.model';

@Component({
  selector: 'app-d3-sample',
  templateUrl: './d3-sample.component.html',
  styleUrls: ['./d3-sample.component.css']
})
export class D3SampleComponent implements OnInit {
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

    d3.select('body')
      .append('h1')
      .text((data, index) => {
        console.log(data);
        console.log(index);
        console.log(this);
        console.log(this.name);
        return index;
      });

    d3.select('body')
      .append('h2')
      .text((data, index) => {
        console.log(data);
        console.log(index);
        console.log(this);
        console.log(this.name);
        return index;
      });
  }

  sample1() {
    this.data = [1, 2, 3];
    this.paragraph = d3
      .select('.container1')
      .selectAll('p')
      .data(this.data)
      .text(function(this, data, index) {
        console.log('Data -  ' + data);
        console.log('Index -  ' + index);
        console.log('This Object - ' + this);
        return data[index];
      });
  }

  sample2() {
    // To change attribute value dynamically
    d3.select('.container2')
      .selectAll('p')
      .style('color', function(data, index) {
        console.log(data);
        return 'red';
        // this.text = this.innerText;
        // if (this.text.indexOf('Error') >= 0) {
        //   return 'red';
        // } else if (this.text.indexOf('Warning') >= 0) {
        //   return 'yellowgreen';
        // }
      });
  }

  sample3() {
    d3.selectAll('p')
      .on('mouseover', function() {
        d3.select(this).style('background', 'white');
        // To get mouse event
        // console.log(d3.mouse(this));
      })
      .on('mouseout', function() {
        d3.select(this).style('background', '#ffe6ff');
      });
  }

  sample4() {
    d3.select('.container3')
      .transition()
      .ease(d3.easeLinear)
      .duration(5000)
      .delay(2000)
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
          return 'orangered';
        } else {
          return 'violet';
        }
      })
      .text(function(data) {
        return data + ' ';
      });

    // d3.csv('../../assets/employee.csv', (data, index) => {

    // const employeeModel = new EmployeeModel();
    //   employeeModel.employeeData(data.username, data.id, data.domain, data.salary);
    //   this.employeeArray.push(employeeModel);

    // });
    // console.log(this.employeeArray);
    // for (let t = 0; t < this.employeeArray.length; t++) {
    //   console.log('Data = ' + `${t}` + this.employeeArray[t]._username);
    // }

    // d3.json('../../assets/data.json', function(data) {
    //   console.log('Data -> ' , data);
    // });
  }
}
