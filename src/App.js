import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        //Errors in console:
        //if (error) setFacts(facts);
        //else alert("There was a problem getting data");
        setFacts(facts);
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return (
    <p className="message">
      Loading...
      <br />
      <img src="dino.png" height="80" width="80" alt="Loading Dino" />
    </p>
  );
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Learn With Me";
  return (
    <header className="header">
      <div className="logo">
        <img src="robot.png" height="80" width="80" alt="Learn With Me Robot" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        style={{ backgroundColor: "rgb(234, 219, 200)" }}
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

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

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1.Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);
    // 2.Check if data is valid. If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3.Create new fact object
      //      const newFact = {
      //        id: Math.round(Math.random() * 10000000),
      //        text,
      //        source,
      //        category,
      //        votesInteresting: 0,
      //        votesMindblowing: 0,
      //        votesFalse: 0,
      //        createdIn: new Date().getFullYear(),
      //      };

      // 3.Upload fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      console.log(newFact);
      // 4.Add new fact to the UI: add the fact to state

      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5.Reset input fields
      setText("");
      setSource("");
      setCategory("");

      // 6.Close the entire form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source (input link)"
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      <button
        className="btn btn-large"
        disabled={isUploading}
        style={{ backgroundColor: "rgb(234, 219, 200)" }}
      >
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet! Create the first one 🤓
      </p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }
  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[❌DISPUTED]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍🏻 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>

        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ❌ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
