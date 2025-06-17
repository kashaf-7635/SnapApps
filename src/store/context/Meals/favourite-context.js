import {createContext, useState} from 'react';

export const FavouriteContext = createContext({
  ids: [],
  addFavourite: id => {},
  removeFavourite: id => {},
});

const FavouriteContextProvider = ({children}) => {
  const [favMealIds, setFavMealIds] = useState([]);

  const addFavourite = id => {
    setFavMealIds(currFavIds => [...currFavIds, id]);
  };
  const removeFavourite = id => {
    setFavMealIds(currFavIds => currFavIds.filter(mealId => mealId !== id));
  };

  const value = {
    ids: favMealIds,
    addFavourite: addFavourite,
    removeFavourite: removeFavourite,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteContextProvider;
