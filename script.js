const weatherImg = document.getElementById('weatherImg');
const searchBar = document.getElementById('searchBarField');
const searchButton = document.getElementById('searchButton');
const cityWeather = document.getElementById('cityWeather');
const cityTemp = document.getElementById('cityTemp');
const cityCondition = document.getElementById('cityCondition');

async function getWeather(city){
    try {
        const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=current&key=E9X733BL3RA7S2H37G6WGZYCW&contentType=json`
        );
        const data = await response.json();
        const condition = data.currentConditions.conditions;

        console.log(data);
        console.log(data.address);
        console.log(data.currentConditions.temp);
        console.log(data.currentConditions.conditions);
        
        cityWeather.textContent = data.address;
        cityTemp.textContent = `${data.currentConditions.temp}C`;
        cityCondition.textContent = data.currentConditions.conditions;
        if(condition.toLowerCase().includes('cloudy')){
            weatherImg.style.backgroundImage = "url('images/cloudy.png')";
        } else if (condition.toLowerCase().includes('clear')){
            weatherImg.style.backgroundImage = "url('images/sunny.png')";
        } else if (condition.toLowerCase().includes('windy')){
            weatherImg.style.backgroundImage = "url('images/windy.png')";
        }
    } catch (error){
        console.error('Error fetching data', error);
    };
}

getWeather('Puerto Ordaz');

searchBar.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        getWeather(searchBar.value);
        searchBar.value = ""
    }
})

searchButton.addEventListener('click', (e) => {
        getWeather(searchBar.value);
        searchBar.value = ""
})