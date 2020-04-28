import * as React from 'react';
import BeerList from './components/BeerList';
import Login from './components/Login';
import CreateBeerForm from './components/CreateBeerForm';
import EditBeerForm from './components/EditBeerForm';
import { Beer } from './types';

const App: React.SFC<{}> = () => {
  const [beers, setBeers] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editBeer, setEditBeer] = React.useState(null);

  return (
    <div>
      <h1>MERN CMS Template</h1>
      {!isAuthenticated && (
        <Login
          setBeers={setBeers}
          setIsAuthenticated={setIsAuthenticated}
          setUser={setUser}
        />
      )}
      {isAuthenticated && (
        <>
          <h2>{user.name}</h2>
          <BeerList
            beers={beers}
            editBeer={editBeer}
            setIsEditing={setIsEditing}
            setEditBeer={setEditBeer}
          />
          {isEditing && (
            <EditBeerForm
              // eslint-disable-next-line no-underscore-dangle
              beer={beers.find((beer: Beer) => beer._id === editBeer)}
              setBeers={setBeers}
              setEditBeer={setEditBeer}
              setIsEditing={setIsEditing}
            />
          )}
          <CreateBeerForm />
        </>
      )}
    </div>
  );
};

export default App;
