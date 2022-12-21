
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

console.log(ct_data)
