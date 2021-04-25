import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

export const PokemonListCarousel = props => {
  let {data, setTypeSelected, navigation} = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselRef, setCarouselRef] = useState(null);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.featuredTopNewsContainer}>
        <View
          style={
            item.name === 'Shadow' && {
              height: 80,
              width: 80,
              backgroundColor: '#7d337d',
              borderRadius: 50,
            }
          }>
          <Image style={{height: 80, width: 80}} source={item.icon} />
        </View>
        <Text
          style={{
            color: 'black',
            marginTop: 10,
            fontWeight: '700',
            color: 'white',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const {width: viewportWidth, height: viewportHeight} = Dimensions.get(
    'window',
  );

  return (
    <View>
      <Carousel
        itemWidth={120}
        sliderWidth={viewportWidth}
        data={data}
        firstItem={activeIndex}
        renderItem={renderItem}
        inactiveSlideScale={0.55}
        inactiveSlideOpacity={1}
        hasParallaxImages={true}
        activeSlideAlignment={'start'}
        ref={ref => setCarouselRef(ref)}
        onSnapToItem={index => {
          setActiveIndex(index);
          setTypeSelected(index);
        }}
        enableSnap
        loop
        lockScrollWhileSnapping
        activeSlideAlignment="center"
        contentContainerCustomStyle={{
          height: 120,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  featuredTopNewsContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#9c9c9c1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
