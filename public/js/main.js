const submit = document.getElementById("submitBtn");
const searchedCity = document.getElementById("cityName");
const cityName = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const data_hide = document.querySelector(".middle_layer");
const day = document.getElementById("day");
const date = document.getElementById("date");
const d = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
day.innerText = days[d.getDay()];
date.innerText = `${d.getDate()} ${months[d.getMonth()]}`;
const getInfo = async (event) => {
  event.preventDefault();
  const city = searchedCity.value;
  if (city === "") {
    cityName.innerText = "Please enter a city";
    data_hide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=74b929ae7f1f48762a1f90832ae289ec`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      cityName.innerText = `${arrData[0].name}, ${arrData[0].sys.country} (${arrData[0].weather[0].main})`;
      temp.innerText = `${arrData[0].main.temp} °C`;
      const tempMood = arrData[0].weather[0].main;
      //condtion to check weather condition
      if (tempMood === "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood === "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMood === "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-showers-heavy' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-sun' style='color: #eccc68;'></i>";
      }
      data_hide.classList.remove("data_hide");
      searchedCity.value = "";
    } catch (err) {
      cityName.innerText = "City Not Found!";
      data_hide.classList.add("data_hide");
      searchedCity.value = "";
    }
  }
};
submit.addEventListener("click", getInfo);
