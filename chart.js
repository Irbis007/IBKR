const chart = document.querySelector("#chart__canvas");

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

const ctx = chart.getContext("2d");

const backgroundTicksPlugin = {
  id: "backgroundTicks",
  beforeDraw: (chart) => {
    const {
      ctx,
      scales: { y },
    } = chart;

    y.ticks.forEach((tick, index) => {
      const chartWidth = chart.width;

      const rectWidth = 66;
      const rectHeight = 18;
      const triangleWidth = 7;
      const triangleHeight = 7;
      const startX = chartWidth - rectWidth - triangleWidth;
      const yPosition = y.getPixelForValue(tick.value) - rectHeight / 2;

      if (tick.value == 94) {
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
    });
  },
};

const customTickPlugin = {
  id: "customTicks",
  afterDraw: (chart) => {
    const {
      ctx,
      scales: { y },
    } = chart;

    y.ticks.forEach((tick) => {
      const chartWidth = chart.width;

      const rectWidth = 66;
      const triangleWidth = 8;
      const startX = chartWidth - rectWidth - triangleWidth + 5;

      const yPosition = y.getPixelForValue(tick.value) + 4;
      if (tick.value == 94) {
        ctx.fillStyle = "#fff";
        ctx.fillText("Avg. 94.05", startX, yPosition);
      }
    });
  },
};

const customPointsPlugin = {
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
				colorOutside = "rgba(5, 113, 57, .7)",
				colorInside = "rgba(62, 194, 124, .6)"
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

      if (index == 5) {
				drawCircle(8, 5)
      } else if (index == 18) {
				drawCircle(10, 7)
      } else if (index == 28) {
				drawCircle(8, 5)
      } else if (index == 53) {
				drawCircle(8.5, 5.5)
      } else if (index == 18) {
				drawCircle(10, 7)
      } else if (index == 60) {
				drawCircle(6, 1)
      } else if (index == 70) {
				drawCircle(8, 5)
      } else if (index == 77) {
				drawCircle(8, 5)
      } else if (index == 86) {
				drawCircle(7.5, 4.5, 'rgba(177, 16, 31, .7)', 'rgba(253, 91, 105, .8)')
      } else if (index == 112) {
				drawCircle(7.5, 4.5, 'rgba(177, 16, 31, .7)', 'rgba(253, 91, 105, .8)')
      } else if (index == 118) {
				drawCircle(8, 5)
      } else if (index == 135) {
				drawCircle(8, 5)
      } else if (index == 141) {
				drawCircle(7.5, 4.5, 'rgba(177, 16, 31, .7)', 'rgba(253, 91, 105, .8)')
      } else if (index == 147) {
				drawCircle(11, 8, 'rgba(177, 16, 31, .7)', 'rgba(253, 91, 105, .8)')
				drawCircle(5, 2)
      } else if (index == 159) {
				drawCircle(5, 2)
      } else if (index == 162) {
				drawCircle(7.5, 4.5, 'rgba(177, 16, 31, .7)', 'rgba(253, 91, 105, .8)')
      } else if (index == 175) {
				drawCircle(5, 2)
      } else if (index == 187) {
				drawCircle(11, 5, 'rgba(254, 214, 217, 1.7)', 'rgba(62, 194, 124, .7)')
				drawBorderDash(11)
				drawBorderDash(5, 'rgba(5, 113, 57, 1)')
      } 

      
    });
  },
};

new Chart(chart, {
  type: "line",
  data: {
    datasets: [
      {
        data: data.map((point) => ({ x: point.x, y: point.y })),
        borderWidth: 2,
        borderColor: "#146EB0",
        fill: "start",
        backgroundColor: () => {
          var gradientFill = ctx.createLinearGradient(
            0,
            0,
            0,
            ctx.canvas.height / 1.5
          );
          gradientFill.addColorStop(0, "#5998F533");
          gradientFill.addColorStop(1, "#ffffff00");

          return gradientFill;
        },
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  },
  options: {
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
      backgroundTicksPlugin,
    },
    scales: {
      x: {
        min: 1,
        max: 218,
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
        min: 80,
        max: 98,
        grid: {
          color: function (context) {
            if (context.tick.value === 94) {
              return "#146EB0";
            }
            return "#1F4C69";
          },
          tickLength: 0,
        },
        position: "right",
        type: "linear",
        border: {
          dash: [3],
          display: false,
        },
        ticks: {
          color: function (context) {
            return "#146EB0";
          },
          callback: function (value) {
            return value.toFixed(2);
          },
          font: {
            size: 12,
            family: "Proxima nova, sans-serif",
          },
          padding: 10,
        },
      },
    },
    events: [],
  },
  plugins: [backgroundTicksPlugin, customTickPlugin, customPointsPlugin],
});
