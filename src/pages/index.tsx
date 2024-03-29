import { type NextPage } from "next";
import { MainHeader } from "../components/Layout/MainHeader/MainHeader";
import ItineraryList from "../components/Itineraries/ItineraryList/ItineraryList";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { ClerkProvider } from "@clerk/clerk-react";

const Home: NextPage = () => {
  const {
    data: planData,
    isLoading: isPlansLoading
  } = api.plan.findAll.useQuery()

  return (  
    <>
      <MainHeader />
      {isPlansLoading ? (
        // Show loading spinner while the plans are loading
        <LoadingSpinner isLoading={isPlansLoading} />
      ) : (
        // Render ItineraryList once the loading is finished and planData is available
        <ItineraryList itineraries={planData!} />
      )}
    </>
  );
};

export default Home;
