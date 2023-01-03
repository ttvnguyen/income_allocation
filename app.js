
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

class UserInfo {
    constructor(name, stateFrom, stateWork, stateTo){
        this.name = name
        this.stateFrom = stateFrom
        this.stateWork = stateWork
    }
}

class W2 extends UserInfo{
    constructor (name, stateFrom, stateWork, stateTo, amount, months){
        super(name, stateFrom, stateWork, stateTo)
        this.amount = amount
        this.months = months
        console.log(`W2 class amount ${amount}`)
    }
    

    display(){
        console.log (`In w2 Lived: ${this.stateFrom} Worked ${this.stateWork}`)
        let parAmount = this.amount - parseInt(this.amount/12*this.months)
        if (this.stateFrom == this.stateWork){
            document.querySelector(`#amount1${numOfForms}`).textContent = parAmount
            //Add 
            amtStateFromAsNonRes += parAmount
            console.log(`amtStateFromAsNonRes: ${amtStateFromAsNonRes}`)
            //Display total amount
            console.log(document.querySelector('#amt_stateFrom_asNonRes'))
            document.querySelector('#amt_stateFrom_asNonRes').textContent = amtStateFromAsNonRes

        }else{
            document.querySelector(`#amount3${numOfForms}`).textContent = this.amount - parAmount
            //Add 
            amtStateToAsNonRes += this.amount - parAmount
            console.log(`amtStateToAsNonRes: ${amtStateToAsNonRes}`)
            //Display total amount
            console.log(document.querySelector('#amt_stateTo_asNonRes'))
            document.querySelector('#amt_stateTo_asNonRes').textContent = amtStateToAsNonRes
        }
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

class UnEarnedIncome extends UserInfo{
    constructor (name, stateFrom, stateWork, stateTo, amount){
        super (name, stateFrom, stateWork, stateTo)
        this.amount = amount

    }
    display(){
        console.log (`In UnEarnedIncome`)
    }
}


//users variables
let primaryUser = null
let secondaryUser = null
//Number of income resources
let numOfForms = 1
//Variables to keep all amounts earned as resident as well as non-resident
let amtStateFromAsRes = 0
let amtStateFromAsNonRes = 0
let amtStateToAsRes = 0
let amtStateToAsNonRes = 0
//Months in state live as resident
let monthsLivedAsRes = 1

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
    document.querySelector('#state_from').textContent = document.querySelector('#pr_stateFrom').value
    document.querySelector('#state_to').textContent = document.querySelector('#state_move').value
}

const createUsers = () => {
    console.log(`Called createUsers `)
    console.log(` ${document.querySelector('#pr_stateFrom').value}`)
    primaryUser = new UserInfo
            (document.querySelector('#primary_name'), 
            document.querySelector('#pr_stateFrom').value,
            document.querySelector('#pr_stateWork').value)
    console.log(`Primary User lived in: ${primaryUser.stateFrom}`)

    secondaryUser = new UserInfo
            (document.querySelector('#secondary_name'), 
            document.querySelector('#sec_stateFrom').value,
            document.querySelector('#sec_stateWork').value)
    
    console.log(`Secondary User worked in: ${secondaryUser.stateWork}`)
}
//Primary & secondary taxpayer live in the same state
//Display state live based on primary selection
const setSecondaryStateFrom = () => {
    console.log(`Called setSecondaryStateFrom `)
    document.querySelector('#sec_stateFrom').value = document.querySelector('#pr_stateFrom').value

}
//Display user info 
const setUserInfo = () =>{
    //Display number of months as resident or non-resident 
    displayMonths()
    //Display State From and State moved to
    displayStateFromTo()
    console.log(`State live ${document.querySelector('#pr_stateFrom').value}`)
    createUsers()
    setSecondaryStateFrom()

}
//Control all income sources received from tax forms
//Add more sources if needed
const incomeSources = ['W2-P', 'W2-S','1099-INT', '1099-DIV', '1099-B','UNEMPLOY', 'GAMBLING', 'OTHER']

const incomeCategories = ['W2', 'Investment', 'UnearnedIncome']

const createIncomeList = () =>{
    let currTable = document.querySelector('.user_income')
    let newTr = document.createElement('tr')
    currTable.appendChild(newTr)
    //Create a new td to hold selected options
    let newTd = document.createElement('td')
    newTr.appendChild(newTd)
    //Create a list of tax forms
    let newSelect = document.createElement('select')
    newSelect.setAttribute('id',`income_source${numOfForms}`)
    // newSelect.setAttribute('onchange', 'assignIncomeSource()')
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
    //Assign an "onclick"event to check it has value or not
    newInput.setAttribute('onclick','checkEmpty()')
    newTd.appendChild(newInput)
    //add 4 more td to hold calculations
    for (let i=0;i<4;i++){
        newTd = document.createElement('td')
        newTd.setAttribute('id',`amount${[i.toString()+numOfForms.toString()]}`)
        newTr.appendChild(newTd)
        
    }
    
}

// const assignIncomeSource = () =>{
//     document.querySelector('#income_source').value
//     console.log(`assignIncomeSource: ${document.querySelector('#income_source').value}`)

// }
const checkEmpty = () => {
    const amount = document.querySelector(`#input_amount${numOfForms}`).value
    console.log(`amount of income source: ${amount}`)
}
const addIncome = () => {
    console.log(`In addIncome`)
    const num = getNumOfMonthAsRes_StateFrom()
    const amount = document.querySelector(`#input_amount${numOfForms}`).value
    let parAmount = parseInt(amount/12*num)
    console.log(`entered amount: ${amount}`)
    let option = document.querySelector(`#income_source${numOfForms}`).value
    console.log(`which income source: ${option}`)

    console.log(`which income source: ${option.includes('W2')}`)
    if(option.includes('W2')){
        if (option.includes('P')){
            console.log(`Primary entered amount: ${amount}`)
            let newW2 = new W2(primaryUser.name, primaryUser.stateFrom,
                primaryUser.stateWork,primaryUser.stateTo, amount, num)
            newW2.display()
        }else {
            console.log(`Secondary entered amount: ${amount}`)
            let newW2 = new W2(secondaryUser.name, secondaryUser.stateFrom,
                secondaryUser.stateWork,secondaryUser.stateTo, amount, num)
            newW2.display()
        }

    }else if (option.includes('1099')){
        let newInvestment = new Investment()

    }else{
        let newUnEarnedIncome = new UnEarnedIncome()
    }

    
    document.querySelector(`#amount0${numOfForms}`).textContent = parAmount
    //Add 
    amtStateFromAsRes += parAmount
    console.log(`amtStateFromAsRes: ${amtStateFromAsRes}`)
    //Display total amount
    console.log(document.querySelector('#amt_stateFrom_asRes'))
    document.querySelector('#amt_stateFrom_asRes').textContent = amtStateFromAsRes
    
    document.querySelector(`#amount2${numOfForms}`).textContent = amount - parAmount
    //Add 
    amtStateToAsRes += (amount -parAmount)
    console.log(`amtStateToAsRes: ${amtStateToAsRes}`)
    //Display total amount
    document.querySelector('#amt_stateTo_asRes').textContent = amtStateToAsRes
    //increase # of income sources
    numOfForms++
}

const calculation = () => {

}

