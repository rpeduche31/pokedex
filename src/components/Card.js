import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export const Card = ({item}) => {
  const navigate = useNavigation();
  const [pokemonHolder, setPokemonHolder] = useState('');
  const [loading, setLoading] = useState('');

  const testFunction = async url => {
    if (url) {
      setLoading(true);
      const newData = await axios.get(url);
      setPokemonHolder(newData?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    testFunction(item.url);
    return function Cleanup() {
      testFunction('');
    };
  }, [item?.url]);

  const goToDetailScreen = () => {
    navigate.push('DetailedScreen', {pokemonData: pokemonHolder});
  };

  return (
    <TouchableOpacity
      onPress={goToDetailScreen}
      style={{
        width: 130,
        height: 150,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
          <Image
            style={{height: 125, width: 125}}
            source={{
              uri:
                pokemonHolder?.sprites?.other?.['official-artwork']
                  ?.front_default,
            }}
          />
          <Text style={{color: 'white', fontSize: 10, fontWeight: '800'}}>
            {pokemonHolder?.name?.toString()?.toUpperCase()}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
