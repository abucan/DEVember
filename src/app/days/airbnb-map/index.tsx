import { Stack } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import apartments from '../../../../assets/data/airbnb/apartments.json';
import CustomMarker from '../../../components/core/CustomMarker';
import ApartmentListItem from '../../../components/core/ApartmentListItem';
import { useMemo, useState } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const AirbnbMapScreen = () => {
  const [selectedApartments, setSelectedApartments] = useState<
    (typeof apartments)[0] | null
  >(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 43.508133,
    longitude: 16.442417,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const snapPoints = useMemo(() => [75, '50%', '90%'], []);
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={mapRegion}
      >
        {apartments.map((apartment) => (
          <CustomMarker
            key={apartment.latitude}
            apartment={apartment}
            onPress={() => setSelectedApartments(apartment)}
          />
        ))}
      </MapView>
      {selectedApartments && (
        <ApartmentListItem
          apartment={selectedApartments}
          containerStyle={{
            position: 'absolute',
            bottom: 100,
            left: 10,
            right: 10,
          }}
        />
      )}
      <BottomSheet index={0} snapPoints={snapPoints}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listTitle}>Over 1,000 places</Text>
          <BottomSheetFlatList
            data={apartments}
            contentContainerStyle={{ padding: 10, gap: 10 }}
            renderItem={({ item }) => <ApartmentListItem apartment={item} />}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default AirbnbMapScreen;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  listTitle: {
    textAlign: 'center',
    fontFamily: 'InterBold',
    fontSize: 16,
    marginBottom: 15,
    marginVertical: 5,
  },
});
