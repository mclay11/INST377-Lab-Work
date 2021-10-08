async function windowActions() {
  const endpoint =
    "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const request = await fetch(endpoint);
  const arrayName = await request.json();

  function findMatches(wordToMatch, arrayName) {
    return arrayName.filter((place) => {
      const regex = RegExp(wordToMatch, "gi");
      return (
        place.name.match(regex) ||
        place.category.match(regex) ||
        place.city.match(regex)
      );
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);
    const html = matchArray
      .map((place) => {
        const regex = new RegExp(event.target.value, "gi");
        const cityName = place.city.replace(
          regex,
          `<span class="h1">${event.target.value.toUpperCase()}</span>`
        );
        return `
            <ul>
            <li><div>${place.name}</div></li>
            <div>${place.category}</div>
            <div>${place.address_line_1}</div>
            <div>${place.city}</div>
            <div>${place.zip}</div>
            </ul>
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
}
window.onload = windowActions;
