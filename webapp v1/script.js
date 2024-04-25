const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "rgb(71, 147, 175)" },
  { name: "science", color: "rgb(156, 175, 170)" },
  { name: "finance", color: "rgb(255, 196, 112)" },
  { name: "society", color: "rgb(221, 87, 70)" },
  { name: "entertainment", color: "rgb(198, 132, 132)" },
  { name: "health", color: "rgb(139, 50, 44)" },
  { name: "history", color: "rgb(225, 170, 116)" },
  { name: "news", color: "rgb(17, 109, 110)" },
];

console.log(CATEGORIES.find((cat) => cat.name === "society").color);

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factslist = document.querySelector(".facts-list");

// Create DOM elements: Render facts in list
factslist.innerHTML = "";

// Load data from Supabase
loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://iomrlheznpwuxywelwmi.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbXJsaGV6bnB3dXh5d2Vsd21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTA3NzQsImV4cCI6MjAyOTMyNjc3NH0.e3vEtSkZ1C-E7121L3FETz_QJ78lUeTgGYU1p43untM",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbXJsaGV6bnB3dXh5d2Vsd21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTA3NzQsImV4cCI6MjAyOTMyNjc3NH0.e3vEtSkZ1C-E7121L3FETz_QJ78lUeTgGYU1p43untM",
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  // const fileredData = data.filter((fact) => fact.category === "technology");

  createFactsList(data);
}

function createFactsList(dataArray) {
  //factslist.insertAdjacentHTML("afterbegin", "<li>Tracy</li>");

  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
<p>
  ${fact.text}
    <a
        class="source"
        href="${fact.source}"
        target="_blank"
    >(Source)</a>
</p>
<span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === fact.category).color
    }">${fact.category}</span>
</li>`
  );
  const html = htmlArr.join("");
  factslist.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share A Fact";
  }
});

console.log([7, 64, 6, -23, 11].filter((el) => el > 10));
console.log([7, 64, 6, -23, 11].find((el) => el > 10));

/*
let votesInteresting = 23;
let votesMindblowing = 5;
const text =
  "ReactJS is a popular open-source JavaScript library used for building user interfaces. It was developed by Facebook and was first released in 2013";

votesInteresting = votesInteresting + 1;
votesInteresting++;
console.log(votesInteresting);

let totalUpvotes = votesInteresting + votesMindblowing;
console.log("Upvotes:", totalUpvotes);

let votesFalse = 4;
const isCorrect = votesFalse === totalUpvotes;
console.log(isCorrect);

*/
/*
function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  // 2024 - 2017
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}`;
}

const age1 = calcFactAge(2017);
console.log(age1);

console.log(calcFactAge(2020));
console.log(calcFactAge(2037));

//const calcFactAge2 = (year) => 2022 - year;
const calcFactAge2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Impossible year. Year needs to be less or equal ${new Date().getFullYear()}`;
console.log(calcFactAge2(2017));
console.log(calcFactAge2(2037));

/*
let votesInteresting = 20;
let votesMindblowing = 5;
if (votesInteresting === votesMindblowing) {
  alert("This fact is equally interesting and mindblowing");
} else if (votesInteresting > votesMindblowing) {
  console.log("Interesting fact!");
} else if (votesInteresting < votesMindblowing) {
  console.log("Mindblowing fact!!");
}

//falsy values: 0, '', null, undefined
if (votesMindblowing) {
  console.log("Mindblowing fact!!!");
} else {
  console.log("Not so special...");
}

let votesFalse = 7;
const totalUpvotes = votesInteresting + votesMindblowing;
const message =
  totalUpvotes > votesFalse
    ? "The fact is true"
    : "Might be false, check more sources...";

const text =
  "ReactJS is a popular open-source JavaScript library used for building user interfaces. It was developed by Facebook and was first released in 2013";
const upperText = text.toUpperCase();
console.log(upperText);

const str = `The current fact is "${text}". It is ${calcFactAge(
  2017
)} years old. It is probably ${
  totalUpvotes > votesFalse ? "correct" : "not true"
}.`;
console.log(str);
*/

/*
const fact = [
  "ReactJS is a popular open-source JavaScript library used for building user interfaces. It was developed by Facebook and was first released in 2013",
  2017,
  true,
  "something",
];
console.log(fact[2]);
console.log(fact.length);
console.log(fact[fact.length - 1]);

const [text, createdIn] = fact;
const newFact = [...fact, "society"];
console.log(newFact);

// [2, 4, 6, 8].forEach(function (el) {
//  console.log(el);
// });

// const times10 = [2, 4, 6, 8].map(function (el) {
//  return el * 10;
// });
const times10 = [2, 4, 6, 8].map((el) => el * 10);
console.log(times10);



const allCategories = CATEGORIES.map((el) => el.name);
console.log(allCategories);



const factAges = initialFacts.map((el) => calcFactAge(el.createdIn));
console.log(factAges);

/*
const factObj = {
  text: "ReactJS is a popular open-source JavaScript library used for building user interfaces. It was developed by Facebook and was first released in 2013",
  category: "society",
  createdIn: 2015,
  isCorrect: true,
  createSummary: function () {
    return `The fact "${
      this.text
    }" is from the category ${this.category.toUpperCase()}`;
  },
};

console.log(factObj.text);
console.log(factObj["text"]);

const { category, isCorrect } = factObj;
console.log(category);
console.log(factObj.createSummary());
*/
