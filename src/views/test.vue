<template>
    <div class="home">
      
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3'
  
  export default {
    name: 'Home',
  
    data() {
      return {
        data: {
          totalLength: 100000,
          data: [
            {
              length: 200,
              direct: 1,
              start: 132,
              end: 332
            },
            {
              length: 80,
              direct: 1,
              start: 340,
              end: 420
            },
            {
              length: 400,
              direct: -1,
              start: 421,
              end: 821
            },
            {
              length: 234,
              direct: 1,
              start: 1320,
              end: 1554
            },
          ]
        }
      };
    },
  
    mounted() {
      this.drawSvg(this.data)
    },
  
    methods: {
      drawSvg(data) {
        console.log(data)
        // 获取页面宽度
        const svgWidth = 10000
        const svgHeight = 200
        const svgPadding = { left: 60, right: 60 }
  
  
        const svg = d3.select('.home')
          .append('svg')
          .attr('id', 'svg')
          .attr('width', svgWidth)
          .attr('height', svgHeight)
          .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
          .attr('style', 'border: 1px solid red;')
  
  
        const xAxisLength = svgWidth - svgPadding.left -svgPadding.right
        const xAxisStart = svgPadding.left
        const xAxisBottomPos = svgHeight - 20
        svg.append('g').attr('id', 'xAxis_g').attr('transform', `translate(${xAxisStart}, ${xAxisBottomPos})`)    
        console.log(data.totalLength)
        const xScale = d3.scaleLinear().domain([0, data.totalLength]).range([0, xAxisLength]).nice()
        const xAxis = d3.axisBottom(xScale)
        d3.select('#xAxis_g').call(xAxis)
  
        const arrowHeight = 20
        const instanceXAxis = 20
        const pathClassNames = []
        data.data.forEach((item, index) => {
          let d = ''
          if(item.direct === 1) {
            const start = xScale(item.start)
            const path_1 = `M ${start} ${xAxisBottomPos - instanceXAxis}`
            const path_2 = `L ${start} ${xAxisBottomPos - instanceXAxis - arrowHeight}`
            const path_3 = `L ${xScale(item.end) - arrowHeight / 2} ${xAxisBottomPos - instanceXAxis - arrowHeight}`
            const path_4 = `L ${xScale(item.end)} ${xAxisBottomPos - instanceXAxis - arrowHeight * 0.5}`
            const path_5 = `L ${xScale(item.end) - arrowHeight / 2} ${xAxisBottomPos - instanceXAxis}`
            const path_6 = `L ${start} ${xAxisBottomPos - instanceXAxis}`
            d = path_1 + ',' + path_2 + ',' + path_3 + ',' + path_4 + ',' + path_5 + ',' + path_6
          } else {
            const start = xScale(item.start)
            const end = xScale(item.end)
            const path_1 = `M ${start} ${xAxisBottomPos - instanceXAxis - arrowHeight * 0.5}`
            const path_2 = `L ${start + xScale(instanceXAxis)} ${xAxisBottomPos - instanceXAxis - arrowHeight}`
            const path_3 = `L ${end} ${xAxisBottomPos - instanceXAxis - arrowHeight}`
            const path_4 = `L ${end} ${xAxisBottomPos - instanceXAxis}`
            const path_5 = `L ${start + xScale(instanceXAxis)} ${xAxisBottomPos - instanceXAxis}`
            const path_6 = `L ${start} ${xAxisBottomPos - instanceXAxis - arrowHeight * 0.5}`
            d = path_1 + ',' + path_2 + ',' + path_3 + ',' + path_4 + ',' + path_5 + ',' + path_6
          }
          const pathClassName = 'arrow_' + (index + 1)
          pathClassNames.push(pathClassName)
          svg.append('g')
            .attr('transform', `translate(${xAxisStart}, ${0})`)  
            .attr('class', pathClassName)
          
          
          d3.select('.' + pathClassName)
            .append('path')
            .attr('d', d)
            .attr('stroke-width', '1.5')
            .attr('stroke', 'gray')
            .attr('fill', 'red')
            .style('cursor', 'pointer')
  
          
        });
  
        // 添加事件
        pathClassNames.forEach((item, index) => {
          const path = d3.select('.' + item)
          const hoverBoxWidth = 120
          const hoverBoxHeight = 60
          const hoverBoxX = xAxisStart + xScale(data.data[index].end)
          const hoverBoxY = xAxisBottomPos - instanceXAxis - hoverBoxHeight + arrowHeight * 0.5
          const hoverBox = svg
              .append("foreignObject")
              .attr("class", '.' + item + '_' + "info")
              .style("width", hoverBoxWidth + 'px')
              .style("height", hoverBoxHeight + 'px')
              .html(
                `
                  <div style="width: ${hoverBoxWidth + 'px'}; height: ${hoverBoxHeight + 'px'};background-color: ${d3.rgb(0, 0, 0, 0.6)}; padding-left: 10px; border-radius: 4px 4px;">
                    <p>
                      asfsfd
                    </p>
                  </div>
                `
              )
              .attr("color", "white")
              .style("font-size", "12px")
              .attr("visibility", "hidden")
          // .append("rect")
              // .attr("width", hoverBoxWidth)
              // .attr("height", hoverBoxHeight)
              // .attr("fill", "white")
              // .attr('stroke-width', '0')
              // .attr("stroke", "black")
              // .attr('fill', 'black')
              // .attr('opacity', '0.5')
              // .attr("visibility", "hidden")
  
              // .append('text')
              // .text("Hello World!")
              // .style('display', 'inline-block')
              // .style("font-family", "Arial")
              // .style("font-size", "10px")
              // .style("font-weight", "bold")
              // .style('width', hoverBoxWidth)
              // .style('height', hoverBoxHeight)
              // .style('background-color', 'black')
              // .style('opacity', '0.5')
              // .attr("visibility", "hidden")
            
          path.on("mouseover", function() {
              hoverBox
                .attr("x", hoverBoxX)
                .attr("y", hoverBoxY)
                
                .attr("visibility", "visible")
          });
  
          path.on("mouseout", function() {
              hoverBox.attr("visibility", "hidden")
          })
        })
        
  
        
        
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .sda {
    cursor: pointer;
  }
  </style>