import { useCallback } from 'react';
import { fetchAuthentication } from '../services/AuthService';
import { toast } from 'react-toastify';


type FetchDataTypes = {
  entity: string,
  setNumOfPage: (numOfPage: number) => void
  setCurrentPage: (numOfPage: number) => void
  setData: (data: []) => void
  setPending: (isPending: boolean) => void
}

const useFetchDataAndPaginate = ({ entity, setNumOfPage, setCurrentPage, setData, setPending }: FetchDataTypes) => {
  const fetchData = useCallback(async (currentPage: number) => {
    try {
      const res = await fetchAuthentication.get(`/api/${entity}?page=${currentPage}`);
      const { data, numOfPage } = res.data;
      setNumOfPage(numOfPage);
      if (data.length === 0 && currentPage > 1) {
        const prevPage = currentPage - 1;
        await fetchData(prevPage);
        setCurrentPage(prevPage);
      }
      setData(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('Failed to fetch cards.');
    } finally {
      setPending(false);
    }
  }, [setNumOfPage, setCurrentPage, setData, setPending, entity]);

  return fetchData;
};

export default useFetchDataAndPaginate;

