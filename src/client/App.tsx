import * as React from "react";
import BeerList from "./components/BeerList";
import Login from "./components/Login";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  const [beers, setBeers] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const handleGetBeers = async () => {
    const response = await fetch("http://localhost:3000/beers");
    const res = await response.json();
    setBeers(res);
  };

  return (
    <div>
      <h1>MERN CMS Template</h1>
      {!isAuthenticated && (
        <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      )}
      {isAuthenticated && (
        <>
          <h2>{user.name}</h2>
          <BeerList beers={beers} />
          <button
            disabled={beers.length > 0}
            id="get-beers"
            onClick={handleGetBeers}
          >
            Get Beers!
          </button>
        </>
      )}
    </div>
  );
};

export default App;
