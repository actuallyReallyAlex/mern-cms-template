import * as React from 'react';

export interface Beer {
  name: string;
}

export interface BeerListProps {
  beers: Beer[];
}

const BeerList: React.SFC<BeerListProps> = ({ beers }) => (
  <ul id="beers-list">
    {beers.map((beer) => (
      <li key={beer.name}>{beer.name}</li>
    ))}
  </ul>
);

export default BeerList;
