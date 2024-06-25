<template>
  <div class="gene-struct-container">
    <div class="vis-container"></div>
    <!-- <div class="options-container" v-if="downloadvisible">
      <el-button size="mini" type="primary" @click="downloadPNG">Download PNG</el-button>
      <el-button size="mini" type="primary" @click="downloadSvg">Download SVG</el-button>
      <el-button size="mini" type="primary" @click="downloadPDF">Download PDF</el-button>
    </div> -->
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'GeneStructVis',

  data() {
    return {
      svg: null,
      option: {
        width: 0,
        minWidth: 1200,
        height: 0,
        flagText: {
          width: 80,
          textStyle: {
            fontSize: 18,
            fontWeight: 'normal',  // 'normal'
          }
        },
        margin: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 40
        },
        titleArea: {
          height: 0,  // 这里的高度需要考虑鼠标悬停文本框
          title: 'Gene struct plot',
          titleStyle: {
            fontSize: 18,
            fontWeight: 'bold',  // 'normal'
          }
        },
        drawArea: {
          height: 50,
          arrow: {
            header: {
              width: 40,
              height: 40
            },
            tail: {
              height: 20
            }
          },
          rect: {
            height: 20
          }
        },
        legend: {
          rowArea: {
            height: 60,
            fontSize: 14,
            fontWeight: 'normal',
            space: 10,
            unitspace: 20,
            rect: {
              width: 20,
              height: 20
            }
          }
        }
      },

      drawData: null,
      testData: {
        length: 3000,
        data: {
          cds: [
            {
              gene: 'cds_gene1',
              start: 30,
              end: 125,
              forward: 1,
            },
            {
              gene: 'cds_gene2',
              start: 300,
              end: 1256,
              forward: -1
            }
          ],
          // vf: [
          //   {
          //     gene: 'vf_gene1',
          //     start: 350,
          //     end: 1876,
          //     forward: 1,
          //   },
          //   {
          //     gene: 'vf_gene2',
          //     start: 1900,
          //     end: 1920,
          //     forward: -1,
          //   },
          // ],
          // resfinder: [
          //   {
          //     gene: 'resfinder_gene1',
          //     start: 660,
          //     end: 1080,
          //     forward: -1,
          //   },
          //   {
          //     gene: 'resfinder_gene1',
          //     start: 1756,
          //     end: 2300,
          //     forward: 1,
          //   },
          // ],
          region: [
            {
              gene: 'region_gene1',
              start: 20,
              end: 689,
            },
            {
              gene: 'region_gene2',
              start: 2000,
              end: 2680,
            },
          ]
        }
        
      }
    };
  },

  mounted() {
    this.svg = d3.select('.vis-container').append('svg')
    this.initWidthAndHeight(this.testData)
    this.initSvg(this.drawData)
  },

  methods: {
    initSvg(structData) {
      // 初始化svg
      this.svg
        .attr('width', this.option.width)
        .attr('height', this.option.height)
        .style('border', '1px solid red')
      
      // 比例尺
      const xAxisLength = this.option.width - this.option.margin.left - this.option.flagText.width - this.option.margin.right
      const xScale = d3.scaleLinear()
        .domain([0, structData.length])
        .range([0, xAxisLength])
        .nice()

      // 画坐标轴
      const xAxis = d3.axisBottom(xScale)
      const xAxisGroup = this.svg.append('g').attr('id', 'xAxis-group')
      let drawRows = 0
      Object.keys(structData.data).forEach((item) => {
        if(structData.data[item].length) {
          drawRows++
        }
      })
      xAxisGroup
        .attr('transform', `translate(${
          this.option.margin.left + this.option.flagText.width
        }, ${
          this.option.margin.top + this.option.titleArea.height + drawRows * this.option.drawArea.height
        })`)
        .call(xAxis)
      const lastPoint = d3.select('#xAxis-group .tick:last-child>text')
      lastPoint.text(lastPoint.text() + ' (bp)')

      // 绘制
      let num = 0
      Object.keys(structData.data).forEach((item) => {
        this.svg.append('line')
        .attr('x1', this.option.margin.left + this.option.flagText.width)
        .attr('y1', this.option.margin.top)
        .attr('x2', this.option.margin.left + this.option.flagText.width + 100)
        .attr('y2', this.option.margin.top)
        .attr('stroke-width', '1')
        .attr('stroke', '#000')
        this.svg.append('line')
        .attr('x1', this.option.margin.left + this.option.flagText.width)
        .attr('y1', this.option.margin.top + this.option.drawArea.height )
        .attr('x2', this.option.margin.left + this.option.flagText.width + 100)
        .attr('y2', this.option.margin.top + this.option.drawArea.height)
        .attr('stroke-width', '1')
        .attr('stroke', 'red')

        const textGroup =  this.svg
          .append('g')
          .attr('class', 'text-group')
        const textNode = textGroup
          .append('text')
          .text(item)
          .attr('class', 'flag-text')
          .style('font-size', this.option.flagText.textStyle.fontSize)
          .style('font-weight', this.option.flagText.textStyle.fontWeight)
        const textWidth = textNode.node().getBBox().width
        const textHeight = textNode.node().getBBox().height
        textGroup
          .attr('transform', `translate(${
          this.option.margin.left + this.option.flagText.width - textWidth - 10
        }, ${
          this.option.margin.top + this.option.titleArea.height + this.option.titleArea.height + this.option.drawArea.height * (num + 1) - this.option.drawArea.height * 0.5 + textHeight * 0.25
        })`)
        const geneExpGroup =  this.svg
          .append('g')
          .attr('class', 'gene-exp-group')
        if(item === 'region') {
          structData.data[item].forEach((meta) => {
            geneExpGroup
              .append('rect')
              .attr('class', 'draw-rect')
              .attr('width', xScale(meta.end - meta.start))
              .attr('height', this.option.drawArea.rect.height)
              .attr('fill', 'red')
              .attr('transform', `translate(${
                this.option.margin.left + this.option.flagText.width + xScale(meta.start)
              }, ${
                this.option.margin.top + this.option.titleArea.height + this.option.drawArea.height * num + this.option.drawArea.height * 0.5 - this.option.drawArea.rect.height * 0.5
              })`)
          })
        } else {
          structData.data[item].forEach((meta) => {
            const start = xScale(item.start)
            const end = xScale(item.end)
            const arrowHWscale = xScale(this.arrowAttr.headerWidth)
            const start_y = this.svgAttr.height - this.svgPadding.bottom - this.arrowAttr.yForX
            let path = ''
            
          })
          
        }
        num++
        
      })
      
    },

    initWidthAndHeight(structData) {
      const length = structData.length
      const data = structData.data
      let drawRows = 0
      Object.keys(data).forEach((item) => {
        if(data[item].length > 0) {
          drawRows = drawRows + 1
        }
      })
      this.option.height = this.option.margin.top + 
                           this.option.titleArea.height + 
                           drawRows * this.option.drawArea.height + 
                           drawRows * this.option.legend.rowArea.height + 
                           this.option.margin.bottom

      const tempData = {}
      Object.keys(data).forEach((item) => {
        if(data[item].length) {
          tempData[item] = []
          data[item].forEach((meta) => {
            const text = this.svg
              .append('text')
              .text(meta.gene)
              .attr('class', 'combined-text')
              .style('font-size', this.option.legend.rowArea.fontSize)
              .style('font-weight', this.option.legend.rowArea.fontWeight)
            const textWidth = text.node().getBBox().width
            d3.select('.combined-text').remove()
            tempData[item].push({
              ...meta,
              textWidth: textWidth
            })
          })
        }
      })

      this.drawData = {
        length: length,
        data: tempData
      }

      let maxTextLength = 0
      let key = ''
      Object.keys(tempData).forEach((item) => {
        let currentTextLength = 0
        tempData[item].forEach((meta) => {
          currentTextLength += meta.textWidth
        })
        if(currentTextLength > maxTextLength) {
          maxTextLength = currentTextLength
          key = item
        }
      })

      let tempWidth = this.option.margin.left +
                      this.option.flagText.width +
                      this.option.margin.right
      tempData[key].forEach((item) => {
        tempWidth += this.option.legend.rowArea.space + item.textWidth + this.option.legend.rowArea.unitspace
      })

      if(tempWidth > this.option.minWidth) {
        this.option.width = tempWidth
      } else {
        this.option.width = this.option.minWidth
      }
    }
  },
};
</script>