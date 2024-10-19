import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ApiServiceFacade } from "../services/apiServiceFacade";
import { API_URL } from "../constants/constant";

function useClientCommand(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const apiServiceFacade = new ApiServiceFacade(API_URL);

  const fetchData = async (url) => {
    try {
      const response = await apiServiceFacade.get(url);
      setData(response.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return { fetchData, data, error };
}

export default useClientCommand;
