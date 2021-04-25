import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

//HOOKS
import usePokemon from '../../hooks//usePokemon';

//COMPONENTS
import {PokemonListCarousel} from '../../components/Carousel';
import {Card} from '../../components/Card';
import Search from '../../assets/images/search.png';
import PokeBall from '../../assets/images/pokeball.png';

const Home = props => {
  const {navigation} = props;
  const {isLoading, error, usePokemonType} = usePokemon();
  const [typeSelected, setTypeSelected] = useState(0);
  const [typeHolder, setTypeHolder] = useState([]);
  const [renderView, SetRenderView] = useState(true);

  const getPokemonsType = async type => {
    SetRenderView(false);
    const data = await usePokemonType(type);
    setTypeHolder(data);
    setTimeout(() => {
      SetRenderView(true);
    }, 700);
  };

  const pokemonTypesList = [
    {
      name: 'Normal',
      id: 0,
      icon: require('../../assets/images/normal.png'),
    },
    {
      name: 'Fire',
      id: 1,
      icon: require('../../assets/images/fire.png'),
    },
    {
      name: 'Water',
      id: 2,
      icon: require('../../assets/images/water.png'),
    },
    {
      name: 'Flying',
      id: 3,
      icon: require('../../assets/images/flying.png'),
    },
    {
      name: 'Grass',
      id: 4,
      icon: require('../../assets/images/grass.png'),
    },
    {
      name: 'Poison',
      id: 5,
      icon: require('../../assets/images/poison.png'),
    },
    {
      name: 'Electric',
      id: 6,
      icon: require('../../assets/images/electric.png'),
    },
    {
      name: 'Ground',
      id: 7,
      icon: require('../../assets/images/ground.png'),
    },
    {
      name: 'Psychic',
      id: 8,
      icon: require('../../assets/images/psychic.png'),
    },
    {
      name: 'Rock',
      id: 9,
      icon: require('../../assets/images/rock.png'),
    },
    {
      name: 'Ice',
      id: 10,
      icon: require('../../assets/images/ice.png'),
    },
    {
      name: 'Bug',
      id: 11,
      icon: require('../../assets/images/bug.png'),
    },
    {
      name: 'Dragon',
      id: 12,
      icon: require('../../assets/images/dragon.png'),
    },
    {
      name: 'Ghost',
      id: 13,
      icon: require('../../assets/images/ghost.png'),
    },
    {
      name: 'Dark',
      id: 14,
      icon: require('../../assets/images/dark.png'),
    },
    {
      name: 'Steel',
      id: 15,
      icon: require('../../assets/images/steel.png'),
    },
    {
      name: 'Fairy',
      id: 16,
      icon: require('../../assets/images/fairy.png'),
    },
    {
      name: 'Fighting',
      id: 17,
      icon: require('../../assets/images/fighting.png'),
    },
  ];

  useEffect(() => {
    getPokemonsType(pokemonTypesList[typeSelected].name.toLowerCase());
  }, [typeSelected]);

  const renderItem = ({item}) => {
    return <Card item={item.pokemon} />;
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1, position: 'relative'}}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 24,
            color: 'yellow',
            marginTop: 15,
          }}>
          PokeDex
        </Text>
        <TouchableOpacity
          onPress={() => navigation.push('SearchScreen')}
          style={{
            backgroundColor: 'gray',
            height: 45,
            width: 45,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
          <Image
            style={{
              height: 30,
              width: 30,

              zIndex: 10,
            }}
            source={Search}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 25,
          flex: 1,
        }}>
        <PokemonListCarousel
          setTypeSelected={setTypeSelected}
          data={pokemonTypesList}
        />
        <View
          style={{
            flex: 1,
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {renderView ? (
            <FlatList
              style={{width: '100%'}}
              horizontal={false}
              numColumns={3}
              data={typeHolder}
              renderItem={renderItem}
              keyExtractor={item => item.pokemon.name}
              contentContainerStyle={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            />
          ) : (
            <Image
              style={{height: 150, width: 150, marginBottom: 75}}
              source={PokeBall}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;
