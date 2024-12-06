
// class for creating charts


let newMarketChart

class DrawChart {
  constructor(canvas, ctx, data, events, min, max, yTicksType, chartType, yDataKey) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.data = data;
    this.events = events;
    this.min = min;
    this.max = max;
    this.yTicksType = yTicksType;
    this.chart;
    this.chartType = chartType;
    this.yDataKey = yDataKey
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

  // custom chart's plugin for create background right value 
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

      if (this.activeLineYVal !== null) {
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

  // custom chart's plugin for create text right value 
  customTickPlugin = {
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
  // custom chart's plugin for create event points
  customPointsPlugin = {
    id: "customPoints",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
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
        if (this.events) {
          if (this.events[index].trade == 'Buy') {
            drawCircle(2.5, 4, 'rgba(0, 128, 0, 0.5)', 'rgba(0, 128, 0, 0.5)')
          } else {
            drawCircle(2.5, 4, 'rgba(255, 0, 0, 0.5)', 'rgba(255, 0, 0, 0.5)')
          }
        }
      });
    },
  };

  activeLineY = null;
  activeLineYVal = null;

  returnChart = () => {
    return this.chart
  }


  resetData = (data, y) => {
    const resetData = data.map((item, i) => {
      if (item[y] < 0) {
        if (item[y] * -1 > this.max) {
          this.max = item[y] * -1
        }
        this.min = 0
        return { ...item, [y]: item[y] * -1 }
      } else {
        return item
      }
    })
    return resetData
  }
  // function for draw chart
  drawCart = () => {
    const colors = this.chartType ? this.data.length ? this.data.map((item) => {
      if (item[this.yDataKey] > 0) {
        return 'green'
      }
      return 'red'
    }) : '#146EB0' : '#146EB0'
    this.chart = new Chart(this.canvas, {
      type: this.chartType ? this.chartType : 'line',
      data: {
        datasets: [{
          data: this.chartType ? this.resetData(this.data, this.yDataKey).map((item, i) => {
            return { x: i, y: item[this.yDataKey] }
          }) : this.data.map((item, i) => {
            return { x: i, y: item[this.yDataKey] }
          }),
          borderWidth: 2,
          borderColor: colors,
          fill: "start",

          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',

          backgroundColor: (q, w) => {
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
        }]
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
            enabled: this.yTicksType ? true : false,
            callbacks: {
              title: (tooltipData) => {
                return `${this.data[tooltipData[0].dataIndex]['ticker'].toUpperCase()} $${this.data[tooltipData[0].dataIndex][this.yDataKey].toLocaleString('en-US')}`;
              },
              label: (tooltipData) => {
                return `${this.data[tooltipData.dataIndex]['shares']} Shares ${this.data[tooltipData.dataIndex]['cost basis']}`;
              },
              footer: (tooltipData) => {
                const date = new Date(this.data[tooltipData[0].dataIndex]['date'])
                const month = date.getUTCMonth()
                const day = date.getUTCDate()
                const year = date.getUTCFullYear()

                return `${month}/${day}/${year}`;
              },
            },
            backgroundColor: "#146EB0",
            titleColor: "#fff",
            bodyColor: "#fff",
            labelColor: '#fff',
            titleFont: { weight: "bold" },
            padding: 10,
            cornerRadius: 10,
            borderWidth: "0",
            displayColors: false
          },
        },
        onHover: (event, elements, ctx) => {
          const h = ctx.height - 12

          const y = Math.max(12, Math.min(h, event.y));
          const position = ((((h) - (y)) / (h - 20)) * (this.max - this.min) + this.min).toFixed(2);

          this.activeLineY = position;
          this.activeLineYVal = position;

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
            // adapters: {
            //   date: {
            //     locale: enUS,
            //   },
            // },
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
                if (this.yTicksType == 'market') {
                  return value.toFixed(2);
                }
                if (this.yTicksType == 'performance') {
                  return Math.floor(value) + '%'
                }
                return Math.floor(value)
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


