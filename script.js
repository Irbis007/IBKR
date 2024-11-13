
class createTabsEvents {
	constructor(buttons, contents,) {
		this.buttons = buttons
		this.contents = contents
		this.buttonActiveClass = "tab__button_active"
		this.contentActiveClass = "tab__content_active"
	}

	removeActive = (list, className) => {
		list.forEach(item => {
			item.classList.remove(className)
		});
	}

	addEvents = () => {
		this.buttons.forEach((item, i) => {
			if (i == 0) {
				item.classList.add(this.buttonActiveClass);
				this.contents[i].classList.add(this.contentActiveClass);
			}
		
			item.addEventListener('click', () => {
				this.removeActive(this.buttons, this.buttonActiveClass)
				this.removeActive(this.contents, this.contentActiveClass)
				item.classList.add(this.buttonActiveClass);
				this.contents[i].classList.add(this.contentActiveClass);
			})
		});
	}
}

const cashTabButtons = document.querySelectorAll(".cash__tab .tab__button");
const cashTabContents = document.querySelectorAll(".cash__tab .tab__content");

const portfolioCreatedTab = new createTabsEvents(cashTabButtons, cashTabContents)
portfolioCreatedTab.addEvents()

const trumpTabButtons = document.querySelectorAll(".trump__tab .tab__button");
const trumpTabContents = document.querySelectorAll(".trump__tab .tab__content");

const trumpMoversCreatedTab = new createTabsEvents(trumpTabButtons, trumpTabContents)
trumpMoversCreatedTab.addEvents()

const summaryTabButtons = document.querySelectorAll(".summary__tab .tab__button");
const summaryTabContents = document.querySelectorAll(".summary__tab .tab__content");

const summaryMoversCreatedTab = new createTabsEvents(summaryTabButtons, summaryTabContents)
summaryMoversCreatedTab.addEvents()

const articlesTabButtons = document.querySelectorAll(".articles__tab .tab__button");
const articlesTabContents = document.querySelectorAll(".articles__tab .tab__content");

const articlesCreatedTab = new createTabsEvents(articlesTabButtons, articlesTabContents)
articlesCreatedTab.addEvents()

const canvasTabButtons = document.querySelectorAll(".canvas__tab .tab__button");
const canvasTabContents = document.querySelectorAll(".canvas__tab .tab__content");

const canvasCreatedTab = new createTabsEvents(canvasTabButtons, canvasTabContents)
canvasCreatedTab.addEvents()





let portfolioData = [
	{
		ticker: 'NVDA',
		position: 137,
		last: 451.23,
		changePercent: 1.63,
		dailyPL: 532.18,
		unrealizedPL: 22874.99,
		mktValue: 61740.31,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'MSFT',
		position: 312,
		last: 328.75,
		changePercent: 0.91,
		dailyPL: 297.45,
		unrealizedPL: 14983.42,
		mktValue: 102412.56,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'META',
		position: 27,
		last: 322.48,
		changePercent: 1.57,
		dailyPL: 84.93,
		unrealizedPL: 11968.24,
		mktValue: 8642.37,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'AMZN',
		position: 97,
		last: 131.57,
		changePercent: 2.43,
		dailyPL: 241.88,
		unrealizedPL: 7145.38,
		mktValue: 12762.88,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'GOOGL',
		position: 204,
		last: 2785.43,
		changePercent: 0.76,
		dailyPL: 211.89,
		unrealizedPL: 3815.78,
		mktValue: 568376.49,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'NFLX',
		position: 118,
		last: 492.66,
		changePercent: -3.72,
		dailyPL: -438.50,
		unrealizedPL: -178.64,
		mktValue: 13256.76,
		opacity: '1',
		isNegative: true
	},
	{
		ticker: 'INTC',
		position: 245,
		last: 54.12,
		changePercent: -1.24,
		dailyPL: -67.25,
		unrealizedPL: -693.85,
		mktValue: 13256.76,
		opacity: '1',
		isNegative: true
	},
	{
		ticker: 'ADBE',
		position: 133,
		last: 579.98,
		changePercent: -2.38,
		dailyPL: -312.89,
		unrealizedPL: -1076.33,
		mktValue: 77832.41,
		opacity: '1',
		isNegative: true
	},
	{
		ticker: 'AAPL',
		position: 109,
		last: 172.34,
		changePercent: -0.49,
		dailyPL: -105.54,
		unrealizedPL: -4472.13,
		mktValue: 17512.48,
		opacity: '1',
		isNegative: true
	},
	{
		ticker: 'TSLA',
		position: 89,
		last: 1104.56,
		changePercent: -1.92,
		dailyPL: -574.1,
		unrealizedPL: -4861.27,
		mktValue: 101156.98,
		opacity: '1',
		isNegative: true
	},
]

let trumpMoversData = [
	{
		ticker: 'DWAC',
		price: 15.27,
		marketCap: 605.3,
		PERatio: 14.5,
		changePercent: 1.25,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'RUM',
		price: 1.48,
		marketCap: 102.7,
		PERatio: 22.1,
		changePercent: 0.69,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'ZGYH',
		price: 10.15,
		marketCap: 198.4,
		PERatio: 18.7,
		changePercent: 0.60,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'BENE',
		price: 0.52,
		marketCap: 47.9,
		PERatio: 43.3,
		changePercent: 0.53,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'GROM',
		price: 11.08,
		marketCap: 249.5,
		PERatio: 18.9,
		changePercent: 0.43,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'CRKN',
		price: 12.37,
		marketCap: 315.6,
		PERatio: 21.3,
		changePercent: 0.30,
		opacity: '1',
		isNegative: false
	},
	{
		ticker: 'CFVI',
		price: 8.05,
		marketCap: 988.7,
		PERatio: 10.4,
		changePercent: -1.59,
		opacity: '1',
		isNegative: true
	},
	{
		ticker: 'PHUN',
		price: 20.22,
		marketCap: 1195.3,
		PERatio: 15.2,
		changePercent: -2.22,
		opacity: '1',
		isNegative: true
	},
	{
		ticker: 'MARK',
		price: 0.83,
		marketCap: 31.2,
		PERatio: 27.3,
		changePercent: -5.12,
		opacity: '1',
		isNegative: true
	},
	{
		ticker: 'FUN',
		price: 0.27,
		marketCap: 9.8,
		PERatio: 33.8,
		changePercent: -5.28,
		opacity: '1',
		isNegative: true
	},
]




class CreateFilteredTable {
	constructor(table, data, type) {
		this.table = table;
		this.data = data;
		this.type = type
		this.ordASC = 1;
		this.ordField = '';
	}

	selectOrd = (id) => {
		if (id === this.ordField) {
			this.ordASC *= -1;
		} else {
			this.ordField = id;
			this.ordASC = 1;
		}
	};

	updateData = (data, filterKey) => {
		// Сортируем данные по фильтрующему ключу по убыванию (если больше 0) или по возрастанию (если меньше 0)
		let positiveValues = data.filter(item => item[filterKey] >= 0);
		let negativeValues = data.filter(item => item[filterKey] < 0);
	
		// Вычисляем минимальные и максимальные значения фильтрующего элемента
		let maxPositive = Math.max(...positiveValues.map(item => item[filterKey]));
		let minPositive = Math.min(...positiveValues.map(item => item[filterKey]));
		let maxNegative = Math.max(...negativeValues.map(item => item[filterKey]));
		let minNegative = Math.min(...negativeValues.map(item => item[filterKey]));
	
		function calculateOpacity(value, min, max) {
			if (max === min) return 1; 
			return 0.2 + (1 - 0.2) * (value - min) / (max - min);
		}
	
		positiveValues.forEach(item => {
			item.isNegative = false;
			item.opacity = calculateOpacity(item[filterKey], minPositive, maxPositive);
		});
	
		negativeValues.forEach(item => {
			item.isNegative = true;
			item.opacity = calculateOpacity(item[filterKey], maxNegative, minNegative);
		});
	
		return [...positiveValues, ...negativeValues];
	}
	

	orderPortfolio = (e) => {
		if (e.target && e.target.id) {
			this.selectOrd(e.target.id);



			
			switch (e.target.id) {
				case 'ticker':
					if(this.ordASC > 0 ) {
						e.target.innerHTML += '<img class="filter__arrow" src="./images/filter-arrow.svg"/>'
						this.data = this.data.sort((a, b) => a.ticker.localeCompare(b.ticker))
					} else {
						e.target.innerHTML += '<img class="filter__arrow_active" src="./images/filter-arrow.svg" alt="filter icon"/>'
						this.data = this.data.sort((a, b) => b.ticker.localeCompare(a.ticker));
					}
					for(let i = 0; i < this.data.length ; i++){
						this.data[i].opacity = 0
					}
					break;
				default:
					this.data = this.updateData(this.data, e.target.id)
					if(this.ordASC > 0 ) {
						e.target.innerHTML += '<img class="filter__arrow" src="./images/filter-arrow.svg"/>'
						this.data = this.data.sort((a, b) => a[e.target.id] - b[e.target.id])
					} else {
						e.target.innerHTML += '<img class="filter__arrow_active" src="./images/filter-arrow.svg" alt="filter icon"/>'
						this.data = this.data.sort((a, b) => b[e.target.id] - a[e.target.id]);
					}
			}
			this.drawTable(this.data);
		}
	}

	drawTable(data) {

		this.table.innerHTML = `
			${
				data.map(item => {
					if(this.type == 'portfolio'){
						return `
							<tr style="background-color: ${item.isNegative ? `rgba(216, 14, 31, ${item.opacity})` : `rgba(1, 135, 64, ${item.opacity})`};">
								<td>${item.ticker}</td>
								<td>${item.position}</td>
								<td>${item.last}</td>
								<td>${item.changePercent}</td>
								<td>${item.dailyPL}</td>
								<td>${item.unrealizedPL.toLocaleString('en-US')}</td>
								<td>${item.mktValue.toLocaleString('en-US')}</td>
							</tr>
						`;
					} else {
						return `
							<tr style="background-color: ${item.isNegative ? `rgba(216, 14, 31, ${item.opacity})` : `rgba(1, 135, 64, ${item.opacity})`};">
								<td>${item.ticker}</td>
								<td>${item.price}</td>
								<td>${item.marketCap}</td>
								<td>${item.PERatio}</td>
								<td>${item.changePercent}%</td>
							</tr>
						`;
					}

				}).join('')
			}
		`;
	}
}



const portfolioTableBody = document.querySelector('.portfolio tbody')
const trumpMoversTableBody = document.querySelector('.trump-movers tbody')
const createdPortfolioTable = new CreateFilteredTable(portfolioTableBody, portfolioData, 'portfolio')
const createdTrumpMoversTable = new CreateFilteredTable(trumpMoversTableBody, trumpMoversData, 'trump-movers')

portfolioData = createdPortfolioTable.updateData(portfolioData, 'unrealizedPL')
trumpMoversData = createdTrumpMoversTable.updateData(trumpMoversData, 'changePercent')

createdPortfolioTable.drawTable(portfolioData)
createdTrumpMoversTable.drawTable(trumpMoversData)


const portfolioTh = document.querySelectorAll('.portfolio th')
const trumpMoversTh = document.querySelectorAll('.trump-movers th')

trumpMoversTh.forEach((item) => {
	item.addEventListener('click', (e) => {
		removeImages(trumpMoversTh)
		createdTrumpMoversTable.orderPortfolio(e)
	})
});
portfolioTh.forEach((item) => {
	item.addEventListener('click', (e) => {
		removeImages(portfolioTh)
		createdPortfolioTable.orderPortfolio(e)
	});
});



function removeImages(list) {
	list.forEach(item => {
		const img = item.querySelector('img')
		if(img){
			img.remove()
		}
	})
}

function createRandomDigit() {
	return Math.floor(Math.random() * 5) + 1;
}

function createRandomFloatDigit() {
	return (Math.floor(Math.random() * 11) + -5).toFixed(2);
}


function changeValue(value, calculateValue, calculatePercent) {
	const originalVal = +value.textContent.replace(/,/g, '')

	setInterval(() => {
		const randomDig = +createRandomFloatDigit()

		if(!Number.isNaN(+calculateValue.textContent.replace(/[+\-%]/g, ''))){

			let editedCalculateVal = (parseFloat(calculateValue.textContent.replace(/,/g, ''))  + randomDig).toLocaleString('en-US')
			let editedValue = (+originalVal + randomDig)
			const percent =  ((editedCalculateVal * 100) / originalVal).toFixed(2)

			value.textContent = editedValue.toLocaleString('en-US')

			calculatePercent.textContent = percent

			if(percent > 0){
				calculateValue.textContent = '+' + editedCalculateVal
			} else {
				calculateValue.textContent = editedCalculateVal
			}

			if(editedCalculateVal < 0){
				calculateValue.parentElement.classList.add('text_red')
				calculateValue.parentElement.classList.remove('text_green')
			} else {
				calculateValue.parentElement.classList.add('text_green')
				calculateValue.parentElement.classList.remove('text_red')
			}

		} 
	 }, createRandomDigit() * 1000)
}

const headerAnalyticsValues = document.querySelectorAll('.header__analytics-value')
const headerAnalyticsCalculateValue = document.querySelectorAll('.header__analytics-calculate__value')
const headerAnalyticsCalculatePercent = document.querySelectorAll('.header__analytics-calculate__percent')


headerAnalyticsValues.forEach((item, i) => {
	changeValue(item, headerAnalyticsCalculateValue[i], headerAnalyticsCalculatePercent[i])
	headerAnalyticsCalculatePercent[i].parentElement
})
