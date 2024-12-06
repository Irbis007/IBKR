

const cashTabWrappers = document.querySelector('.cash__tab')
const trumpTabWrappers = document.querySelector('.trump__tab')
const chartTabWrapper = document.querySelector('.canvas__tab')

const selectChartPeriod = document.querySelector('.select__chart-period')

let selectedChart = 'market Value'


let data = {
  marketData: [{ x: 0, y: 1 }],
  performanceData: [{ x: 0, y: 1 }],
  basisData: [{ x: 0, y: 1 }],
}


const portfolioNewsSummary = document.querySelector('#portfolio-summary')
const portfolioNewsArticles = document.querySelector('#portfolio-articles')


portfolioNewsSummary.appendChild(createSkeleton())

fetch('https://uxprototypes.org/ibkr/web-trader-dashboard/news-summary-portfolio.php?tickers=nvda,msft,meta,amzn,googl,nflx,intc,adbe,aapl,tsla').then((res) => {
  return res.json()
}).then(data => {
  const editedSummary = data.summary.replace(/\n/g, "<br>");
  portfolioNewsSummary.innerHTML = ''
  portfolioNewsSummary.innerHTML = editedSummary
})


portfolioNewsArticles.appendChild(createSkeleton())

fetch('https://api.tickertick.com/feed?q=z:aapl&n=10').then((res) => {
  return res.json()
}).then(data => {
  portfolioNewsArticles.innerHTML = ''
  console.log(data)
  createArticlesNews(data, portfolioNewsArticles)
})

const getData = (sheetName) => {
  const funcUrl = url + (sheetName ? `?sheets=${encodeURIComponent(sheetName)}` : '')
  const response = fetch(funcUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data
    })
    .catch(error => console.error('Error:', error));

  return response
}



class Store {
  constructor() {
    this.state = {
      marketData: [{ x: 0, y: 1 }],
      performanceData: [{ x: 0, y: 1 }],
      basisData: [{ x: 0, y: 1 }],
    }
  }

}
const store = new Store()

const periodButtons = document.querySelectorAll('.period__button')

let selectedPeriod = periodButtons[0].dataset.name

periodButtons.forEach((item) => {
  item.addEventListener('click', () => {
    removeActive(periodButtons, 'period__button_active')
    item.classList.add('period__button_active')
    selectedPeriod = item.dataset.name

    const marketData = resetData(data.marketData, null, 'total')
    const performanceData = resetData(data.performanceData, null, 'performance')
    const minMaxMarket = findMinMax(marketData, 'total')
    const minMaxPerformance = findMinMax(performanceData, 'total performance')

    marketChart.returnChart().destroy()
    performanceChart.returnChart().destroy()

    if (selectedPeriod != 'cumulative') {
      marketChart = new DrawChart(marketChartCanvas, marketChartCtx, resetData(marketData, null, 'total'), null, minMaxMarket[0], minMaxMarket[1], null, 'bar', 'total')
      marketChart.drawCart()


      performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, resetData(performanceData, null, 'total performance'), null, minMaxPerformance[0], minMaxPerformance[1], null, 'bar', 'total performance')
      performanceChart.drawCart()
    } else {
      marketChart = new DrawChart(marketChartCanvas, marketChartCtx, marketData, null, minMaxMarket[0], minMaxMarket[1], null, null, 'total')
      marketChart.drawCart()

      performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, performanceData, null, minMaxPerformance[0], minMaxPerformance[1], null, null, 'total performance')
      performanceChart.drawCart()
    }


  })
})


class CreateTabs {
  constructor(data, store, type) {
    this.data = data;
    this.store = store
    this.type = type
  }

  createPortfolioTabs = (tabWrapper) => {
    const tabButtons = document.createElement('div')
    tabButtons.classList.add('tab__buttons')

    const tabContents = document.createElement('div')
    tabContents.classList.add("tab__contents")

    for (let key in this.data) {
      const tabButton = document.createElement('button')
      tabButton.classList.add('tab__button')

      const tabContent = document.createElement('div')
      tabContent.classList.add('tab__content')
      if (key == 'Portfolio Snapshot') {
        tabButton.classList.add('tab__button_active')
        tabContent.classList.add('tab__content_active')
      }

      tabButton.textContent = key

      const table = new CreateTableFromData(this.data[key], tabContent, this.store, this.type)
      table.drawTable()

      tabButtons.appendChild(tabButton)
      tabContents.appendChild(tabContent)
    }

    const tabSetting = document.createElement('div')
    tabSetting.classList.add('tab__settings')
    const tabSettingImg = document.createElement('img')
    tabSettingImg.src = './images/tab-settings.svg'

    tabSetting.appendChild(tabSettingImg)

    tabButtons.appendChild(tabSetting)

    this.createTabEvents(tabButtons, tabContents)

    tabWrapper.appendChild(tabButtons)
    tabWrapper.appendChild(tabContents)
  }

  createTabEvents = (tabButtonsWrapper, tabContentsWrapper) => {
    const tabButtons = tabButtonsWrapper.querySelectorAll('.tab__button')
    const tabContents = tabContentsWrapper.querySelectorAll('.tab__content')

    const activeButtonClass = 'tab__button_active'
    const activeContentClass = 'tab__content_active'

    tabButtons.forEach((item, i) => {
      if (i == 0) {
        item.classList.add(activeButtonClass);
        tabContents[i].classList.add(activeContentClass);
      }

      item.addEventListener("click", () => {
        removeActive(tabButtons, activeButtonClass);
        removeActive(tabContents, activeContentClass);
        item.classList.add(activeButtonClass);
        tabContents[i].classList.add(activeContentClass);
      });
    })

  }
}


trumpTabWrappers.appendChild(createTableSkeleton())

getData('Watchlists').then(data => {
  const portfolioTabs = new CreateTabs(data, store, 'bottom')
  trumpTabWrappers.innerHTML = ''
  portfolioTabs.createPortfolioTabs(trumpTabWrappers)
})

const storePortfolioSnapshot = new Store()

cashTabWrappers.appendChild(createTableSkeleton())
getData('Portfolio Snapshot,Unrealized P&L,Realized P&L').then(data => {
  const portfolioTabs = new CreateTabs(data, store)
  cashTabWrappers.innerHTML = ''
  portfolioTabs.createPortfolioTabs(cashTabWrappers)
})



const marketChartCanvas = document.querySelector('#market-value')
const marketChartCtx = marketChartCanvas.getContext('2d')

let marketChart = new DrawChart(marketChartCanvas, marketChartCtx, initialData, null, 0, 10, null, null, 'y')
marketChart.drawCart()


const performanceChartCanvas = document.querySelector('#performance')
const performanceChartCtx = performanceChartCanvas.getContext('2d')

let performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, initialData, null, 0, 10, null, null, 'y')
performanceChart.drawCart()


const basisChartCanvas = document.querySelector('#cost-basis')
const basisChartCtx = basisChartCanvas.getContext('2d')

let basisChart = new DrawChart(basisChartCanvas, basisChartCtx, initialData, null, 0, 10, 'cost-basis', null, 'y')
basisChart.drawCart()




getData('Portfolio Value').then((res) => {

  data = { ...data, marketData: res }
  data = { ...data, performanceData: res }

  const minMaxMarket = findMinMax(res, 'total')
  marketChart.returnChart().destroy()

  if (selectedPeriod != 'cumulative') {
    marketChart = new DrawChart(marketChartCanvas, marketChartCtx, resetData(res, null, 'total'), null, minMaxMarket[0], minMaxMarket[1], null, 'bar', 'total')
  } else {
    marketChart = new DrawChart(marketChartCanvas, marketChartCtx, res, null, minMaxMarket[0], minMaxMarket[1], null, null, 'total')
  }


  marketChart.drawCart()
  marketChart.returnChart()


  const minMaxPerformance = findMinMax(res, 'total performance')
  data = { ...data, performanceData: res }

  performanceChart.returnChart().destroy()

  if (selectedPeriod != 'cumulative') {
    performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, resetData(res, null, 'total performance'), null, minMaxPerformance[0], minMaxPerformance[1], null, 'bar', 'total performance')
  } else {
    performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, res, null, minMaxPerformance[0], minMaxPerformance[1], null, null, 'total performance')
  }
  performanceChart.drawCart()
  performanceChart.returnChart()
})


getData('Transactions').then((res) => {
  const minMax = findMinMax(res, 'total cost basis')
  basisChart.returnChart().destroy()


  basisChart = new DrawChart(basisChartCanvas, basisChartCtx, res, res, minMax[0], minMax[1], 'cost-basis', null, 'total cost basis')



  basisChart.drawCart()
  basisChart.returnChart()
})



function findMinMax(data, ticker) {

  if (data.length < 1) {
    return [0, 0]
  }
  let min = data[0][ticker]
  let max = data[0][ticker]

  for (let i = 0; i < data.length; i++) {
    if (min > data[i][ticker]) {

      min = data[i][ticker]
    }
    if (max < data[i][ticker]) {
      max = data[i][ticker]
    }
  }

  return [min, max]
}


function resetData(data, x, y,) {
  let arr = []
  const sortedData = sortByDate(data)


  for (let i = 0; i < data.length; i++) {
    if (selectedPeriod == 'daily' && new Date(sortedData[i]['date']).getTime() <= new Date(sortedData[0]['date']).getTime() + 604800000 ||
      selectedPeriod == 'weekly' && new Date(sortedData[i]['date']).getTime() <= new Date(sortedData[0]['date']).getTime() + 6104800000 ||
      selectedPeriod == 'monthly' && new Date(sortedData[i]['date']).getTime() <= new Date(sortedData[0]['date']).getTime() + 18144000000 ||
      selectedPeriod == 'cumulative') {
      arr.push({ ...data[i], [y]: sortedData[i][y] })
    }
  }



  return arr
}



function sortByDate(data) {
  return data.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
}


class CreateTableFromData {
  constructor(data, tableWrapper, store, type) {
    this.data = data;
    this.type = type
    this.store = store;
    // this.tableLoading = false
    this.tableWrapper = tableWrapper;
    this.sortConfig = { key: Object.keys(this.data[0])[1], direction: 'asc' };
    this.maxPositive = Math.max(...this.data.map(item => (item[this.sortConfig.key] > 0 ? item[this.sortConfig.key] : 0)));
    this.maxNegative = Math.min(...this.data.map(item => (item[this.sortConfig.key] < 0 ? item[this.sortConfig.key] : 0)));

  }

  drawTable = () => {
    this.maxPositive = Math.max(...this.data.map(item => (item[this.sortConfig.key] > 0 ? item[this.sortConfig.key] : 0)));
    this.maxNegative = Math.min(...this.data.map(item => (item[this.sortConfig.key] < 0 ? item[this.sortConfig.key] : 0)));

    this.tableWrapper.innerHTML = ''
    const table = document.createElement('table')

    table.classList.add('table')

    const tableHead = document.createElement('thead')
    const tableBody = document.createElement('tbody')
    const tableFoot = document.createElement('tfoot')

    this.data.forEach((item, i) => {
      const trHead = document.createElement('tr')
      const tr = document.createElement('tr');

      let isDataset = false

      for (let key in item) {
        if (i == 0) {
          const th = document.createElement('th')
          th.textContent = key

          if (this.sortConfig.key == key) {
            const icon = document.createElement('img');
            icon.src = './images/filter-arrow.svg'

            if (this.sortConfig.direction !== 'asc') {
              icon.style.transform = 'rotate(180deg)'
            } else {
              icon.style.transform = 'rotate(0deg)'
            }

            th.appendChild(icon)
          }
          this.createTableSortEvent(th)

          trHead.appendChild(th)
          tableHead.appendChild(trHead)
        }

        const td = document.createElement('td')
        if (item[key] && typeof item[key] !== "string") {
          td.textContent = parseFloat(item[key]).toFixed(2)
        } else {
          td.textContent = item[key]
        }

        // add color to row
        if (this.sortConfig.key == key && item.Ticker != 'My Portfolio') {
          tr.style.background = this.getBackgroundColor(item[key], this.maxPositive, this.maxNegative)

        }

        if (!isDataset) {
          tr.setAttribute("data-name", item[key])
          isDataset = true
        }

        tr.appendChild(td)
      }

      switch (item.Ticker) {
        case 'My Portfolio':
          tr.addEventListener('click', () => {
            getData('Portfolio Value').then(res => {

              data = { ...data, marketData: res }
              data = { ...data, performanceData: res }

              const minMaxMarket = findMinMax(res, 'total')
              marketChart.returnChart().destroy()

              if (selectedPeriod != 'cumulative') {
                marketChart = new DrawChart(marketChartCanvas, marketChartCtx, resetData(res, null, 'total'), null, minMaxMarket[0], minMaxMarket[1], null, 'bar', 'total')
              } else {
                marketChart = new DrawChart(marketChartCanvas, marketChartCtx, res, null, minMaxMarket[0], minMaxMarket[1], null, null, 'total')
              }


              marketChart.drawCart()
              marketChart.returnChart()


              const minMaxPerformance = findMinMax(res, 'total performance')
              data = { ...data, performanceData: res }

              performanceChart.returnChart().destroy()

              if (selectedPeriod != 'cumulative') {
                performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, resetData(res, null, 'total performance'), null, minMaxPerformance[0], minMaxPerformance[1], null, 'bar', 'total performance')
              } else {
                performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, res, null, minMaxPerformance[0], minMaxPerformance[1], null, null, 'total performance')
              }
              performanceChart.drawCart()
              performanceChart.returnChart()
            })

            portfolioNewsSummary.innerHTML = ''
            portfolioNewsSummary.appendChild(createSkeleton())

            fetch('https://uxprototypes.org/ibkr/web-trader-dashboard/news-summary-portfolio.php?tickers=nvda,msft,meta,amzn,googl,nflx,intc,adbe,aapl,tsla').then((res) => {
              return res.json()
            }).then(data => {
              const editedSummary = data.summary.replace(/\n/g, "<br>");
              portfolioNewsSummary.innerHTML = ''
              portfolioNewsSummary.innerHTML = editedSummary
            })

            portfolioNewsArticles.innerHTML = ''
            portfolioNewsArticles.appendChild(createSkeleton())

            fetch('https://api.tickertick.com/feed?q=z:aapl&n=10').then((res) => {
              return res.json()
            }).then(data => {
              portfolioNewsArticles.innerHTML = ''
              console.log(data)
              createArticlesNews(data, portfolioNewsArticles)
            })
          })
          tableHead.appendChild(tr)
          this.createRowsHoverEvents(tr)
          break;
        case 'CASH':
          tableFoot.appendChild(tr)
          break;
        default:
          this.createRowsHoverEvents(tr)
          this.createRowsClickEvents(tr)
          tableBody.appendChild(tr)
          break;
      }
    })

    table.appendChild(tableHead)
    table.appendChild(tableBody)
    table.appendChild(tableFoot)

    this.tableWrapper.appendChild(table)
  }

  createRowsHoverEvents(row) {
    row.addEventListener("mouseenter", () => {
      let overlay = document.createElement("div");
      overlay.classList.add("hover-overlay");
      overlay.style.display = "flex";

      let button = document.createElement("button");
      button.textContent = "Trade";

      overlay.appendChild(button);
      row.appendChild(overlay);
    });
    row.addEventListener("mouseleave", () => {
      let overlay = row.querySelector(".hover-overlay");

      if (overlay) {
        overlay.style.display = "none";
        row.removeChild(overlay);
      }
    });
  }


  createRowsClickEvents = (row) => {
    row.addEventListener('click', () => {

      if (this.type !== 'bottom') {
        // this.setTableLoading()
        getData(row.dataset.name).then(res => {
          data = { ...data, marketData: res }
          data = { ...data, performanceData: res }
          let marketKey = 'balance'
          let performanceKey = 'total performance'

          const minMaxMarket = findMinMax(res, marketKey)

          marketChart.returnChart().destroy()
          if (selectedPeriod != 'cumulative') {
            marketChart = new DrawChart(marketChartCanvas, marketChartCtx, resetData(res, null, marketKey), null, minMaxMarket[0], minMaxMarket[1], null, 'bar', marketKey)
          } else {
            marketChart = new DrawChart(marketChartCanvas, marketChartCtx, res, null, minMaxMarket[0], minMaxMarket[1], null, null, marketKey)
          }
          marketChart.drawCart()


          const minMaxPerformance = findMinMax(res, performanceKey)

          performanceChart.returnChart().destroy()
          if (selectedPeriod != 'cumulative') {
            performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, resetData(res, null, performanceKey), null, minMaxPerformance[0], minMaxPerformance[1], null, 'bar', performanceKey)
          } else {
            performanceChart = new DrawChart(performanceChartCanvas, performanceChartCtx, res, null, minMaxPerformance[0], minMaxPerformance[1], null, null, performanceKey)
          }
          performanceChart.drawCart()
        }).finally(() => {

          // this.setTableLoading(false)
        })

        let haveActive = false

        chartTabButtons.forEach((item, i) => {
          if (i != 3) {
            chartTabButtons[i].style.display = 'block';
            chartTabContents[i].style.display = 'block';
            if (item.classList.contains('tab__button_active')) {
              haveActive = true
            }
          } else {
            chartTabButtons[i].style.display = 'none';
            chartTabContents[i].style.display = 'none';
          }
        })
        if (!haveActive) {
          chartTabButtons[0].classList.add('tab__button_active')
          chartTabContents[0].classList.add('tab__content_active')
        }
        selectChartPeriod.style.display = 'flex'
      } else {
        chartTabButtons.forEach((item, i) => {
          if (i == 3) {
            chartTabButtons[i].style.display = 'block';
            chartTabContents[i].style.display = 'block';
            chartTabButtons[i].classList.add('tab__button_active')
            chartTabContents[i].classList.add('tab__content_active')

          } else {
            chartTabButtons[i].style.display = 'none';
            chartTabContents[i].style.display = 'none';
          }
        })
        selectChartPeriod.style.display = 'none'
      }
      portfolioNewsSummary.innerHTML = ''
      portfolioNewsSummary.appendChild(createSkeleton())
      fetch(`https://uxprototypes.org/ibkr/web-trader-dashboard/news-summary-portfolio.php?tickers=${row.dataset.name.toLowerCase()}`).then(res => {
        return res.json()
      }).then(data => {
        const editedSummary = data.summary.replace(/\n/g, "<br>");
        portfolioNewsSummary.innerHTML = editedSummary
      })
      portfolioNewsArticles.innerHTML = ''
      portfolioNewsArticles.appendChild(createSkeleton())
      fetch(`https://api.tickertick.com/feed?q=z:${row.dataset.name.toLowerCase()}&n=10`).then((res) => {
        return res.json()
      }).then(data => {
        portfolioNewsArticles.innerHTML = ''
        createArticlesNews(data, portfolioNewsArticles)
      })
    })
  }

  createTableSortEvent = (header) => {
    function sortData(data, key, direction) {
      return [...data].sort((a, b) => {
        const aValue = isNaN(a[key]) ? a[key] : Number(a[key]);
        const bValue = isNaN(b[key]) ? b[key] : Number(b[key]);

        if (typeof aValue === 'string') {
          return direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
      });
    }

    header.addEventListener('click', () => {
      const key = header.textContent;

      if (this.sortConfig.key === key) {
        this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortConfig.key = key;
        this.sortConfig.direction = 'asc';
      }

      this.data = sortData(this.data, this.sortConfig.key, this.sortConfig.direction);
      this.drawTable();
    });
  }
  calculateOpacity = (value, max, min) => {
    if (value > 0) {
      return 0.1 + (0.9 * value) / max;
    } else if (value < 0) {
      return 0.1 + (0.9 * Math.abs(value)) / Math.abs(min);
    }
    return 0;
  };

  getBackgroundColor = (value, maxPositive, minNegative) => {
    const opacity = this.calculateOpacity(value, maxPositive, minNegative);
    if (value > 0) {
      return `rgba(0, 255, 0, ${opacity})`;
    } else if (value < 0) {
      return `rgba(255, 0, 0, ${opacity})`;
    }
    return 'transparent';
  };

  // setTableLoading = (loading = true) => {
  //   this.tableLoading = loading

  //   const loadingOverflow = document.createElement('div')
  //   const spinner = document.createElement('div')

  //   loadingOverflow.classList.add('table__overflow')

  //   spinner.classList.add('spinner')

  //   spinner.style.animation = 'tableSpinner 1s infinite'

  //   loadingOverflow.appendChild(spinner)

  //   if (this.tableLoading) {
  //     this.tableWrapper.appendChild(loadingOverflow)
  //   } else {
  //     this.tableWrapper.removeChild(this.tableWrapper.childNodes[1])
  //   }
  // }
}



function createArticlesNews(data, wrapper) {
  const articleList = document.createElement('ul')
  articleList.classList.add('articles__tab-content')

  data.stories.forEach((item, i) => {
    if (item.title && item.description) {
      const articleItem = document.createElement('li')
      const articleTitle = document.createElement('h4')
      const articleDescription = document.createElement('p')
      articleItem.classList.add('articles__tab-item')
      articleTitle.classList.add('articles__tab-title')
      articleDescription.classList.add('articles__tab-description')

      articleTitle.textContent = item.title
      articleDescription.textContent = item.description
      articleItem.appendChild(articleTitle)
      articleItem.appendChild(articleDescription)
      articleList.appendChild(articleItem)
    }
  })
  wrapper.appendChild(articleList)
}





function createSkeleton() {
  const skeletonWrapper = document.createElement('div')

  skeletonWrapper.innerHTML = `

      <div class="o-media__body">
        <div class="o-vertical-spacing">
          <h3 class="blog-post__headline">
            <span class="skeleton-box" style="width:55%;"></span>
          </h3>
          <p>
            <span class="skeleton-box" style="width:80%;"></span>
            <span class="skeleton-box" style="width:90%;"></span>
            <span class="skeleton-box" style="width:83%;"></span>
            <span class="skeleton-box" style="width:80%;"></span>
            <span class="skeleton-box" style="width:80%;"></span>
            <span class="skeleton-box" style="width:90%;"></span>
            <span class="skeleton-box" style="width:83%;"></span>
            <span class="skeleton-box" style="width:80%;"></span>
          </p>
        </div>
      </div>
  `
  return skeletonWrapper
}

function createTableSkeleton() {
  const skeletonWrapper = document.createElement('div')

  skeletonWrapper.innerHTML = `

      <div class="o-media__body table--skeleton" style="margin-top: 12px;">
        <div class="o-vertical-spacing">
          <h3 class="blog-post__headline">
            <span class="skeleton-box" style="width:100%; height: 40px"></span>
          </h3>
          <p style="margin-top: 7px;">
            <span class="skeleton-box" style="width:100%; height: 250px;"></span>
          </p>
        </div>
      </div>
  `
  return skeletonWrapper
}

const chartTabButtons = document.querySelectorAll('.canvas__tab .tab__button')
const chartTabContents = document.querySelectorAll('.canvas__tab .tab__content')


chartTabButtons.forEach((item, i) => {
  item.addEventListener('click', () => {
    removeActive(chartTabButtons, 'tab__button_active')
    removeActive(chartTabContents, 'tab__content_active')

    item.classList.add('tab__button_active')
    chartTabContents[i].classList.add('tab__content_active')
    selectedChart = item.textContent
    checkChart()
  })
})


function checkChart() {
  if (selectedChart == 'Market Value' || selectedChart == 'Performance') {
    chartTabButtons.forEach((item, i) => {
      chartTabButtons[i].style.display = 'block';
      chartTabContents[i].style.display = 'block';
      if (i == 3) {
        chartTabButtons[i].style.display = 'none';
        chartTabContents[i].style.display = 'none';
      }
    })
    selectChartPeriod.style.display = 'flex'
  } else if (selectedChart == 'Cost Basis') {
    chartTabButtons.forEach((item, i) => {
      chartTabButtons[i].style.display = 'block';
      chartTabContents[i].style.display = 'block';
      if (i == 3) {
        chartTabButtons[i].style.display = 'none';
        chartTabContents[i].style.display = 'none';
      }
    })
    selectChartPeriod.style.display = 'none'

  } else if (selectedChart == 'Quote Detail') {
    chartTabButtons.forEach((item, i) => {
      chartTabButtons[i].style.display = 'block';
      chartTabContents[i].style.display = 'block';
      if (i != 3) {
        chartTabButtons[i].style.display = 'none';
        chartTabContents[i].style.display = 'none';
      }
    })
    selectChartPeriod.style.display = 'none'

  }
}


checkChart()




// this function removing 
removeActive = (list, className) => {
  list.forEach((item) => {
    item.classList.remove(className);
  });
};

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
