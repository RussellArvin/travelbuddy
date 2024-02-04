import { type NextPage } from "next";
import { MainHeader } from "./components/Layout/MainHeader/MainHeader";
import ItineraryList from "./components/Itineraries/ItineraryList/ItineraryList";
import { useState, useEffect } from "react";
const Home: NextPage = () => {
  // toggle navbar state
  const [toggleNavbar, setToggleNavBar] = useState(false)

  const handleNavigationOnClick = () => {
    setToggleNavBar(!toggleNavbar);
  }
  // tester
  //  useEffect(() => {
  //   console.log(toggleNavbar);
  // },[toggleNavbar])

  return (
    <>
      <MainHeader toggleNav={handleNavigationOnClick}/>
      <></>
      <ItineraryList />
    </>
  );
};

export default Home;
