import { fetchAuthentication } from '../services/AuthService';
import { toast } from 'react-toastify';


export const fetchDataAndPaginate = (url: string, currentPage: number, setNumOfPage: (numOfPage: number) => void, setCurrentPage: (currentPage: number) => void, setData: (data: []) => void, setPending: (isPending: boolean) => void) => {
  fetchAuthentication.get(url)
    .then(res => {
      const { data, numOfPage } = res.data;
      setNumOfPage(numOfPage);
      if (data.length === 0 && currentPage > 1) {
        fetchDataAndPaginate(url, currentPage - 1, setNumOfPage, setCurrentPage, setData, setPending);
        setCurrentPage(currentPage - 1)
      }
      setData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data.');
    })
    .finally(() => {
      setPending(false);
    });
};
