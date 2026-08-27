const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
// grabing the important element for having accesee


//این میگه این تابع ممکنه طول بکشه 
async function getWeather() {
//ای سینک aسینک 
//ای سینک میتونه صبر کنه و بعد کار کنه  قبل از این که صفحه فریز کنه
    const cityName = cityInput.value;

    if (cityName === "") {
        alert("Please enter a city");
        return;
    }
// ادرسی هست که ای پی رو میخوایم ازش بگیریم
// برای پیدا کردن موقعیت  شهره  با استفداه از  اسم شهر استفاده میشه
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;
// فتچ برای درخواست فرستادن به ای پی آی هست 
// توی این حالت میگیم برو توی اون ادرس  و مقدار رو بردار و برای نمم توی این متغیرر ذیخره کن
// علاوه بر اون این اویت میگه کنه صبر کن تات جواب ای پی ای برگرده
    const response = await fetch(url);
//اطلاعات رو به صورت جیسون ذخیره کن
//چون شبیه یه پکه و نمیتونی بدون باز کردنش ازش استفاهده کنی  برای همین تبدیلش میکنیم به
// و اون رو تبدیل میکنکه  به یه ابجیکت جاواسکریت تبدیا میکنم  که بتونم استفاده کنم 
    const data = await response.json();

    if (!data.results) {
        alert("City not found");
        return;
    }

    // این یعنی عرض جغرافیایی
    // قسمت ریزالت یعنی اولین جواب رو بردار بیار
    //north or south
    const latitude = data.results[0].latitude;
    // طول جغرافیایی
    // easte or west
    const longitude = data.results[0].longitude;
    // اسم شهر
    const cityNameResult = data.results[0].name;



    // با استفاده کردن از موقغیت های جغرافیایی میتونی اب و هوا رو پیدا کنیم 
    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

// برای گرفتن  اطلاعاته و میگه صبر مکن تا بیادد 
    const weatherResponse = await fetch(weatherUrl);
// میگه حالا اوتا رو تبدیا کن بخ ابجکت تا بتونیم ازش استفاده کنیم 
    const weatherData = await weatherResponse.json();


    city.textContent = cityNameResult;

    temperature.textContent =
        weatherData.current.temperature_2m + "°C";

    description.textContent = "Current Weather";

    humidity.textContent =
        weatherData.current.relative_humidity_2m;

    wind.textContent =
        weatherData.current.wind_speed_10m;
}


searchBtn.addEventListener("click", getWeather);
