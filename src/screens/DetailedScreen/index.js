import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SvgUri} from 'react-native-svg';

import axios from 'axios';

import BackButton from '../../assets/images/left-arrow.png';

const DetailedScreen = props => {
  const {route, navigation} = props;
  const [otherDetails, setOtherDetails] = useState([]);
  const [evolutionDetails, setEvolutionDetails] = useState([]);

  const pokemonData = route.params['pokemonData'];

  const getOtherDetails = async url => {
    const newData = await axios.get(url);
    setOtherDetails(newData.data);
  };

  const getEvolutionChain = async url => {
    const newData = await axios.get(url);
    setEvolutionDetails(newData.data);
  };

  useEffect(() => {
    if (otherDetails?.evolution_chain?.url) {
      getEvolutionChain(otherDetails?.evolution_chain?.url);
    }
  }, [otherDetails?.evolution_chain?.url]);

  useEffect(() => {
    if (pokemonData?.species?.url) {
      getOtherDetails(pokemonData?.species?.url);
    }
  }, [pokemonData]);

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        paddingHorizontal: 20,
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
      <ScrollView>
        <View style={{alignItems: 'center', height: 250}}>
          <SvgUri
            style={{marginVertical: 25, resizeMode: 'contain'}}
            height={250}
            uri={pokemonData?.sprites?.other?.dream_world?.front_default}
          />
        </View>
        <Text
          style={{
            color: 'white',
            fontWeight: '800',
            textAlign: 'center',
            fontSize: 30,
            marginVertical: 25,
          }}>
          {pokemonData?.name?.toUpperCase()}
        </Text>
        <View>
          <Text style={styles.category}>TYPE/S</Text>
          <Text style={{marginBottom: 25}}>
            {pokemonData?.types.map(type => {
              return (
                <Text style={styles.textContent} key={type?.type?.name}>
                  {type?.type?.name?.toString().toUpperCase()}
                  {`    `}
                </Text>
              );
            })}
          </Text>
        </View>
        <View style={{marginBottom: 25}}>
          <Text style={styles.category}>ABILITIES</Text>
          {pokemonData?.abilities.map(ability => {
            return (
              <Text style={styles.textContent} key={ability?.ability?.name}>
                {ability?.ability?.name?.toString().toUpperCase()}
              </Text>
            );
          })}
        </View>
        <View style={{marginBottom: 25}}>
          <Text style={styles.category}>MOVES</Text>
          <Text>
            {pokemonData?.moves.map((moves, index) => {
              return (
                <Text style={styles.textContent} key={moves?.move?.name}>
                  {moves?.move?.name?.toString().toUpperCase()}
                  {index + 1 === pokemonData?.moves?.length ? '.' : `,   `}
                </Text>
              );
            })}
          </Text>
        </View>
        {otherDetails?.evolves_from_species?.name && (
          <Text style={{paddingBottom: 50, color: 'white', fontWeight: '700'}}>
            EVOLVES FROM{':  '}
            {otherDetails?.evolves_from_species?.name.toString().toUpperCase()}
          </Text>
        )}
        {evolutionDetails?.chain?.evolves_to[0]?.evolves_to[0]?.species
          ?.name && (
          <Text style={{paddingBottom: 50, color: 'white', fontWeight: '700'}}>
            EVOLVES TO{':  '}
            {evolutionDetails?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name
              .toString()
              .toUpperCase()}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailedScreen;

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
