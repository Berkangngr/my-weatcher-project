const renkDegistirBtn = document.getElementById("renkDegistirBtn");

function arkaPlanRenginiDegistir() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
}

renkDegistirBtn.addEventListener("mouseover", arkaPlanRenginiDegistir);
const wrapper = document.querySelector(".wrapper");

function searchFunction() {
  var form = document.querySelector("form");

  var input = form.querySelector('input[type="search"]');

  var city = input.value;

  getApi(city);
}

//Bu kısım sayfanın her search yapışında sayfası yenilemesini engeller, eğer bunu yapmaz isek kullanıcı deneyimi kötü olur.
// Formun submit olayını dinle
document.querySelector("form").addEventListener("submit", function (event) {
  // Sayfanın yeniden yüklenmesini engelle
  event.preventDefault();

  // searchFunction fonksiyonunu çağır
  searchFunction();
});

const apiKey = "c8c3ca4367372a339b597cc35f886ed2";

const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const bodyDiv = document.getElementById("bodyDiv");

window.onload = function () {
  getWeatherByLocation();
};

async function getApi(city) {
  const cityUpper = city.toUpperCase();
  const languageCode = "tr";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${languageCode}&appid=${apiKey}`
  );
  const data = await res.json();
  console.log("Arama metni: " + city);
  console.log(data);
  if (city != "" && data.name) {
    console.log(`${city}` + " isimli şehir verileri getiriliyor.");
    cityName.innerHTML = cityUpper;
    temp.innerHTML = Math.round(data.main.temp - 273) + "C°";
    desc.innerHTML = data.weather[0].description;
    let derece = Math.round(data.main.temp - 273);
    backgroundDegisim(derece);
  } else {
    alert(
      `${city}` +
        " isimli şehir verileri bulunamadı lütfen şehir ismini doğru yazdığınızdan emin olunuz."
    );
  }
}

getApi("Tekirdağ");

//Bu kısım sayfa ilk açıldığında konum bilgisi ile açılsın diye var

const cityNameElement = document.getElementById("city-name");
const tempElement = document.getElementById("temp");
const descTwo = document.getElementById("desc");

async function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const languageCode = "tr";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${languageCode}&appid=${apiKey}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.name) {
            cityNameElement.innerHTML = data.name;
            tempElement.innerHTML = Math.floor(data.main.temp - 273) + "C°";
            descTwo.innerHTML = data.weather[0].description;
            let derece = Math.round(data.main.temp - 273);
            backgroundDegisim(derece);
          } else {
            alert("Hava durumu verileri bulunamadı.");
          }
        } catch (error) {
          console.error("Hava durumu bilgisi alınamadı: ", error);
        }
      },
      (error) => {
        console.error("Konum bilgisine izin verilmedi: ", error);
        alert(
          "Konum bilgisine izin verilmedi. Lütfen izin vererek tekrar deneyin."
        );
      }
    );
  } else {
    alert("Tarayıcı konum bilgisine izin vermiyor.");
  }
}

function backgroundDegisim(derece) {
  bodyDiv.className = "";
  if (derece >= 31) {
    bodyDiv.classList.add("very-hot");
  } else if (derece >= 21 && derece <= 30) {
    bodyDiv.classList.add("hot");
  } else if (derece >= 11 && derece <= 20) {
    bodyDiv.classList.add("cold");
  } else if (derece <= 10) {
    bodyDiv.classList.add("very-cold");
  }
}
