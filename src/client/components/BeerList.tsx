import * as React from "react";

export interface BeerListProps {
  beers: any[];
}

const BeerList: React.SFC<BeerListProps> = ({ beers }) => {
  return (
    <ul id="beers-list">
      {beers.map((beer) => (
        <li key={beer.name}>{beer.name}</li>
      ))}
    </ul>
  );
};

export default BeerList;
