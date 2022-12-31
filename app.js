
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
    constructor (amount, monthsOldRes, monthsNewRes){
        this.amount = amount
        this.monthsOldRes = monthsOldRes
        this.monthsNewRes = monthsNewRes

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
    constructor(name, stateLive, stateWork){
        this.name = name
        this.stateLive = stateLive
        this.stateWork = stateWork
    }
    
}

let primaryUser = null
let secondaryUser = null
//Number of income resources
let numOfForms = 1


const getDay = (aString) => {
    return aString.substring(8) 
}
const getMonth = (aString) => {
    return aString.substring(5,7)
}
//months have 31 days
const months_31days = [1,3,5,7,8,10,12]

const getNumOfMonthAsRes_StateFrom = () => {
    let x = document.getElementById('moved_date')
    //let defaultVal = x.defaultValue
    let currentVal = x.value
    const currentDay = parseInt(getDay(currentVal))
    const currentMonth = parseInt(getMonth(currentVal))
    // console.log(getDay(currentVal))
    // console.log(getMonth(currentVal))
    
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
const displayMonths = () =>{
    const num = getNumOfMonthAsRes_StateFrom()
    console.log(`number of months as res ${num}`)
    document.querySelector('#months_in_stateFrom_asRes').textContent = num + " months"
    document.querySelector('#months_in_stateFrom_asNonRes').textContent = (12 - num) + " months"
    document.querySelector('#months_in_stateTo_asRes').textContent = (12 - num) + " months"
    document.querySelector('#months_in_stateTo_asNonRes').textContent = num + " months"
}

const displayStateFromTo = () =>{
    document.querySelector('#state_from').textContent = document.querySelector('#pr_stateLive').value
    document.querySelector('#state_to').textContent = document.querySelector('#state_move').value
}

const createUsers = () => {
    console.log(`Called createUsers `)
    console.log(` ${document.querySelector('#pr_stateLive').value}`)
    primaryUser = new UserInfo
            (document.querySelector('#primary_name'), 
            document.querySelector('#pr_stateLive').value,
            document.querySelector('#pr_stateWork').value)
    console.log(`Primary User lived in: ${primaryUser.stateLive}`)

    secondaryUser = new UserInfo
            (document.querySelector('#secondary_name'), 
            document.querySelector('#sec_stateLive').value,
            document.querySelector('#sec_stateWork').value)
    
    console.log(`Secondary User worked in: ${secondaryUser.stateWork}`)
}
//Display user info 
const setUserInfo = () =>{
    //Display number of months as resident or non-resident 
    displayMonths()
    //Display State From and State moved to
    displayStateFromTo()
    console.log(`State live ${document.querySelector('#pr_stateLive').value}`)
    createUsers()

}
//Control all income sources received from tax forms
//Add more sources if needed
const incomeSources = ['W2-P', 'W2-S','1099-INT', '1099-DIV', 'SCH_D','UNEMPLOY', 'GAMBLING', 'OTHER']

const incomeCategories = ['W2', 'Investment', 'UnearnedIncome']

const createIncomeList = () =>{
    const currTable = document.querySelector('.user_income')
    let newTr = document.createElement('tr')
    currTable.appendChild(newTr)
    //Create a new td to hold selected options
    let newTd = document.createElement('td')
    newTr.appendChild(newTd)
    //Create a list of tax forms
    let newSelect = document.createElement('select')
    newSelect.setAttribute('id',`income_source`)
    currTable.appendChild(newSelect)
    for(let i =0;i<incomeSources.length;i++){
        let newOptionItem = document.createElement('option')
        newOptionItem.setAttribute('value',incomeSources[i])
        newOptionItem.textContent = incomeSources[i]
        newSelect.appendChild(newOptionItem)
    }
    newTd.appendChild(newSelect)
    //add input to receive user income
    newTd = document.createElement('td')
    newTr.appendChild(newTd)
    let newInput = document.createElement('input')
    newInput.setAttribute('type', 'number')
    newInput.setAttribute('id', `input_amount${numOfForms}`)
    //Assign an "onchange"event to an input element
    newInput.setAttribute('onchange','addIncome()')
    
    newTd.appendChild(newInput)
    //add 4 more td to hold calculations
    for (let i=0;i<4;i++){
        newTd = document.createElement('td')
        newTd.setAttribute('id',`amount${[i.toString()+numOfForms.toString()]}`)
        newTr.appendChild(newTd)
        
    }
}



const addIncome = () => {
    console.log(`In addIncome`)
    const num = getNumOfMonthAsRes_StateFrom()
    const amount = document.querySelector(`#input_amount${numOfForms}`).value
    
    const option = document.querySelector('#income_source').value
    console.log(`which income source: ${option}`)
    let parAmount = parseInt(amount/12*num)
    console.log(`entered amount: ${amount}`)
    document.querySelector(`#amount0${numOfForms}`).textContent = parAmount
    document.querySelector(`#amount2${numOfForms}`).textContent = amount - parAmount
    //increase # of income sources
    numOfForms++
}

