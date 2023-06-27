let list = {
  India: {
    Delhi: ["new Delhi", "North Delhi"],
    UP: ["Varanasi", "Prayagraj"],
    Goa: ["North Goa", "South Goa"],
  },
  Australia: {
    SouthAustralia: ["Dunstan", "Mitchell"],
    Victoria: ["Altona", "Euroa"],
  },
  Canada: {
    Alberta: ["Acadia", "Bighorn"],
    Columbia: ["Washington", "IDK"],
  }
};
let countrySel = document.getElementById("country");
let stateSel = document.getElementById("state");
let citySel = document.getElementById("city");
countrySel.onchange = function () {
    stateSel.length = 1;
    citySel.length = 1;
    if (this.selectedIndex < 1)
        return;
    for (let state in list[this.value])
        stateSel.options[stateSel.options.length] = new Option(state, state);
}
stateSel.onchange = function () {
citySel.length = 1;
    if (this.selectedIndex < 1)
        return;
let district = list[countrySel.value][this.value];
    for (let i = 0; i < district.length; i++) 
        citySel.options[citySel.options.length] = new Option(district[i], district[i]);
}

function display() {
    console.log("Country  : " + countrySel.value);
    console.log("State  : " + stateSel.value);
    console.log("City  : " + citySel.value);
}
