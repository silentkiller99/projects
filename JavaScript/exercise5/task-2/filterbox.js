let nameList = [
  "Ashish Shah",
  "Rashmin Chhatrala",
  "Yash Dubey",
  "Prakash Jain",
  "Yashraj Singh",
  "Viraj Sinha",
  "Rajesh Kumar",
  "Mahesh Marwadi",
  "Suresh Sahni",
  "Amar Vilas",
  "Virdas Singhania",
  "Rajeshwari Bindra",
  "Birendra Bhalerao",
  "Virendra Bhupati",
  "Bhupendra Singh",
  "Bhuvam Bam",
  "Shri Raj",
  "Prashant Kamle",
  "Kamlesh Tomar",
  "Risabh Khare",
  "Rishi Kohli",
  "Kunwar Kharwanda",
  "Kartik Koli",
  "Komal Jain",
  "Kartikey Pandey",
];

let unOrderedList = document.getElementById("names");
nameList.forEach((name) => {
  let list = document.createElement("li");
  list.textContent = name;
  unOrderedList.appendChild(list);
});

let filterboxInput = document.getElementById("filterbox");
filterboxInput.addEventListener("input", () => {
  filterboxValue = filterboxInput?.value.trim();
  if (filterboxValue.length >= 0) {
    let count = -1;
    for (let li of unOrderedList.children) {
      count++;
      if (filterboxValue.length >= 2)
        li.innerHTML = li.textContent.replace(
          new RegExp(filterboxValue, "gi"),
          `<span class="highlight">${filterboxValue}</span>`
        );
      else li.textContent = nameList[count];
    }
  }
});
