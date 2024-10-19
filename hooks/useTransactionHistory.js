import { useEffect, useState } from "react";
import { ApiServiceFacade } from "../services/apiServiceFacade";

function useTransactionHistory() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const apiServiceFacade = new ApiServiceFacade(
    "https://eco-nation-api.onrender.com"
  );

  const fetchData = async () => {
    try {
      const response = await apiServiceFacade.get("/api/v1/transactions");
      setData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { fetchData, data, error };
}

export default useTransactionHistory;
