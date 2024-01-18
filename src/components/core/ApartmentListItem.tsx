import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import apartments from '../../../assets/data/airbnb/apartments.json';
import Animated from 'react-native-reanimated';

type ApartmentListItem = {
  apartment: (typeof apartments)[0];
  containerStyle?: ViewStyle;
};

const ApartmentListItem = ({
  apartment,
  containerStyle,
}: ApartmentListItem) => {
  return (
    <Animated.View style={[styles.card, containerStyle]}>
      <Image source={{ uri: apartment.image }} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{apartment.title}</Text>
        <Text style={styles.description}>
          Stay at this apartment for a night.
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>$ {apartment.price} night</Text>
          <Text style={styles.price}>
            {apartment.rating}({apartment.stars})
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'InterBold',
    marginBottom: 10,
    fontSize: 16,
  },
  image: {
    width: 150,
    aspectRatio: 1,
  },
  rightContainer: {
    padding: 10,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  description: {
    color: 'gray',
  },
  price: {
    fontFamily: 'InterBold',
  },
});

export default ApartmentListItem;
