import {useState} from 'react';

import {apiCall} from '../api';

const usePokemon = () => {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState();

  const errorCallBack = err => {
    let {response} = err;
    setLoading(false);
    setError(response.data.message || response.response || 'Network error');
    return false;
  };

  const usePokemonType = async id => {
    setLoading(true);
    try {
      const data = await apiCall.get(`type/${id}`);
      setLoading(false);

      return data?.data?.pokemon;
    } catch (err) {
      errorCallBack(err);
    }
  };

  const useGetPokemon = async id => {
    setLoading(true);
    try {
      const data = await apiCall.get(`pokemon/${id}`);
      setLoading(false);

      return data;
    } catch (err) {
      errorCallBack(err);
    }
  };

  const useSearchPokemon = async id => {
    console.log(id);
    setLoading(true);
    try {
      const data = await apiCall.get(`pokemon/${id}`);
      setLoading(false);
      return data;
    } catch (err) {
      errorCallBack(err);
    }
  };

  return {
    isLoading,
    error,
    usePokemonType,
    useGetPokemon,
    useSearchPokemon,
  };
};

export default usePokemon;
