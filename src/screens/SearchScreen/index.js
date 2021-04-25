import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';

import usePokemon from '../../hooks/usePokemon';
import BackButton from '../../assets/images/left-arrow.png';

const SearchScreen = props => {
  const {route, navigation} = props;
  const [searchData, setSearchData] = useState('');
  const {useSearchPokemon} = usePokemon();
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeText = async text => {
    setLoading(true);
    setTextSearch(text);
    const searchPokemon = await useSearchPokemon(text.toString().toLowerCase());
    searchPokemon?.data && setSearchData(searchPokemon?.data);

    setLoading(false);
  };

  const goToDetailScreen = () => {
    navigation.push('DetailedScreen', {pokemonData: searchData});
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        paddingHorizontal: 10,
        position: 'relative',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          width: '100%',
          height: 50,
          zIndex: 10,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <Image
          style={{
            height: 35,
            width: 35,
            marginTop: 15,
            marginLeft: 15,
            resizeMode: 'contain',
          }}
          source={BackButton}
        />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 25,
          backgroundColor: 'white',
          height: 50,
          width: '100%',
          marginTop: 60,
        }}>
        <TextInput
          autoCorrect={false}
          onChangeText={handleChangeText}
          style={{height: '100%', paddingLeft: 15}}
          placeholder="Search pokemon here..."
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {searchData ? (
          <TouchableOpacity
            onPress={goToDetailScreen}
            style={{
              width: 340,
              height: 340,
              marginVertical: 5,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              borderRadius: 500,
              marginBottom: 150,
            }}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <>
                <Image
                  style={{height: 225, width: 225}}
                  source={{
                    uri:
                      searchData?.sprites?.other?.['official-artwork']
                        ?.front_default,
                  }}
                />
                <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                  {searchData?.name?.toString()?.toUpperCase()}
                </Text>
              </>
            )}
          </TouchableOpacity>
        ) : textSearch.length > 0 ? (
          <Text style={{color: 'white'}}>No Results Found</Text>
        ) : null}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  category: {
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
    marginVertical: 10,
  },
  textContent: {
    color: 'white',
    marginLeft: 15,
    marginBottom: 3,
    fontWeight: '600',
  },
});
