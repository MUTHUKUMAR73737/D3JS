import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
//     title: String = 'Bubble Chart';
//   svg: any;
//   graph: any;
//   toolTip: any;
//   legend: any;
//   employeeData: any;

//   nested_data: any;
//   month_keys: any;
//   colors: any;
//   parentNodePack: any;
//   childNodePack: any;
//   parentLeaf: any;
//   childLead: any;
//   width: number;
//   height: number;
//   parentPack: any;
//   childPack: any;
//   nested_data1: any;
// nested_data2 = [];
// // tslint:disable-next-line:no-inferrable-types
// data: number = 0;

// dataBoolean: Boolean = false;
//   color: any = d3.scaleOrdinal(d3.schemeSet2);

//   constructor() {}

//   ngOnInit() {
//     d3.csv('../../assets/employee7.csv').then(data => {
//       this.employeeData = data;
//     });
//   }

//   getBubbleChart() {
//     d3.select('.bubble-chart-container').html(' ');
//     console.log(this.employeeData);
//     this.month_keys = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August'
//     ];

//     this.nested_data = this.employeeData.map(data => {
//       return {
//         username: data.username,
//         total: +data.Total,
//         salary: this.month_keys.map(month => {
//           return +data[month];
//         })
//       };
//     });

//     this.nested_data1 = this.employeeData.map(data => {
//       return this.month_keys.map((month, index) => {
//           if ( index === 0 && !this.dataBoolean) {
//             this.dataBoolean = true;
//           } else  if ( index === 0 && this.dataBoolean) {
//             this.data = this.data + 1;
//             this.dataBoolean = true;
//           }

//           return {
//             data: +data[month],
//             value: this.data
//           };
//         });
//       // };
//     });

// // console.log(this.nested_data1);
// for (const arr of this.nested_data1) {
//     this.nested_data2.push(...arr);
// }

//     console.log('$$$$$$$$$$$$$$$*************' , this.nested_data2);

//     console.log( 'd############' , this.employeeData.map(data => {
//       return {
//         // username: data.username,
//         // total: +data.Total,
//         salary: this.month_keys.map(month => {
//           return +data[month];
//         })
//       };
//     }));

//     console.log(this.nested_data);

//     this.colors = [
//       'green',
//       'orangered',
//       'steelblue',
//       'yellowgreen',
//       'violet',
//       'skyblue',
//       'gray',
//       'orange',
//       'purple'
//     ];

//     this.svg = d3
//       .select('.bubble-chart-container')
//       .append('svg')
//       .attr('width', 700)
//       .attr('height', 700)
//       .style('border', '1px solid steelblue')
//       .attr('viewBox', '0 0 2000 2000'),
//       (this.width = this.svg.attr('width')),
//       (this.height = this.svg.attr('height'));

//     // Parent packing
//     this.parentNodePack = data =>
//       d3.pack().size([+this.width, +this.height])(
//         d3.hierarchy({ children: data }).sum(d => {
//           return (d['total'] / 1000) * 5;
//         })
//       );

//     this.parentPack = this.parentNodePack(this.nested_data);
//     console.log('Parent pack - ', this.parentPack.leaves());

//     // parent node
//     const node = this.svg
//       .selectAll('.parent-node')
//       .data(this.parentPack.leaves())
//       // .data(d3.packEnclose(this.parentPack.leaves()))
//       // .data(d3.packSiblings(this.parentPack.leaves()))
//       .enter()
//       .append('g')
//       .attr('class', 'parent-node')
//       // .attr('fill', (d, i) => 'whitesmoke')
//       .attr('stroke', (d, i) => this.colors[i])
//       .attr('fill', (d, i) => this.color(i))
//       .attr('stroke-width', 5)
//       .attr('transform', (d, i) => {
//         // console.log(`translate(${d.x},${d.y})`);
//         return `translate(${d.x},${d.y})`;
//       });

//     // Child packing
//     this.childNodePack = (data, d) =>
//       d3
//         .pack()
//         // .padding(0)
//         // .sort(d3.descending)
//         .size([d.r * 2, d.r * 2])(
//         d3.hierarchy({ children: data }).sum(data1 => {
//           // console.log('!!!!!!!!#######', d);
//           console.log('!!!!!!!!#######', +data1 / 100);
//           return +data1 / 100;
//         })
//       );

//     //  child node
//     node.attr('x', (d, i) => {
//       // console.log(d);
//       this.childPack = this.childNodePack(d['data']['salary'], d);
//       console.log('Child pack - ', this.childPack.leaves());
//       //  d3.packSiblings(packing1.leaves());
//       //  d3.packEnclose(packing1.leaves())
//       d3.select('.bubble-chart-container')
//         .selectAll('.parent-node')
//         .filter((data, index, nodes) => {
//           if (index === i) {
//             d3.select(nodes[index])
//               .selectAll('.child-node')
//               .data(this.childPack.leaves())
//               // .data(d3.packSiblings(this.childPack.leaves()))
//               // .data(d3.packEnclose(this.childPack.leaves()))
//               .enter()
//               .append('g')
//               .attr('class', 'child-node')
//               .attr('transform', (data1, index1) => {
//                 // console.log(`translate(${(+d['x'])}, ${(+d['y'])})`);
//                 // return `translate(${Math.abs(+d['x'])}, ${Math.abs(+d['y'] )})`;
//                 return `translate(${Math.abs(+d['x'] + +data1['x'])}, ${Math.abs(+d['y']  + +data1['y'])})`;
//               })
//               .append('circle')
//               .attr('r', data1 => {
//                 return data1['value'] ;
//               })
//               .attr('cx', (data1, index1) => {
//                 // console.log(+d['x']);
//                 // return +data1['x'];
//                 return Math.abs(+data1['x']);
//               })
//               .attr('cy', data1 => {
//                 // console.log(data1['y']);
//                 // return  +data1['y'];
//                 return Math.abs(+data1['y']);
//               })

//               ;
//             return true;
//           } else {
//             return false;
//           }
//         });
//       return 50;
//     });
//   }






// -----------------------------------------------------------------------------------------------------------------
//  SAMPLE

title = 'd3-sample';

svg: any;
graph: any;
toolTip: any;
legend: any;
employeeData: any;

nested_data: any;
month_keys: any;
colors: any;
parentNodePack: any;
childNodePack: any;
parentLeaf: any;
childLead: any;
width: number;
height: number;
parentPack: any;
childPack: any;
nested_data1: any;
nested_data2 = [];
// tslint:disable-next-line:no-inferrable-types
data: number = 0;
nodes: any;
numNodes: any;
xScale: any;
yScale: any;
circle: any;
checkIndex: Boolean = false;
color: any = d3.scaleOrdinal(d3.schemeSet2);

constructor() {}

ngOnInit() {
  d3.csv('../../assets/employee7.csv').then(data => {
    this.employeeData = data;
  });
}

getBubbleChart() {
  d3.select('.bubble-chart-container').html('');
  console.log(this.employeeData);

  this.month_keys = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

  this.nested_data = this.employeeData.map(data => {
    return {
      username: data.username,
      total: +data.Total,
      salary: this.month_keys.map(month => {
        return +data[month];
      })
    };
  });

  this.nested_data1 = this.employeeData.map(data => {
    return this.month_keys.map((month, index) => {
      if (index === 0 && !this.checkIndex) {
        this.checkIndex = true;
      } else if (index === 0 && this.checkIndex) {
        this.data = this.data + 1;
        this.checkIndex = true;
      }
      return {
        data: +data[month],
        value: this.data
      };
    });
  });

  for (const arr of this.nested_data1) {
    this.nested_data2.push(...arr);
  }

  console.log(this.nested_data2);


//  SVG element
  this.svg = d3
    .select('.bubble-chart-container')
    .append('svg')
    .attr('width', 700)
    .attr('height', 700)
    .style('border', '1px solid steelblue')
    .attr('viewBox', '0 0 1000 1000'),
    (this.width = this.svg.attr('width')),
    (this.height = this.svg.attr('height'));


  // Parent packing
  this.parentNodePack = data =>
  d3.pack().size([+this.width, +this.height])(
    d3.hierarchy({ children: data }).sum(d => {
      return d['total'];
    })
  );

this.parentPack = this.parentNodePack(this.nested_data);
console.log('Parent pack - ', this.parentPack.leaves());

// parent node - outer circle
// const node = this.svg
// .append('g').attr('class', 'parent-bubble-chart')
//   .data(this.parentPack.descendants())
//   .append('circle')
//   .attr('class', 'parent-node')
//   .attr('r', (d) => {
//     return d.r ;
//   })
//   .attr('fill', 'white')
//   .attr('stroke', 'steelblue')
//   .attr('transform', (d, i) => {
//     return `translate(${d.x},${d.y})`;
//   });



  this.xScale = d3.scaleLinear().domain([0, 8]).range([0, 500]);
  this.yScale = d3.scaleLinear().domain([0, 8]).range([700, 0]);


// d3.select('.parent-node')
  d3.forceSimulation(this.nested_data2)
    .force('center', d3.forceCenter(350, 350 ))
    // .force('charge', d3.forceManyBody().strength(50).distanceMin(0))
    .force('y', d3.forceY().y((d) =>  700 - this.yScale(d['value'])).strength(1))
    // .force('y', d3.forceY().y((d) =>  0).strength(1))
    // .force('x', d3.forceX().x((d) => 0))
    // .force('x', d3.forceX().x((d) => this.xScale(d['value'])))
    .force(
      'collision',
      d3.forceCollide().radius(function(d) {
        return (d['data'] / 1000) * 5 ;
      }).strength(1)
    ).alphaDecay(0.2)
    .on('tick', () => {
      this.circle = d3
        .select('.bubble-chart-container')
        .select('svg')
        .selectAll('.child-node')
        .data(this.nested_data2);
       this.circle.enter()
        .append('circle')
        .attr('class', 'child-node')
        .attr('r', (d) => {
          // console.log('$$$$$', d);
          return (d['data'] / 1000) * 5;
        })
        .style('fill', (d, i) => {
          return this.color(d['value'].toString());
        })
        .merge(this.circle)
        .attr('cx', (d) => {
          return +d['x'];
        })
        .attr('cy', (d) => {
          return +d['y'];
        });
      this.circle.exit().remove();
    });
}
}
