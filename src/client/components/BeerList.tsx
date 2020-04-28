/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Beer } from '../types';

export interface BeerListProps {
  beers: Beer[];
  editBeer: string;
  setIsEditing: Function;
  setEditBeer: Function;
}

const BeerList: React.SFC<BeerListProps> = ({
  beers,
  editBeer,
  setIsEditing,
  setEditBeer,
}) => (
  <ul id="beers-list">
    {beers.map((beer) => (
      <li key={beer.name}>
        {beer.name}
        {!editBeer && editBeer !== beer._id && (
          <button
            onClick={(): void => {
              setEditBeer(beer._id);
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
        {editBeer && editBeer === beer._id && (
          <button
            onClick={(): void => {
              setEditBeer(null);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </li>
    ))}
  </ul>
);

export default BeerList;
