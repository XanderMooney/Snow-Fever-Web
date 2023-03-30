let daysSelected = 3;
let historical = false;
let weatherData = ""
let historicalWeatherData = ""
let holder = document.getElementById('weather-holder')
let mediaState = window.matchMedia("(max-aspect-ratio: 1.5/1)")

mediaCheck()
mediaState.addListener(mediaCheck)
generateDays()
getWeekdays()
requestJQuery()


function generateDays()
{
    holder.innerHTML = ''

    for (let i = 0; i < daysSelected; ++i)
    {
        let el = document.createElement('div')
        el.classList.add('grid-row')
        el.dataset.day = i
        // this would be so cleaner with react but I've already dug my grave
        el.innerHTML = '<span class="day" data-day="' + i + '">Null</span>' 
        + '<span class="weather-icon" data-day="' + i + '"></span>' 
        + '<span class="weather-name bold" data-day="' + i + '">Void</span>' 
        + '<span class="low-temp align-right" data-day="' + i + '">Lowest Temp:</span>'
        + '<span class="temp align-right" data-day="' + i + '">Temp:</span>'
        + '<span class="high-temp align-right" data-day="' + i + '">Highest Temp:</span>'
        + '<span class="windspeed align-right" data-day="' + i + '">Wind speed:</span>'

        holder.appendChild(el)
    }
}
function getWeekdays()
{
    let today = new Date();

    for (let i = 0; i < daysSelected; ++i)
    {
        document.querySelector('.day[data-day="' + i + '"]').innerHTML = dayToWord((today.getDay() + i) % 7)
    }
}

function dayToWord(num)
{
    switch (num) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}
function requestJQuery() {
    if (weatherData != "")
    {
        processWeatherData(weatherData)
        return
    }
    $.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/80425/next7days?unitGroup=metric&key=GTAYYWQQLFFS6VE7UZR9YUMKJ&contentType=json') .done(function(rawResponse) {
        processWeatherData(rawResponse);
    })
    .fail (function() {
        document.getElementById('error').innerHTML = 'There was an error with our API; this is likely due to rate limiting. Please try again later.'
    });
}

 function requestHistoricalJQuery() {
    if (historicalWeatherData != "")
    {
        processWeatherData(historicalWeatherData)
        return
    }

     const date = new Date();
     const laterDate = new Date();
     laterDate.setDate(date.getDate() + 7);

     let month = date.getMonth() + 1;
     if (month < 10) month = '0' + month;
     let laterMonth = laterDate.getMonth() + 1;
     if (laterMonth < 10) laterMonth = '0' + laterMonth;

     let day = date.getDate();
     if (day < 10) { day = '0' + day; }
     let laterDay = laterDate.getDate();
     if (laterDay < 10) { laterDay = '0' + laterDay; }
     $.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/80425/' 
     + (date.getFullYear() - 1) + '-' + month + '-' + day + '/'
     + (laterDate.getFullYear() - 1) + '-' + laterMonth + '-' + laterDay
     + '?unitGroup=metric&key=GTAYYWQQLFFS6VE7UZR9YUMKJ&contentType=json') .done(function(rawResponse) {
         processWeatherData(rawResponse);
     })
     .fail (function() {
        document.getElementById('error').innerHTML = 'There was an error with our API; this is likely due to rate limiting. Please try again later.'
     });
 }

function processWeatherData(response) {
  
    if (historical) historicalWeatherData = response
    else weatherData = response

    //var location=response.resolvedAddress;
    var days=response.days;

    for (var i=0;i<daysSelected;i++) {
        
        document.querySelector('.weather-icon[data-day="' + i + '"]').innerHTML = '<img src="assets/weather/' + days[i].icon + '.png">'
        document.querySelector('.low-temp[data-day="' + i + '"]').innerHTML = "Lowest Temp: " + days[i].tempmin
        document.querySelector('.temp[data-day="' + i + '"]').innerHTML = "Temp: " + days[i].temp
        document.querySelector('.high-temp[data-day="' + i + '"]').innerHTML = "Highest Temp: " + days[i].tempmax
        document.querySelector('.windspeed[data-day="' + i + '"]').innerHTML = "Wind Speed: " + days[i].windspeed
        document.querySelector('.weather-name[data-day="' + i + '"]').innerHTML = days[i].conditions
    }
}

function mediaCheck()
{
    if (!mediaState.matches && daysSelected != 1) holder.style.gridTemplateColumns = 'repeat(' + daysSelected +', 1fr)'
    else 
    {
        holder.style.gridTemplateColumns = '1fr'
        holder.style.gridTemplateRows = 'repeat(' + daysSelected + ', 1fr)'
    }
}

// #region buttons

function btnCurrent() {
    if (!historical) return
    historical = false;
    let btn = document.getElementById('btnCurrent')
    
    btn.classList.add('selected')
    document.getElementById('btnHistorical').classList.remove('selected')

    requestJQuery()
}
function btnHistorical() {
    if (historical) return
    historical = true;
    let btn = document.getElementById('btnHistorical')

    btn.classList.add('selected')
    document.getElementById('btnCurrent').classList.remove('selected')

    requestHistoricalJQuery()
}
function btnToday() {
    if (daysSelected == 1) return
    let btn = document.getElementById('btnToday')

    btn.classList.add('selected')
    document.getElementById('btnThree').classList.remove('selected')
    document.getElementById('btnWeek').classList.remove('selected')
    
    daysSelected = 1
    reRequest()
}
function btnThree() {
    if (daysSelected == 3) return
    let btn = document.getElementById('btnThree')

    btn.classList.add('selected')
    document.getElementById('btnToday').classList.remove('selected')
    document.getElementById('btnWeek').classList.remove('selected')
    
    daysSelected = 3
    reRequest()
}
function btnWeek() {
    if (daysSelected == 7) return
    let btn = document.getElementById('btnWeek')

    btn.classList.add('selected')
    document.getElementById('btnToday').classList.remove('selected')
    document.getElementById('btnThree').classList.remove('selected')
    
    daysSelected = 7
    reRequest()
}

function reRequest()
{
    generateDays()
    getWeekdays()
    mediaCheck()

    if (historical) requestHistoricalJQuery()
    else requestJQuery()
}
// #endregion