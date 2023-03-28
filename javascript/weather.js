let daysSelected = 7;

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
     laterDate.setDate(date.getDate() + daysSelected);

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
    }
}
