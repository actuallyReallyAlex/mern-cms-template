import * as React from 'react';
import { Beer } from '../types';

export interface EditBeerFormProps {
  beer: Beer;
  setBeers: Function;
  setEditBeer: Function;
  setIsEditing: Function;
}

const EditBeerForm: React.SFC<EditBeerFormProps> = ({
  beer,
  setBeers,
  setEditBeer,
  setIsEditing,
}) => {
  const [abv, setAbv] = React.useState(beer.abv.toString());
  const [brewer, setBrewer] = React.useState(beer.brewer);
  const [description, setDescription] = React.useState(beer.description);
  const [name, setName] = React.useState(beer.name);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const changes = {};
    const newProperties = [
      { fieldName: 'abv', value: Number(abv) },
      { fieldName: 'brewer', value: brewer },
      { fieldName: 'description', value: description },
      { fieldName: 'name', value: name },
    ];
    newProperties.forEach(({ fieldName, value }) => {
      if (beer[fieldName] !== value) changes[fieldName] = value;
    });

    // eslint-disable-next-line no-underscore-dangle
    const response = await fetch(`http://localhost:3000/beer/${beer._id}`, {
      body: JSON.stringify(changes),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    });
    if (response.status === 200) {
      // * Set Beers again
      const beerResponse = await fetch('http://localhost:3000/beers');
      const beerRes = await beerResponse.json();
      setBeers(beerRes);
      setIsEditing(false);
      setEditBeer(null);
    } else {
      // eslint-disable-next-line no-alert
      alert('ERROR!');
    }
  };

  return (
    <form id="edit-beer-form" onSubmit={handleSubmit}>
      <label htmlFor="abv">ABV</label>
      <input
        id="abv"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setAbv(e.target.value)
        }
        type="text"
        value={abv}
      />
      <label htmlFor="brewer">Brewer</label>
      <input
        id="brewer"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setBrewer(e.target.value)
        }
        type="text"
        value={brewer}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setDescription(e.target.value)
        }
        type="text"
        value={description}
      />
      <label htmlFor="name">Name</label>
      <input
        id="name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setName(e.target.value)
        }
        type="text"
        value={name}
      />
      <button type="submit">Submit Changes</button>
    </form>
  );
};

export default EditBeerForm;
