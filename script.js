// class for creating events for tabs
class createTabsEvents {
  constructor(buttons, contents) {
    this.buttons = buttons;
    this.contents = contents;
    this.buttonActiveClass = "tab__button_active";
    this.contentActiveClass = "tab__content_active";
		console.log(this.buttons)
		console.log(this.contents)
  }


	// function for adding events to tab
  addEvents = () => {
    this.buttons.forEach((item, i) => {
      if (i == 0) {
        item.classList.add(this.buttonActiveClass);
        this.contents[i].classList.add(this.contentActiveClass);
      }

      item.addEventListener("click", () => {
        removeActive(this.buttons, this.buttonActiveClass);
        removeActive(this.contents, this.contentActiveClass);
        item.classList.add(this.buttonActiveClass);
        this.contents[i].classList.add(this.contentActiveClass);
      });
    });
  };
}


const tabsClassArr = [
	{
		tabClass: ".cash__tab .tab__button",
		contentClass: ".cash__tab .tab__content",
	},
	{
		tabClass: ".trump__tab .tab__button",
		contentClass: ".trump__tab .tab__content",
	},
	{
		tabClass: ".canvas__tab .tab__button",
		contentClass: ".canvas__tab .tab__content",
	},
	{
		tabClass: ".summary__tab .tab__button",
		contentClass: ".summary__tab .tab__content",
	},
	{
		tabClass: ".articles__tab .tab__button",
		contentClass: ".articles__tab .tab__content",
	},
]



tabsClassArr.forEach((item, i) => {
	const tabButtons = document.querySelectorAll(item.tabClass);
	const tabContents = document.querySelectorAll(item.contentClass);
	
	const createdTab = new createTabsEvents(
		tabButtons,
		tabContents
	);
	createdTab.addEvents()
})


// this data will use to filter and creating top tables

let portfolioData = [
  {
    ticker: "NVDA",
    position: 137,
    last: 451.23,
    changePercent: 1.63,
    dailyPL: 532.18,
    unrealizedPL: 22874.99,
    mktValue: 61740.31,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "MSFT",
    position: 312,
    last: 328.75,
    changePercent: 0.91,
    dailyPL: 297.45,
    unrealizedPL: 14983.42,
    mktValue: 102412.56,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "META",
    position: 27,
    last: 322.48,
    changePercent: 1.57,
    dailyPL: 84.93,
    unrealizedPL: 11968.24,
    mktValue: 8642.37,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "AMZN",
    position: 97,
    last: 131.57,
    changePercent: 2.43,
    dailyPL: 241.88,
    unrealizedPL: 7145.38,
    mktValue: 12762.88,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "GOOGL",
    position: 204,
    last: 2785.43,
    changePercent: 0.76,
    dailyPL: 211.89,
    unrealizedPL: 3815.78,
    mktValue: 568376.49,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "NFLX",
    position: 118,
    last: 492.66,
    changePercent: -3.72,
    dailyPL: -438.5,
    unrealizedPL: -178.64,
    mktValue: 13256.76,
    opacity: "1",
    isNegative: true,
  },
  {
    ticker: "INTC",
    position: 245,
    last: 54.12,
    changePercent: -1.24,
    dailyPL: -67.25,
    unrealizedPL: -693.85,
    mktValue: 13256.76,
    opacity: "1",
    isNegative: true,
  },
  {
    ticker: "ADBE",
    position: 133,
    last: 579.98,
    changePercent: -2.38,
    dailyPL: -312.89,
    unrealizedPL: -1076.33,
    mktValue: 77832.41,
    opacity: "1",
    isNegative: true,
  },
  {
    ticker: "AAPL",
    position: 109,
    last: 172.34,
    changePercent: -0.49,
    dailyPL: -105.54,
    unrealizedPL: -4472.13,
    mktValue: 17512.48,
    opacity: "1",
    isNegative: true,
  },
  {
    ticker: "TSLA",
    position: 89,
    last: 1104.56,
    changePercent: -1.92,
    dailyPL: -574.1,
    unrealizedPL: -4861.27,
    mktValue: 101156.98,
    opacity: "1",
    isNegative: true,
  },
];

let trumpMoversData = [
  {
    ticker: "DWAC",
    price: 15.27,
    marketCap: 605.3,
    PERatio: 14.5,
    changePercent: 1.25,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "RUM",
    price: 1.48,
    marketCap: 102.7,
    PERatio: 22.1,
    changePercent: 0.69,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "ZGYH",
    price: 10.15,
    marketCap: 198.4,
    PERatio: 18.7,
    changePercent: 0.6,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "BENE",
    price: 0.52,
    marketCap: 47.9,
    PERatio: 43.3,
    changePercent: 0.53,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "GROM",
    price: 11.08,
    marketCap: 249.5,
    PERatio: 18.9,
    changePercent: 0.43,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "CRKN",
    price: 12.37,
    marketCap: 315.6,
    PERatio: 21.3,
    changePercent: 0.3,
    opacity: "1",
    isNegative: false,
  },
  {
    ticker: "CFVI",
    price: 8.05,
    marketCap: 988.7,
    PERatio: 10.4,
    changePercent: -1.59,
    opacity: "1",
    isNegative: true,
  },
  {
    ticker: "PHUN",
    price: 20.22,
    marketCap: 1195.3,
    PERatio: 15.2,
    changePercent: -2.22,
    opacity: "1",
    isNegative: true,
  },
  {
    ticker: "MARK",
    price: 0.83,
    marketCap: 31.2,
    PERatio: 27.3,
    changePercent: -5.12,
    opacity: "1",
    isNegative: true,
  },
  {
    ticker: "FUN",
    price: 0.27,
    marketCap: 9.8,
    PERatio: 33.8,
    changePercent: -5.28,
    opacity: "1",
    isNegative: true,
  },
];


// class for filter data and after redraw table
class CreateFilteredTable {
  constructor(table, data, type) {
    this.table = table;
    this.data = data;
    this.type = type;
    this.ordASC = 1;
    this.ordField = "";
  }


	// this function utilized for check if table already filtered
  selectOrd = (id) => {
    if (id === this.ordField) {
      this.ordASC *= -1;
    } else {
      this.ordField = id;
      this.ordASC = 1;
    }
  };


	// this function utilized for filter table rows and add rows color  
  updateData = (data, filterKey) => {
    let positiveValues = data.filter((item) => item[filterKey] >= 0);
    let negativeValues = data.filter((item) => item[filterKey] < 0);

    let maxPositive = Math.max(
      ...positiveValues.map((item) => item[filterKey])
    );
    let minPositive = Math.min(
      ...positiveValues.map((item) => item[filterKey])
    );
    let maxNegative = Math.max(
      ...negativeValues.map((item) => item[filterKey])
    );
    let minNegative = Math.min(
      ...negativeValues.map((item) => item[filterKey])
    );

    function calculateOpacity(value, min, max) {
      if (max === min) return 1;
      return 0.2 + ((1 - 0.2) * (value - min)) / (max - min);
    }

    positiveValues.forEach((item) => {
      item.isNegative = false;
      item.opacity = calculateOpacity(
        item[filterKey],
        minPositive,
        maxPositive
      );
    });

    negativeValues.forEach((item) => {
      item.isNegative = true;
      item.opacity = calculateOpacity(
        item[filterKey],
        maxNegative,
        minNegative
      );
    });

    return [...positiveValues, ...negativeValues];
  };


	// this function utilized for adding an events to table thead rows (click)
	addOnTheadTrEvent  = () => {

		const thTr = document.querySelectorAll('.thead_tr')
		thTr.forEach(row => {
			this.addEventOnTr(row);
			row.addEventListener("click", () => {
		
				editMarketChart(createChartData(56, 65), createChartEvents(), 56, 65);
				editPerformanceChart(createChartData(56, 65), createChartEvents(), 56, 65);
				removeActive(cashTableTds, "row_active");
				removeActive(trumpTableTds, "row_active");
				row.classList.add("row_active");
			});
		})
	}

	// this function utilized for adding an events to table rows (click)
  addEventOnTrs = () => {
    const trs = this.table.querySelectorAll("tr");

    if (this.type == "portfolio") {
      trs.forEach((row) => {
        this.addEventOnTr(row);

        row.addEventListener("click", () => {
          editMarketChart(createChartData(56, 65), createChartEvents(), 56, 65);
          editPerformanceChart(createChartData(56, 65), createChartEvents(), 56, 65);
					
          removeActive(document.querySelectorAll('.thead_tr'), "row_active");
					removeActive(cashTableTds, "row_active");
					removeActive(trumpTableTds, "row_active");
          row.classList.add("row_active");
        });
      });
    } else {
      trs.forEach((row) => {
        this.addEventOnTr(row);
        row.addEventListener("click", () => {
          editMarketChart(createChartData(56, 65), null, 56, 65);
          editPerformanceChart(createChartData(56, 65), null, 56, 65);
          removeActive(document.querySelectorAll('.thead_tr'), "row_active");
					removeActive(cashTableTds, "row_active");
					removeActive(trumpTableTds, "row_active");
          row.classList.add("row_active");
        });
      });
    }
  };

	// this function utilized for adding an events to table rows (click)
  addEventOnTr(row) {
    row.addEventListener("mouseenter", () => {
      let overlay = document.createElement("div");
      overlay.classList.add("hover-overlay");
      let button = document.createElement("button");
      button.textContent = "Trade";
      overlay.appendChild(button);
      row.appendChild(overlay);
      overlay.style.display = "flex";
			console.log(3)
    });
		row.addEventListener("mouseleave", () => {
			let overlay = row.querySelector(".hover-overlay");
			if (overlay) {
				overlay.style.display = "none";
				row.removeChild(overlay);
			}
		});
  }

	// this function utilized for filtering array and add arrow icon by click on th
  orderPortfolio = (e) => {
    if (e.target && e.target.id) {
      this.selectOrd(e.target.id);

      switch (e.target.id) {
        case "ticker":
          if (this.ordASC > 0) {
            e.target.innerHTML +=
              '<img class="filter__arrow" src="./images/filter-arrow.svg"/>';
            this.data = this.data.sort((a, b) =>
              a.ticker.localeCompare(b.ticker)
            );
          } else {
            e.target.innerHTML +=
              '<img class="filter__arrow_active" src="./images/filter-arrow.svg" alt="filter icon"/>';
            this.data = this.data.sort((a, b) =>
              b.ticker.localeCompare(a.ticker)
            );
          }
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].opacity = 0;
          }
          break;
        default:
          this.data = this.updateData(this.data, e.target.id);
          if (this.ordASC > 0) {
            e.target.innerHTML +=
              '<img class="filter__arrow" src="./images/filter-arrow.svg"/>';
            this.data = this.data.sort(
              (a, b) => a[e.target.id] - b[e.target.id]
            );
          } else {
            e.target.innerHTML +=
              '<img class="filter__arrow_active" src="./images/filter-arrow.svg" alt="filter icon"/>';
            this.data = this.data.sort(
              (a, b) => b[e.target.id] - a[e.target.id]
            );
          }
      }
      this.drawTable(this.data);
			this.addEventOnTrs()
    }
  };

	// this table utilized for draw filtered table
  drawTable(data) {
    this.table.innerHTML = `
			${data
        .map((item) => {
          if (this.type == "portfolio") {
            return `
							<tr style="background-color: ${
                item.isNegative
                  ? `rgba(216, 14, 31, ${item.opacity})`
                  : `rgba(1, 135, 64, ${item.opacity})`
              };">
								<td>${item.ticker}</td>
								<td>${item.position}</td>
								<td>${item.last}</td>
								<td>${item.changePercent}</td>
								<td>${item.dailyPL}</td>
								<td>${item.unrealizedPL.toLocaleString("en-US")}</td>
								<td>${item.mktValue.toLocaleString("en-US")}</td>
							</tr>
						`;
          } else {
            return `
							<tr style="background-color: ${
                item.isNegative
                  ? `rgba(216, 14, 31, ${item.opacity})`
                  : `rgba(1, 135, 64, ${item.opacity})`
              };">
								<td>${item.ticker}</td>
								<td>${item.price}</td>
								<td>${item.marketCap}</td>
								<td>${item.PERatio}</td>
								<td>${item.changePercent}%</td>
							</tr>
						`;
          }
        })
        .join("")}
		`;
  }
}
	// this function removing 
removeActive = (list, className) => {
	list.forEach((item) => {
		item.classList.remove(className);
	});
};

const tablesData = [
	{
		tableBodyClass: '.portfolio tbody',
		tableData: portfolioData,
		tableType: 'portfolio',
		filterType: 'unrealizedPL',
		tableThClass: ".portfolio th"
	},
	{
		tableBodyClass: '.trump-movers tbody',
		tableData: trumpMoversData,
		tableType: 'trump_movers',
		filterType: 'changePercent',
		tableThClass: ".trump-movers th"
	},
	{
		tableBodyClass: '.unrealized__PL tbody',
		tableData: portfolioData,
		tableType: 'portfolio',
		filterType: 'unrealizedPL',
		tableThClass: ".unrealized__PL th"
	},
	{
		tableBodyClass: '.lots tbody',
		tableData: portfolioData,
		tableType: 'portfolio',
		filterType: 'unrealizedPL',
		tableThClass: ".lots th"
	},
	{
		tableBodyClass: '.traders tbody',
		tableData: portfolioData,
		tableType: 'portfolio',
		filterType: 'unrealizedPL',
		tableThClass: ".traders th"
	},
	{
		tableBodyClass: '.orders tbody',
		tableData: portfolioData,
		tableType: 'portfolio',
		filterType: 'unrealizedPL',
		tableThClass: ".orders th"
	},
	{
		tableBodyClass: '.healthcare tbody',
		tableData: trumpMoversData,
		tableType: 'trump-movers',
		filterType: 'changePercent',
		tableThClass: ".healthcare th"
	},
	{
		tableBodyClass: '.ai__bets tbody',
		tableData: trumpMoversData,
		tableType: 'trump-movers',
		filterType: 'changePercent',
		tableThClass: ".ai__bets th"
	},
	{
		tableBodyClass: '.realized__PL tbody',
		tableData: portfolioData,
		tableType: 'portfolio',
		filterType: 'unrealizedPL',
		tableThClass: ".realized__PL th"
	},
]

tablesData.forEach((item, i) => {
	const tableBody = document.querySelector(item.tableBodyClass);
	const createdTable = new CreateFilteredTable(
		tableBody,
		item.tableData,
		item.tableType
	);
	
	item.tableData = createdTable.updateData(item.tableData, item.filterType);
	createdTable.drawTable(item.tableData);
	createdTable.addEventOnTrs()
	createdTable.addOnTheadTrEvent()

	const th = document.querySelectorAll(item.tableThClass);

	th.forEach((item) => {
		item.addEventListener("click", (e) => {
			removeImages(th);
			createdTable.orderPortfolio(e);
		});
	});
})


const cashTableTds = document.querySelectorAll(".cash__tab tbody tr");
const trumpTableTds = document.querySelectorAll(".trump__tab tbody tr");

function removeImages(list) {
  list.forEach((item) => {
    const img = item.querySelector("img");
    if (img) {
      img.remove();
    }
  });
}


// these functions utilized for create random numbers at header

function createRandomDigit() {
  return Math.floor(Math.random() * 5) + 1;
}

function createRandomFloatDigit() {
  return (Math.floor(Math.random() * 11) + -5).toFixed(2);
}

function changeValue(value, calculateValue, calculatePercent) {
  if (value && calculateValue && calculatePercent) {
    const originalVal = +value.textContent.replace(/,/g, "");
    setInterval(() => {
      const randomDig = +createRandomFloatDigit();

      if (!Number.isNaN(+calculateValue.textContent.replace(/[+\-%]/g, ""))) {
        let editedCalculateVal = (
          parseFloat(calculateValue.textContent.replace(/,/g, "")) + randomDig
        ).toLocaleString("en-US");
        let editedValue = +originalVal + randomDig;
        const percent = ((editedCalculateVal * 100) / originalVal).toFixed(2);

        value.textContent = editedValue.toLocaleString("en-US");

        calculatePercent.textContent = percent;

        if (percent > 0) {
          calculateValue.textContent = "+" + editedCalculateVal;
        } else {
          calculateValue.textContent = editedCalculateVal;
        }

        if (editedCalculateVal < 0) {
          calculateValue.parentElement.classList.add("text_red");
          calculateValue.parentElement.classList.remove("text_green");
        } else {
          calculateValue.parentElement.classList.add("text_green");
          calculateValue.parentElement.classList.remove("text_red");
        }
      }
    }, createRandomDigit() * 1000);
  } else {
    setInterval(() => {
      const randomDig = +createRandomFloatDigit();
      value.textContent = (
        parseFloat(value.textContent.replace(/,/g, "")) + randomDig
      ).toLocaleString("en-US");
    }, createRandomDigit() * 1000);
  }
}

const headerAnalyticsValues = document.querySelectorAll(
  ".header__analytics-value"
);
const headerAnalyticsCalculateValue = document.querySelectorAll(
  ".header__analytics-calculate__value"
);
const headerAnalyticsCalculatePercent = document.querySelectorAll(
  ".header__analytics-calculate__percent"
);

headerAnalyticsValues.forEach((item, i) => {
  changeValue(
    item,
    headerAnalyticsCalculateValue[i],
    headerAnalyticsCalculatePercent[i]
  );
  headerAnalyticsCalculatePercent[i].parentElement;
});

const dailyPL = document.querySelector(".content__header-value__daily");
const unrealizedPL = document.querySelector(
  ".content__header-value__unrealized"
);
const realizedPL = document.querySelector(".content__header-value__realized");

changeValue(dailyPL);
changeValue(unrealizedPL);
changeValue(realizedPL);

const headerDaily = document.querySelector(".header_daily");

const calcDaily = (element) => {
  setInterval(() => {
    let originalString = element.textContent;

    let number = parseInt(originalString.replace(/[,]/g, ""), 10);
    let randomNum = Math.floor(Math.random() * 11) - 5;

    number += randomNum;

    let sign = number >= 0 ? "+" : "-";
    let formattedNumber = Math.abs(number).toString().padStart(9, "0");

    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let updatedString = sign + formattedNumber;

    element.textContent = updatedString;
  }, createRandomDigit() * 1000);
};

calcDaily(headerDaily);
