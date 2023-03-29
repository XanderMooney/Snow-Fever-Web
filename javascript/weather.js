let daysSelected = 7;

getWeekdays()
requestJQuery()

function getWeekdays()
{
    let today = new Date();
    document.querySelector('.day[data-day="0"]').innerHTML = dayToWord(today.getDay());
    document.querySelector('.day[data-day="1"]').innerHTML = dayToWord((today.getDay() + 1) % 7);
    document.querySelector('.day[data-day="2"]').innerHTML = dayToWord((today.getDay() + 2) % 7);
    document.querySelector('.day[data-day="3"]').innerHTML = dayToWord((today.getDay() + 3) % 7);
    document.querySelector('.day[data-day="4"]').innerHTML = dayToWord((today.getDay() + 4) % 7);
    document.querySelector('.day[data-day="5"]').innerHTML = dayToWord((today.getDay() + 5) % 7);
    document.querySelector('.day[data-day="6"]').innerHTML = dayToWord((today.getDay() + 6) % 7);
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
    $.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/80425/next7days?unitGroup=metric&key=GTAYYWQQLFFS6VE7UZR9YUMKJ&contentType=json') .done(function(rawResponse) {
        processWeatherData(rawResponse);
    })
    .fail (function() {
        console.log("JQuery Request failed");
    });
}

 function requestHistoricalJQuery() {

     const date = new Date();
     const laterDate = new Date();
     laterDate.setDate(date.getDate() + 7);

     let month = date.getMonth() + 1;
     if (month < 10) month = '0' + month;
     let laterMonth = laterDate.getMonth() + 1;
     if (laterMonth < 10) laterMonth = '0' + laterMonth;

     let day = date.getDate();
     if (day < 10) day = '0' + day;
     let laterDay = laterDate.getDate();
     if (laterDay < 10) laterDay = '0' + laterDay;
     $.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/80425/' 
     + (date.getFullYear() - 1) + '-' + month + '-' + day + '/'
     + (laterDate.getFullYear() - 1) + '-' + laterMonth + '-' + laterDay
     + '?unitGroup=metric&key=GTAYYWQQLFFS6VE7UZR9YUMKJ&contentType=json') .done(function(rawResponse) {
         processWeatherData(rawResponse);
     })
     .fail (function() {
         console.log("JQuery Request failed");
     });
 }

function processWeatherData(response) {
  
    var location=response.resolvedAddress;
    var days=response.days;

    console.log("Location: " + location);

    for (var i=0;i<daysSelected;i++) {
        console.log(days[i].datetime+": tempmax="+days[i].tempmax+", tempmin="+days[i].tempmin);
        
        document.querySelector('.weather-icon[data-day="' + i + '"]').innerHTML = '<img src="assets/weather/' + days[i].icon + '.png">'
        document.querySelector('.low-temp[data-day="' + i + '"]').innerHTML = "Lowest Temp: " + days[i].tempmin
        document.querySelector('.high-temp[data-day="' + i + '"]').innerHTML = "Highest Temp: " + days[i].tempmax

    }
}
