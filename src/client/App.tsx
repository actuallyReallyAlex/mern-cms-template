import * as React from "react";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  const [beers, setBeers] = React.useState([]);

  const handleGetBeers = async () => {
    const response = await fetch("http://localhost:3000/beers");
    const res = await response.json();

    console.log({ response, res });
    setBeers(res);
  };

  return (
    <div>
      <h1>MERN CMS Template</h1>
      <ul id="beers-list">
        {beers.map((beer) => (
          <li key={beer.name}>{beer.name}</li>
        ))}
      </ul>
      <button
        disabled={beers.length > 0}
        id="get-beers"
        onClick={handleGetBeers}
      >
        Get Beers!
      </button>
    </div>
  );
};

export default App;
