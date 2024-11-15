class DrawChart {
  constructor(canvas, ctx, data, events, min, max, yTicksType ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.data = data;
    this.events = events;
    this.min = min;
    this.max = max;
    this.yTicksType = yTicksType;
    this.chart
  }
   
  hoverLinePlugin = {
    id: 'hoverLine',
    beforeDraw: (chart) => {
      const { ctx, chartArea, scales: { x, y } } = chart;
  
      if (this.activeLineY !== null) {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([3, 3]); // Устанавливаем пунктирную линию
        ctx.moveTo(chartArea.left, y.getPixelForValue(this.activeLineY));
        ctx.lineTo(chartArea.right, y.getPixelForValue(this.activeLineY));
        ctx.strokeStyle = '#146EB0'; // Цвет линии
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    }
  };
  
  
  backgroundTicksPlugin = {
    id: "backgroundTicks",
    afterDraw: (chart) => {
      const {
        ctx,
        scales: { y },
      } = chart;
        const chartWidth = chart.width;
  
        const rectWidth = 66;
        const rectHeight = 18;
        const triangleWidth = 7;
        const triangleHeight = 7;
        const startX = chartWidth - rectWidth - triangleWidth;
        const yPosition = y.getPixelForValue(this.activeLineYVal) - rectHeight / 2;
  
        if (this.activeLineYVal !== null ) {
          ctx.fillStyle = "#146EB0";
          ctx.beginPath();
          ctx.moveTo(startX, yPosition);
          ctx.lineTo(startX + rectWidth, yPosition);
          ctx.lineTo(startX + rectWidth, yPosition + rectHeight);
          ctx.lineTo(startX, yPosition + rectHeight);
          ctx.closePath();
          ctx.fill();
  
          ctx.beginPath();
          const triangleX = startX - triangleWidth;
          const triangleY = yPosition + rectHeight / 2;
  
          ctx.moveTo(triangleX, triangleY);
          ctx.lineTo(triangleX + triangleWidth, triangleY + triangleHeight);
          ctx.lineTo(triangleX + triangleWidth, triangleY - triangleHeight);
          ctx.closePath();
          ctx.fill();
        }
      }
  };
  
  customTickPlugin = {
    id: "customTicks",
    afterDraw: (chart) => {
      const {
        ctx,
        scales: { y },
      } = chart;
        const chartWidth = chart.width;
  
        const rectWidth = 66;
        const triangleWidth = 8;
        const startX = chartWidth - rectWidth - triangleWidth + 5;
  
        const yPosition = y.getPixelForValue(this.activeLineYVal) + 4;
        if (this.activeLineYVal !== null) {
          let tickValue = "Avg. " + this.activeLineYVal

          ctx.fillStyle = "#fff";
          ctx.fillText(tickValue, startX, yPosition);
        }
    },
  };
  
  customPointsPlugin = {
    id: "customPoints",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const dataset = chart.data.datasets[0];
      const meta = chart.getDatasetMeta(0);
  
      meta.data.forEach((point, index) => {
        const x = point.x - 1;
        const y = point.y;
  
        const drawCircle = (
          widthOutside,
          widthInside,
          colorOutside,
          colorInside 
        ) => {
          ctx.beginPath();
          ctx.arc(x, y, widthOutside, 0, 2 * Math.PI);
          ctx.fillStyle = colorOutside;
          ctx.fill();
          ctx.restore();
    
          ctx.beginPath();
          ctx.arc(x, y, widthInside, 0, 2 * Math.PI);
          ctx.fillStyle = colorInside;
          ctx.fill();
          ctx.restore();
        };
  
        const drawBorderDash = (
          width,
          color = 'rgba(177, 16, 31, 1)',
        ) => {
          ctx.setLineDash([2, 2]); 
          ctx.strokeStyle = color; 
          ctx.lineWidth = 2.5;        
  
          ctx.beginPath();
          ctx.arc(x, y, width - 1, 0, Math.PI * 2); 
          ctx.stroke(); 
        }
  
        if(this.events){
          this.events.forEach((item, i) => {
          
            if(item.index == index){
              const {widthOutside, widthInside, colorOutside, colorInside} = item.properties
              
              if(item.index == 187) {
                drawCircle(widthOutside, widthInside, colorOutside, colorInside)
                drawBorderDash(widthOutside)
                drawBorderDash(widthInside)
              } else{
                drawCircle(widthOutside, widthInside, colorOutside, colorInside)
              }
            }
          })
        }
      });
    },
  };
  
  activeLineY = null;
  activeLineYVal = null;

  returnChart = () => {
    return this.chart
  }
  

  drawCart = () => {
    this.chart = new Chart(this.canvas, {
      type: "line",
      data: {
        datasets: [
          {
            data: this.data.map(({x,y}) => ({ x, y })),
            borderWidth: 2,
            borderColor: "#146EB0",
            fill: "start",
        
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            tension: 0.2,
            
            backgroundColor: (q,w) => {
              var gradientFill = this.ctx.createLinearGradient(
                0,
                0,
                0,
                this.ctx.canvas.height / 1.5
              );
              gradientFill.addColorStop(0, "#5998F533");
              gradientFill.addColorStop(1, "#ffffff00");
            
              return gradientFill;
            }
          }
        ]
      },
      options: {
        animation: false,
        layout: {
          padding: 0,
        },
        plugins: {
          legend: {
            display: false,
          },
          chartAreaBorder: {
            borderColor: "transparent",
            borderWidth: 2,
          },
          backgroundTicksPlugin: this.backgroundTicksPlugin,
          tooltip: {
            enabled: false, // Disables the tooltip
          },
        },
        onHover: (event, elements, ctx) => {
          if (elements.length && this.events) {
            this.events.forEach(item => {
              if(elements[0].index == item.index) {
                const index = elements[0].index;
                this.activeLineY = this.data[index].y;
      
                this.activeLineYVal = this.data[index].y;
              }
            })
          } else {
            this.activeLineY = null; 
            this.activeLineYVal = null;
          }
          this.chart.update(); 
        },
        scales: {
          x: {
            min: 1,
            max: this.data.length,
            grid: {
              color: "transparent",
            },
            type: "linear",
            position: "bottom",
            border: {
              display: false,
            },
      
            maxTicksLimit: 10,
            minTicksLimit: 10,
            ticks: {
              display: false,
            },
          },
          y: {
            min: this.min,
            max: this.max,
            grid: {
              color: "#1F4C69",
              tickLength: 0,
            },
            position: "right",
            type: "linear",
            border: {
              dash: [3],
              display: false,
            },
            ticks: {
              color: "#146EB0",
              callback: (value) => {
                if(this.yTicksType == 'market'){
                  return value.toFixed(2);
                }
                if(this.yTicksType == 'performance'){
                  return value + '%'
                }
                return value
              },
              font: {
                size: 12,
                family: "Proxima nova, sans-serif",
              },
              padding: 10,
            },
          },
        },
      },
      plugins: [this.backgroundTicksPlugin, this.customTickPlugin, this.customPointsPlugin, this.hoverLinePlugin],
    });
  }
}

const marketChart = document.querySelector("#market__chart");
const marketChartCtx = marketChart.getContext("2d");

const data = [
  { x: 1, y: 82.7 },
  { x: 2, y: 82.9 },
  { x: 3, y: 82.2 },
  { x: 4, y: 82.1 },
  { x: 5, y: 81.7 },
  { x: 6, y: 82.2 },
  { x: 7, y: 82 },
  { x: 8, y: 83.95 },
  { x: 9, y: 82.85 },
  { x: 10, y: 82.8 },
  { x: 11, y: 82.9 },
  { x: 12, y: 81.2 },
  { x: 13, y: 82.7 },
  { x: 14, y: 81.9 },
  { x: 15, y: 81.8 },
  { x: 16, y: 80.9 },
  { x: 17, y: 81 },
  { x: 18, y: 81.8 },
  { x: 19, y: 82.05 },
  { x: 20, y: 81.3 },
  { x: 21, y: 81 },
  { x: 22, y: 81.95 },
  { x: 23, y: 80.95 },
  { x: 24, y: 81.5 },
  { x: 25, y: 81.7 },
  { x: 26, y: 82.5 },
  { x: 27, y: 82.6 },
  { x: 28, y: 84.4 },
  { x: 29, y: 81.9 },
  { x: 30, y: 83.6 },
  { x: 31, y: 83.55 },
  { x: 32, y: 86.7 },
  { x: 33, y: 86.4 },
  { x: 34, y: 86.9 },
  { x: 35, y: 87.9 },
  { x: 36, y: 86.2 },
  { x: 37, y: 86.4 },
  { x: 38, y: 84.7 },
  { x: 39, y: 86.1 },
  { x: 40, y: 85.7 },
  { x: 41, y: 86.2 },
  { x: 42, y: 86.1 },
  { x: 43, y: 87.75 },
  { x: 44, y: 87.55 },
  { x: 45, y: 87.57 },
  { x: 46, y: 87.77 },
  { x: 47, y: 86.8 },
  { x: 48, y: 86.9 },
  { x: 49, y: 87.3 },
  { x: 50, y: 88.05 },
  { x: 51, y: 88 },
  { x: 52, y: 89 },
  { x: 53, y: 88.8 },
  { x: 54, y: 87.9 },
  { x: 55, y: 88.8 },
  { x: 56, y: 89.8 },
  { x: 57, y: 89.6 },
  { x: 58, y: 91 },
  { x: 59, y: 91.2 },
  { x: 60, y: 90.2 },
  { x: 61, y: 90.7 },
  { x: 62, y: 89.7 },
  { x: 63, y: 89.5 },
  { x: 64, y: 89.7 },
  { x: 65, y: 89.1 },
  { x: 66, y: 90.2 },
  { x: 67, y: 89.7 },
  { x: 68, y: 89.55 },
  { x: 69, y: 89.5 },
  { x: 70, y: 89.4 },
  { x: 71, y: 91.3 },
  { x: 72, y: 90.4 },
  { x: 73, y: 87.2 },
  { x: 74, y: 87.8 },
  { x: 75, y: 87.3 },
  { x: 76, y: 87.6 },
  { x: 77, y: 86.5 },
  { x: 78, y: 86.2 },
  { x: 79, y: 87.6 },
  { x: 80, y: 87.75 },
  { x: 81, y: 86.9 },
  { x: 82, y: 88 },
  { x: 83, y: 90 },
  { x: 84, y: 90.3 },
  { x: 85, y: 89.7 },
  { x: 86, y: 89.6 },
  { x: 87, y: 89.2 },
  { x: 88, y: 90.7 },
  { x: 89, y: 90.4 },
  { x: 90, y: 91.6 },
  { x: 91, y: 92.7 },
  { x: 92, y: 90.65 },
  { x: 93, y: 90.7 },
  { x: 94, y: 90.2 },
  { x: 95, y: 90.17 },
  { x: 96, y: 89.8 },
  { x: 97, y: 90.75 },
  { x: 98, y: 92.9 },
  { x: 99, y: 93.4 },
  { x: 100, y: 92.9 },
  { x: 101, y: 91.8 },
  { x: 102, y: 92.3 },
  { x: 103, y: 92.4 },
  { x: 104, y: 93.4 },
  { x: 105, y: 93.35 },
  { x: 106, y: 92.4 },
  { x: 107, y: 93.3 },
  { x: 108, y: 92.2 },
  { x: 109, y: 92.1 },
  { x: 110, y: 92.6 },
  { x: 111, y: 93.3 },
  { x: 112, y: 92.6 },
  { x: 113, y: 93.8 },
  { x: 114, y: 92.6 },
  { x: 115, y: 93.3 },
  { x: 116, y: 91.6 },
  { x: 117, y: 92.25 },
  { x: 118, y: 90.4 },
  { x: 119, y: 92.15 },
  { x: 120, y: 93.7 },
  { x: 121, y: 93.75 },
  { x: 122, y: 92.1 },
  { x: 123, y: 93.2 },
  { x: 124, y: 93.3 },
  { x: 125, y: 91.7 },
  { x: 126, y: 91.75 },
  { x: 127, y: 92.1 },
  { x: 128, y: 92.2 },
  { x: 129, y: 92 },
  { x: 130, y: 91.98 },
  { x: 131, y: 92.8 },
  { x: 132, y: 91 },
  { x: 133, y: 91.8 },
  { x: 134, y: 91.65 },
  { x: 135, y: 91.6 },
  { x: 136, y: 87.99 },
  { x: 137, y: 89 },
  { x: 138, y: 88.5 },
  { x: 139, y: 89.8 },
  { x: 140, y: 89.76 },
  { x: 141, y: 89.86 },
  { x: 142, y: 89.57 },
  { x: 143, y: 91 },
  { x: 144, y: 90.9 },
  { x: 145, y: 92.2 },
  { x: 146, y: 92.1 },
  { x: 147, y: 92.1 },
  { x: 148, y: 92.6 },
  { x: 149, y: 91 },
  { x: 150, y: 90.8 },
  { x: 151, y: 90.1 },
  { x: 152, y: 90.8 },
  { x: 153, y: 92.5 },
  { x: 154, y: 92.45 },
  { x: 155, y: 92.6 },
  { x: 156, y: 92.55 },
  { x: 157, y: 92.4 },
  { x: 158, y: 93.2 },
  { x: 159, y: 94 },
  { x: 160, y: 93.5 },
  { x: 161, y: 93.6 },
  { x: 162, y: 96.5 },
  { x: 163, y: 96.8 },
  { x: 164, y: 96.45 },
  { x: 165, y: 95.8 },
  { x: 166, y: 96.6 },
  { x: 167, y: 96 },
  { x: 168, y: 96.65 },
  { x: 169, y: 96.3 },
  { x: 170, y: 94.3 },
  { x: 171, y: 94.35 },
  { x: 172, y: 94.38 },
  { x: 173, y: 94 },
  { x: 174, y: 93.85 },
  { x: 175, y: 93.7 },
  { x: 176, y: 94.1 },
  { x: 177, y: 93.2 },
  { x: 178, y: 93.1 },
  { x: 179, y: 94.5 },
  { x: 180, y: 94.46 },
  { x: 181, y: 94.47 },
  { x: 182, y: 95.2 },
  { x: 183, y: 94 },
  { x: 184, y: 95.1 },
  { x: 185, y: 94.8 },
  { x: 186, y: 94.8 },
  { x: 187, y: 95.25 },
  { x: 188, y: 94.75 },
  { x: 189, y: 96.2 },
  { x: 190, y: 97 },
  { x: 191, y: 95.76 },
  { x: 192, y: 95.9 },
  { x: 193, y: 93.7 },
  { x: 194, y: 95.5 },
  { x: 195, y: 95.3 },
  { x: 196, y: 95.37 },
  { x: 197, y: 94.2 },
  { x: 198, y: 94 },
  { x: 199, y: 93 },
  { x: 200, y: 93.05 },
  { x: 201, y: 92.7 },
  { x: 202, y: 93.3 },
  { x: 203, y: 92.7 },
  { x: 204, y: 92.2 },
  { x: 205, y: 92.1 },
  { x: 206, y: 93.03 },
  { x: 207, y: 89.1 },
  { x: 208, y: 89.4 },
  { x: 209, y: 88.8 },
  { x: 210, y: 91.2 },
  { x: 211, y: 92.3 },
  { x: 212, y: 93.2 },
  { x: 213, y: 92.9 },
  { x: 214, y: 90.7 },
  { x: 215, y: 91 },
  { x: 216, y: 90.4 },
  { x: 217, y: 90.45 },
  { x: 218, y: 90.55 },
];

const chartEvent = [
  {
    index: 5,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 18,
    properties: {
      widthOutside: 10,
      widthInside: 7,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 28,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 53,
    properties: {
      widthOutside: 8.5,
      widthInside: 5.5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 60,
    properties: {
      widthOutside: 6,
      widthInside: 1,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 70,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 77,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 86,
    properties: {
      widthOutside: 7.5,
      widthInside: 4.5,
      colorOutside: "rgba(177, 16, 31, .7)",
      colorInside: "rgba(253, 91, 105, .8)"
    }
  },
  {
    index: 118,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 135,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 141,
    properties: {
      widthOutside: 7.5,
      widthInside: 4.5,
      colorOutside: "rgba(177, 16, 31, .7)",
      colorInside: "rgba(253, 91, 105, .8)"
    }
  },
  {
    index: 147,
    properties: {
      widthOutside: 11,
      widthInside: 8,
      colorOutside: "rgba(177, 16, 31, .7)",
      colorInside: "rgba(253, 91, 105, .8)"
    }
  },
  {
    index: 147,
    properties: {
      widthOutside: 5,
      widthInside: 2,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 159,
    properties: {
      widthOutside: 5,
      widthInside: 2,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 162,
    properties: {
      widthOutside: 7.5,
      widthInside: 4.5,
      colorOutside: "rgba(177, 16, 31, .7)",
      colorInside: "rgba(253, 91, 105, .8)"
    }
  },
  {
    index: 175,
    properties: {
      widthOutside: 5,
      widthInside: 2,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 187,
    properties: {
      widthOutside: 11,
      widthInside: 5,
      colorOutside: "rgba(254, 214, 217, 1.7)",
      colorInside: "rgba(62, 194, 124, .7)"
    }
  },

]

let newMarketChart = new DrawChart(marketChart, marketChartCtx, data, chartEvent, 80, 98, 'market')

newMarketChart.drawCart()


const performanceChart = document.querySelector("#performance__chart");
const performanceChartCtx = marketChart.getContext("2d");


const secondData = [
  { x: 1, y: 6.89 },
  { x: 2, y: 7.16 },
  { x: 3, y: 5.99 },
  { x: 4, y: 5.87 },
  { x: 5, y: 5.32 },
  { x: 6, y: 5.99 },
  { x: 7, y: 5.73 },
  { x: 8, y: 8.63 },
  { x: 9, y: 7.29 },
  { x: 10, y: 7.23 },
  { x: 11, y: 7.16 },
  { x: 12, y: 3.96 },
  { x: 13, y: 6.82 },
  { x: 14, y: 5.45 },
  { x: 15, y: 5.38 },
  { x: 16, y: 4.22 },
  { x: 17, y: 4.49 },
  { x: 18, y: 5.38 },
  { x: 19, y: 5.70 },
  { x: 20, y: 4.36 },
  { x: 21, y: 4.49 },
  { x: 22, y: 5.32 },
  { x: 23, y: 4.29 },
  { x: 24, y: 4.91 },
  { x: 25, y: 5.32 },
  { x: 26, y: 6.34 },
  { x: 27, y: 6.47 },
  { x: 28, y: 8.19 },
  { x: 29, y: 5.45 },
  { x: 30, y: 7.95 },
  { x: 31, y: 7.89 },
  { x: 32, y: 12.16 },
  { x: 33, y: 11.80 },
  { x: 34, y: 12.70 },
  { x: 35, y: 13.93 },
  { x: 36, y: 11.43 },
  { x: 37, y: 11.80 },
  { x: 38, y: 8.75 },
  { x: 39, y: 11.30 },
  { x: 40, y: 10.78 },
  { x: 41, y: 11.43 },
  { x: 42, y: 11.30 },
  { x: 43, y: 13.56 },
  { x: 44, y: 13.30 },
  { x: 45, y: 13.34 },
  { x: 46, y: 13.63 },
  { x: 47, y: 12.57 },
  { x: 48, y: 12.70 },
  { x: 49, y: 13.14 },
  { x: 50, y: 14.46 },
  { x: 51, y: 14.39 },
  { x: 52, y: 15.83 },
  { x: 53, y: 15.56 },
  { x: 54, y: 13.93 },
  { x: 55, y: 15.56 },
  { x: 56, y: 16.76 },
  { x: 57, y: 16.49 },
  { x: 58, y: 19.00 },
  { x: 59, y: 19.23 },
  { x: 60, y: 17.82 },
  { x: 61, y: 18.48 },
  { x: 62, y: 16.62 },
  { x: 63, y: 16.35 },
  { x: 64, y: 16.62 },
  { x: 65, y: 15.56 },
  { x: 66, y: 17.82 },
  { x: 67, y: 16.62 },
  { x: 68, y: 16.49 },
  { x: 69, y: 16.35 },
  { x: 70, y: 16.22 },
  { x: 71, y: 19.37 },
  { x: 72, y: 18.09 },
  { x: 73, y: 13.00 },
  { x: 74, y: 13.83 },
  { x: 75, y: 13.14 },
  { x: 76, y: 13.56 },
  { x: 77, y: 11.57 },
  { x: 78, y: 11.43 },
  { x: 79, y: 13.56 },
  { x: 80, y: 13.56 },
  { x: 81, y: 12.70 },
  { x: 82, y: 14.39 },
  { x: 83, y: 17.55 },
  { x: 84, y: 17.95 },
  { x: 85, y: 16.62 },
  { x: 86, y: 16.49 },
  { x: 87, y: 15.69 },
  { x: 88, y: 18.48 },
  { x: 89, y: 18.09 },
  { x: 90, y: 20.49 },
  { x: 91, y: 22.04 },
  { x: 92, y: 18.62 },
  { x: 93, y: 18.48 },
  { x: 94, y: 17.82 },
  { x: 95, y: 17.77 },
  { x: 96, y: 16.76 },
  { x: 97, y: 18.95 },
  { x: 98, y: 22.89 },
  { x: 99, y: 23.61 },
  { x: 100, y: 22.89 },
  { x: 101, y: 21.56 },
  { x: 102, y: 22.16 },
  { x: 103, y: 22.30 },
  { x: 104, y: 23.61 },
  { x: 105, y: 23.55 },
  { x: 106, y: 22.30 },
  { x: 107, y: 23.47 },
  { x: 108, y: 21.95 },
  { x: 109, y: 21.82 },
  { x: 110, y: 22.75 },
  { x: 111, y: 23.47 },
  { x: 112, y: 22.75 },
  { x: 113, y: 24.35 },
  { x: 114, y: 22.75 },
  { x: 115, y: 23.47 },
  { x: 116, y: 20.49 },
  { x: 117, y: 22.23 },
  { x: 118, y: 18.09 }
];

const secondChartEvent = [
  {
    index: 5,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 18,
    properties: {
      widthOutside: 10,
      widthInside: 7,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 28,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 53,
    properties: {
      widthOutside: 8.5,
      widthInside: 5.5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 60,
    properties: {
      widthOutside: 6,
      widthInside: 1,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 70,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 77,
    properties: {
      widthOutside: 8,
      widthInside: 5,
      colorOutside: "rgba(5, 113, 57, .7)",
      colorInside: "rgba(62, 194, 124, .6)"
    }
  },
  {
    index: 86,
    properties: {
      widthOutside: 7.5,
      widthInside: 4.5,
      colorOutside: "rgba(177, 16, 31, .7)",
      colorInside: "rgba(253, 91, 105, .8)"
    }
  },
]

const newPerformanceChart = new DrawChart(performanceChart, performanceChartCtx, secondData, secondChartEvent, 0, 40, 'performance')

newPerformanceChart.returnChart()

newPerformanceChart.drawCart()





function createChartData(min, max, maxStep = 2) {
  let arr = []
  let lastMin = min
  for(let i = 0; i <= 60; i++){
    let randomDig = (Math.random() * (maxStep * 2)) - maxStep
    if(min > lastMin + randomDig) {
      lastMin += randomDig * -1
    } else if(max < lastMin + randomDig) {
      lastMin += randomDig * -1
    } else {
      lastMin += randomDig
    }
    
    
    arr.push({x: i+1, y: parseFloat(lastMin.toFixed(2))})
  }

  return arr
}

function createChartEvents() {
  let initialPointPosition = Math.floor(Math.random() * (5 - 2 + 1)) + 2

  let arr = []
  for(;initialPointPosition < 119;) {
    let randomDig =  Math.floor(Math.random() * (9- 2 + 1)) + 2 

    if(initialPointPosition + randomDig > 60) {
      break
    } 
    arr.push(
      {
        index: initialPointPosition,
        properties: {
          widthOutside: 8,
          widthInside: 5,
          colorOutside: randomDig == 2 || randomDig == 4 ? "rgba(177, 16, 31, .7)" : "rgba(5, 113, 57, .7)",
          colorInside: randomDig == 2 || randomDig == 4 ? "rgba(253, 91, 105, .8)" : "rgba(62, 194, 124, .6)"
        }
      },
    )

    initialPointPosition += randomDig
  }

  return arr
}


function editMarketChart(data, events, minY, maxY) {
  newMarketChart.returnChart().destroy()

  newMarketChart = new DrawChart(marketChart, marketChartCtx, data, events, minY, maxY , 'market')
  newMarketChart.drawCart()
}




