import React from "react";
import './App.css';
import Title from "./components/Title"
import InputForm from "./components/InputForm"
import MainCard from "./components/MainCard"
import Favorites from "./components/Favorites"

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {

  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = React.useState(() => jsonLocalStorage.getItem('counter') || 1);
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => jsonLocalStorage.getItem('favorites') || []);

  const alreadyFavorite = favorites.includes(mainCat)

  async function setInitialCat() {
    const newCat = await fetchCat("First Cat");
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, [])

  async function updateMainCat(text) {
    const newCat = await fetchCat(text);
    setMainCat(newCat);

    setCounter((prev) => {
      const nextCount = prev + 1;
      jsonLocalStorage.setItem('counter', nextCount);
      return nextCount;
    });
  }

  function handleHeartClick() {
    const nextFavoriates = [...favorites, mainCat]
    setFavorites(nextFavoriates);
    jsonLocalStorage.setItem('favorites', nextFavoriates);
  }

  return (
    <div>
      <Title>{counter}번째 고양이 가라사대</Title>
      <InputForm updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
