import * as React from 'react';
import BeerList from './components/BeerList';
import Login from './components/Login';

const App: React.SFC<{}> = () => {
  const [beers, setBeers] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [abv, setAbv] = React.useState('');
  const [brewer, setBrewer] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState('');

  const handleGetBeers = async (): Promise<void> => {
    const response = await fetch('http://localhost:3000/beers');
    const res = await response.json();
    setBeers(res);
  };

  const handleAddNewBeer = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const response: Response = await fetch('http://localhost:3000/beer', {
      body: JSON.stringify({ abv: Number(abv), brewer, description, name }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    // eslint-disable-next-line no-console
    console.log(response);
    const res = await response.json();
    // eslint-disable-next-line no-console
    console.log(res);

    if (response.status === 201) {
      // eslint-disable-next-line no-alert
      alert('SUCCESS');
      setAbv('');
      setBrewer('');
      setDescription('');
      setName('');
    }
  };

  return (
    <div>
      <h1>MERN CMS Template</h1>
      <h2>Create New Beer</h2>
      <form id="create-beer-form" onSubmit={handleAddNewBeer}>
        <label htmlFor="abv">ABV</label>
        <input
          id="abv"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setAbv(e.target.value)
          }
          type="text"
        />
        <label htmlFor="brewer">Brewer</label>
        <input
          id="brewer"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setBrewer(e.target.value)
          }
          type="text"
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setDescription(e.target.value)
          }
          type="text"
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setName(e.target.value)
          }
          type="text"
        />
        <button type="submit">Add New Beer</button>
      </form>
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
