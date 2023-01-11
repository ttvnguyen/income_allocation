
// const getStateRate = (state) => {
//     //Free API KEY
//     let myHeaders = new Headers();
//     myHeaders.append("apikey", "rafMALf5ceSMAeAQ1r8DVbY316taWw1g");

//     let requestOptions = {
//         method: 'GET',
//         redirect: 'follow',
//         headers: myHeaders
//     };

//     const state_data =  fetch(`https://api.apilayer.com/tax_data/us_rate_list?state=${state}`, requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));
        
//     //console.log(state_data)
//     return state_data.data[0].combined_rate
// }

const getStateRate = (state) => {
    const state_data_CT = {"data":[{"zip":"06001","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"AVON","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true},{"zip":"06002","country":"US","state":"CT","state_rate":0.0635,"county":"HARTFORD","county_rate":0,"city":"BLOOMFIELD","city_rate":0,"combined_district_rate":0,"combined_rate":0.0635,"combined_use_rate":0.0635,"freight_taxable":true}]}
    
    const state_data_NY = {"data":[{"zip":"00501","country":"US","state":"NY","state_rate":0.04,"county":"SUFFOLK","county_rate":0.04625,"city":"HOLTSVILLE","city_rate":0,"combined_district_rate":0.04625,"combined_rate":0.08625,"combined_use_rate":0.08625,"freight_taxable":true},{"zip":"00544","country":"US","state":"NY","state_rate":0.04,"county":"SUFFOLK","county_rate":0.04625,"city":"HOLTSVILLE","city_rate":0,"combined_district_rate":0.04625,"combined_rate":0.08625,"combined_use_rate":0.08625,"freight_taxable":true}]} 

    if (state === 'CT'){
        console.log(`CT state rate =  ${state_data_CT.data[0].combined_rate} `)
        return state_data_CT.data[0].combined_rate
    }else {
        console.log(`NY state rate =  ${state_data_NY.data[0].combined_rate} `)
        state_data_NY.data[0].combined_rate
    }
}



//Add "how to use" modal 
let modalBtn = document.getElementById("modal-nav")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")
modalBtn.onclick = function(){
  modal.style.display = "block"
}
closeBtn.onclick = function(){
  modal.style.display = "none"
}
window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none"
  }
}

//UserInfo class contains: name, state lived, state worked, state moved to
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

    display(num_id){
        console.log (`In w2 Lived: ${this.stateFrom} Worked ${this.stateWork}`)
        let parAmount = this.amount - parseInt(this.amount/12*this.months)
        if (this.stateFrom == this.stateWork){
            document.querySelector(`#amount1${num_id}`).textContent = parAmount
        }else{
            document.querySelector(`#amount3${num_id}`).textContent = this.amount - parAmount
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

class UnEarnedIncome {
    constructor (sourceId, amount){
        this.sourceId = sourceId
        this.amount = amount
    }
    display(num_id){
        console.log (`In UnEarnedIncome`)
        const x = this.sourceId[this.sourceId.length - 1]
        console.log (`In UnEarnedIncome ${x}`)
        if (parseInt(x) === 1){
            document.querySelector(`#amount0${num_id}`).textContent = this.amount
        }
        else{
            document.querySelector(`#amount2${num_id}`).textContent = this.amount
        }
    }
}


//users variables
let primaryUser = null
let secondaryUser = null
//Number of income resources
let numOfForms = 1

//Get a day entered
const getDay = (aString) => {
    return aString.substring(8) 
}
//Get a month entered
const getMonth = (aString) => {
    return aString.substring(5,7)
}
//months have 31 days
const months_31days = [1,3,5,7,8,10,12]

//From information entered by user, calculate number of months lives as resident in the previous state 
const getNumOfMonthAsRes_StateFrom = () => {
    let x = document.getElementById('moved_date')
    let currentVal = x.value
    const currentDay = parseInt(getDay(currentVal))
    const currentMonth = parseInt(getMonth(currentVal))
    if (months_31days.includes(currentMonth)){
        if (currentDay > 16){
            //console.log(`in if day: ${currentDay} month: ${currentMonth}`)
            return currentMonth
        }
        return currentMonth-1
        
    } else if (currentDay >15){
        //console.log(`in elseif day: ${currentDay} month: ${currentMonth}`)
        return currentMonth
    }
    return currentMonth-1
}

//Display number of months lived as res and non res in each state
const displayMonths = () =>{
    const num = getNumOfMonthAsRes_StateFrom()
    //console.log(`number of months as res ${num}`)
    document.querySelector('#months_in_stateFrom_asRes').textContent = num + " months"
    document.querySelector('#months_in_stateFrom_asNonRes').textContent = (12 - num) + " months"
    document.querySelector('#months_in_stateTo_asRes').textContent = (12 - num) + " months"
    document.querySelector('#months_in_stateTo_asNonRes').textContent = num + " months"
}

//Display state from and state to
const displayStateFromTo = () =>{
    document.querySelector('#state_from').textContent = document.querySelector('#pr_stateFrom').value
    document.querySelector('#state_to').textContent = document.querySelector('#state_move').value
}

//Create primary and secondary users
const createUsers = () => {
    console.log(`Called createUsers `)
    console.log(` ${document.querySelector('#pr_stateFrom').value}`)
    primaryUser = new UserInfo
            (document.querySelector('#primary_name'), 
            document.querySelector('#pr_stateFrom').value,
            document.querySelector('#pr_stateWork').value)
    //console.log(`Primary User lived in: ${primaryUser.stateFrom}`)

    secondaryUser = new UserInfo
            (document.querySelector('#secondary_name'), 
            document.querySelector('#sec_stateFrom').value,
            document.querySelector('#sec_stateWork').value)
    
    //console.log(`Secondary User worked in: ${secondaryUser.stateWork}`)
}

//Primary & secondary taxpayer live in the same state
//Display state live based on primary selection
const setSecondaryStateFrom = () => {
    //console.log(`Called setSecondaryStateFrom `)
    document.querySelector('#sec_stateFrom').value = document.querySelector('#pr_stateFrom').value

}
//Display user info 
const setUserInfo = () =>{
    //Display number of months as resident or non-resident 
    displayMonths()
    //Display State From and State moved to
    displayStateFromTo()
    //console.log(`State live ${document.querySelector('#pr_stateFrom').value}`)
    //create users
    createUsers()
    setSecondaryStateFrom()

}
//Control all income sources received from tax forms
//Add more sources if needed
const incomeSources = ['W2-P', 'W2-S','1099-INT', '1099-DIV', '1099-B','UNEMPLOY-State1', 'UNEMPLOY-State2','GAMBLING-State1', 'GAMBLING-State2','OTHER']

//Create a row with 6 elements
//column1: a dropdown list of income sources will be selected by user
//column2: input amount will be entered by user
//column3-6: will display results 
//delete button to delete the whole row if needed
const createIncomeList = () =>{
    let currTable = document.querySelector('.user_income')
    let newTr = document.createElement('tr')
    newTr.classList.add('tax_form')
    currTable.appendChild(newTr)
    //Create a new td to hold selected options
    let newTd = document.createElement('td')
    newTr.appendChild(newTd)
    //Create a list of tax forms
    let newSelect = document.createElement('select')
    newSelect.setAttribute('id',`income_source${numOfForms}`)

    //used to edit income source option
    // newSelect.addEventListener('change',function(e){
    //     let target = e.target
    //     console.log(`Change income source: ${target.value}`)
    // })

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
    //Add 'change' event to an input element
    newInput.addEventListener('change', addIncome)
    newTd.appendChild(newInput)
    //add 4 more td to hold calculations
    for (let i=0;i<4;i++){
        newTd = document.createElement('td')
        newTd.setAttribute('id',`amount${[i.toString()+numOfForms.toString()]}`)
        newTr.appendChild(newTd)
    }
    //Add delete button
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    deleteButton.classList.add('deleteIncome')
    newTr.appendChild(deleteButton)
    //Add event listener for the delete button
    deleteButton.addEventListener('click', function(e){
        let target = e.target
        console.log(target)
        target.parentElement.parentElement.remove()
        //target.parentElement.remove()
    })
}

//Add income 
const addIncome = (e) => {
    console.log(`In addIncome`)
    const num = getNumOfMonthAsRes_StateFrom()
    const target = e.target
    //Get number 1 in "id = input_amount1"
    const num_id = (target.id).slice(12)
    const amount = target.value
    let parAmount = parseInt(amount/12*num)
    document.querySelector(`#income_source${num_id}`).disabled = true
    let option= document.querySelector(`#income_source${num_id}`).value
    
    //console.log(`which income source: ${option}`)
    if(option.includes('W2') || option.includes('1099')){
        if (option.includes('P')){
            console.log(`Primary entered amount: ${amount}`)
            let newW2 = new W2(primaryUser.name, primaryUser.stateFrom,
                primaryUser.stateWork,primaryUser.stateTo, amount, num)
            newW2.display(num_id)
        }else if (option.includes('S')) {
            console.log(`Secondary entered amount: ${amount}`)
            let newW2 = new W2(secondaryUser.name, secondaryUser.stateFrom,
                secondaryUser.stateWork,secondaryUser.stateTo, amount, num)
            newW2.display(num_id)
        }
        document.querySelector(`#amount0${num_id}`).textContent = parAmount
        document.querySelector(`#amount2${num_id}`).textContent = amount - parAmount
 
    }else{
        let newUnEarnedIncome = new UnEarnedIncome(option, amount)
        newUnEarnedIncome.display(num_id)
    }

    //increase # of income sources
    numOfForms++
}

//To calculate tax credit
const calculateCredit = () => {
    //Variables to keep all amounts earned as resident as well as non-resident
    let amtStateFromAsRes = 0
    let amtStateFromAsNonRes = 0
    let amtStateToAsRes = 0
    let amtStateToAsNonRes = 0
    const collection = document.getElementsByClassName('tax_form')
    console.log(`In calculate ${collection.length}`)
    
    for (let i=0; i<collection.length;i++){
    
        if (collection[i].children[2].innerHTML !== ''){
            amtStateFromAsRes += parseInt(collection[i].children[2].innerHTML)
        }
        
        if (collection[i].children[3].innerHTML !== ''){
            amtStateFromAsNonRes += parseInt(collection[i].children[3].innerHTML)
        }
        if (collection[i].children[4].innerHTML !== ''){
            amtStateToAsRes += parseInt(collection[i].children[4].innerHTML)
        }
        if (collection[i].children[5].innerHTML !== ''){
            amtStateToAsNonRes += parseInt(collection[i].children[5].innerHTML)
        }
        
    }

    document.querySelector('#amt_stateFrom_asRes').textContent = amtStateFromAsRes
    document.querySelector('#amt_stateFrom_asNonRes').textContent = amtStateFromAsNonRes
    document.querySelector('#amt_stateTo_asRes').textContent = amtStateToAsRes
    document.querySelector('#amt_stateTo_asNonRes').textContent = amtStateToAsNonRes

    document.querySelector('#amt_to_asNonRes').textContent = amtStateToAsNonRes 
    document.querySelector('#amt_from_asNonRes').textContent = amtStateFromAsNonRes 

    let credit_ratio_from = (amtStateFromAsNonRes/ (amtStateFromAsRes+amtStateFromAsNonRes)).toFixed(4)
    let credit_ratio_to = (amtStateToAsNonRes/(amtStateToAsRes+ amtStateToAsNonRes)).toFixed(4)
    
     
    document.querySelector('#credit_ratio_from').textContent = credit_ratio_from
    document.querySelector('#credit_ratio_to').textContent = credit_ratio_to
    
    //Call getStateRate to get state rate
    const state_from_rate = getStateRate(primaryUser.stateFrom)
    console.log(`State From: ${primaryUser.stateFrom}`)
    const state_to_rate = getStateRate(primaryUser.stateTo)
    console.log(`State To: ${primaryUser.stateTo}`)

    let total_tax_from = (amtStateFromAsRes+ amtStateFromAsNonRes) * state_from_rate
    console.log(`total_tax_from: ${total_tax_from}`)
    document.querySelector('#total_tax_from').textContent = total_tax_from

    let total_tax_to = (amtStateToAsRes+ amtStateToAsNonRes) * state_to_rate
    console.log(`total_tax_to: ${total_tax_to}`)
    document.querySelector('#total_tax_to').textContent = total_tax_to

    document.querySelector('#credit_amt_from').textContent = state_from_rate * total_tax_from

    document.querySelector('#credit_amt_to').textContent = state_to_rate * total_tax_to
}

