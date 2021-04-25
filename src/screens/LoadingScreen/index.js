import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Pikachu from '../../assets/images/pikachu.gif';
import {CommonActions} from '@react-navigation/native';

const LoadingScreen = props => {
  const navigation = props.navigation;

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        }),
      );
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <Image
        style={{
          height: 120,
          width: 120,
          resizeMode: 'contain',
        }}
        source={Pikachu}
      />
    </View>
  );
};

export default LoadingScreen;
