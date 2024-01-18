import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import apartments from '../../../assets/data/airbnb/apartments.json';

type CustomMarker = {
  apartment: (typeof apartments)[0];
  onPress: () => void;
};

const CustomMarker = ({ apartment, onPress }: CustomMarker) => {
  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: apartment.latitude,
        longitude: apartment.longitude,
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 20,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontFamily: 'InterBold' }}>$ {apartment.price}</Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;
