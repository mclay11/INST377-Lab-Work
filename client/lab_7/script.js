async function windowActions() {
  const endpoint =
    "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const request = await fetch(endpoint);
  const arrayName = await request.json();

  fetch(endpoint);

  function findMatches(wordToMatch, arrayName) {
    return arrayName.filter((place) => {
      const regex = RegExp(wordToMatch, "gi");
      return place.zip.match(regex);
    });
  }

  function mapInit() {
    mymap = L.map("mapid").setView([38.98, -76.93], 11.5);
    L.tileLayer(
      "https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=0im19NFqvOVkTZzwiWhj",
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibWNsYXkxMSIsImEiOiJja3V0aDltODQxNHRlMnBvNjRmYWF1eXVjIn0.vy6taH-cliP3_kTkcAkG0A",
      }
    ).addTo(mymap);
  }

  function displayMatches(event) {
    let markers = [];

    const matchArray = findMatches(event.target.value, arrayName);
    let slicedArray = matchArray.slice(0, 5);

    const html = slicedArray
      .map((place) => {
        if (place.hasOwnProperty("geocoded_column_1")) {
          const point = place.geocoded_column_1;
          const latlong = point.coordinates;
          const marker = latlong.reverse();

          markers.push(L.marker(marker).addTo(mymap));
        }
        return `
        <li><strong>${place.name}</strong>
        <br>${place.address_line_1}</li>
            `;
      })
      .join("");

    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector(".search");
  const suggestions = document.querySelector(".suggestions");

  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", (evt) => {
    displayMatches(evt);
  });
  mapInit();
  map.setView(point, 8);
}

window.onload = windowActions;
