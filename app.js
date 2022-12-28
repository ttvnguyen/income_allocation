
// window.onload = (event) =>{
//     var myHeaders = new Headers();
//     myHeaders.append("apikey", "rafMALf5ceSMAeAQ1r8DVbY316taWw1g");

//     var requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
//     headers: myHeaders
//     };

//     const ct_data =  fetch("https://api.apilayer.com/tax_data/us_rate_list?state=CT", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

// }


const ct_data = {"data":[{"zip":"06001","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"AVON","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06002","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"BLOOMFIELD","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06006","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"WINDSOR","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06010","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"BRISTOL","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06011","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"BRISTOL","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06013","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"BURLINGTON","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06016","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"BROAD BROOK","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06018","country":"US","state":"CT","state_rate":0.0635,"county":"LITCHFIELD","county_rate":0,"city":"CANAAN","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06019","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"CANTON","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06020","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"CANTON CENTER","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true}]}

// console.log(ct_data)

class W2 {
    constructor (amount){
        this.amount = amount

    }
    display(){
        console.log (`In w2`)
    }
}

class Investment {
    constructor (amount){
        this.amount = amount

    }
    display(){
        console.log (`In Investment`)
    }
}

class UnEarnedIncome {
    constructor (amount){
        this.amount = amount

    }
    display(){
        console.log (`In UnEarnedIncome`)
    }
}

class UserInfo {
    constructor(name, stateWork, stateLive){
        this.name = name
        this.stateWork = stateWork
        this.stateLive = stateLive
    }
}


const getDay = (aString) => {
    return aString.substring(8) 
}
const getMonth = (aString) => {
    return aString.substring(5,7)
}
//months have 31 days
const months_31days = [1,3,5,7,8,10,12]
//days more than one-half month
//const one_half_month = [15,16]

const getNumOfMonthAsRes_StateFrom = () => {
    let x = document.getElementById('moved_date')
    //let defaultVal = x.defaultValue
    let currentVal = x.value
    const currentDay = parseInt(getDay(currentVal))
    const currentMonth = parseInt(getMonth(currentVal))
    console.log(getDay(currentVal))
    console.log(getMonth(currentVal))
    
    if (months_31days.includes(currentMonth)){
        if (currentDay > 16){
            console.log(`in if day: ${currentDay} month: ${currentMonth}`)
            return currentMonth
        }
        return currentMonth-1
        
    } else if (currentDay >15){
        console.log(`in elseif day: ${currentDay} month: ${currentMonth}`)
        return currentMonth
    }
    return currentMonth-1

    // setTimeout(() => {
    //     console.log(date_Entered);
    // }, 4000)

}
//From information entered by user, calculate number of months lives as resident in the previous state asnd current state
const setUserInfo = () =>{
    const num = getNumOfMonthAsRes_StateFrom()
    console.log(`number of months as res ${num}`)
    document.querySelector('#months_in_stateFrom_asRes').textContent = num + " months"
    document.querySelector('#months_in_stateFrom_asNonRes').textContent = (12 - num) + " months"
    document.querySelector('#months_in_stateTo_asRes').textContent = (12 - num) + " months"
    document.querySelector('#months_in_stateTo_asNonRes').textContent = num + " months"
}
const incomeSources = ['W2-P', 'W2-S','1099-INT', '1099-DIV', 'SCH_D','UNEMPLOY', 'GAMBLING', 'OTHER']

const createIncomeList = () =>{
    const currTable = document.querySelector('.user_income')
    let newTr = document.createElement('tr')
    currTable.appendChild(newTr)
    //Create a new td to hold selected options
    let newTd = document.createElement('td')
    newTr.appendChild(newTd)
    //Create a list of tax forms
    let newSelect = document.createElement('select')
    currTable.appendChild(newSelect)
    for(let i =0;i<incomeSources.length;i++){
        let newOptionItem = document.createElement('option')
        newOptionItem.setAttribute('id',incomeSources[i])
        newOptionItem.textContent = incomeSources[i]
        newSelect.appendChild(newOptionItem)
    }
    newTd.appendChild(newSelect)
    //add input to receive user income
    newTd = document.createElement('td')
    newTr.appendChild(newTd)
    newTd.appendChild(document.createElement('input'))
    //add 4 more td to hold calculations
    for (let i=0;i<4;i++){
        newTd = document.createElement('td')
        newTr.appendChild(newTd)
        
    }
}

