import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import DropdownPicker from './DropdownPicker';

type Option = {
  id: number;
  name: string;
};

type Props = {
  onChange: (country: Option, state: Option, city: Option) => void;
};

const API_BASE = 'https://api.gym-key.com/api/Location';

const CountryStateCityPicker: React.FC<Props> = ({ onChange }) => {
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/countries`);
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error('Failed to load countries:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async (countryId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/states/${countryId}`);
      const data = await res.json();
      setStates(data);
    } catch (err) {
      console.error('Failed to load states:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async (stateId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/cities/${stateId}`);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error('Failed to load cities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (id: number) => {
    const country = countries.find(c => c.id === id) || null;
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setStates([]);
    setCities([]);
    if (country) fetchStates(country.id);
  };

  const handleStateChange = (id: number) => {
    const state = states.find(s => s.id === id) || null;
    setSelectedState(state);
    setSelectedCity(null);
    setCities([]);
    if (state) fetchCities(state.id);
  };

  const handleCityChange = (id: number) => {
    const city = cities.find(c => c.id === id) || null;
    setSelectedCity(city);
    if (selectedCountry && selectedState && city) {
      onChange(selectedCountry, selectedState, city);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#000" />}
      <DropdownPicker
        label="Select Country"
        options={countries}
        selected={selectedCountry?.id || null}
        onChange={handleCountryChange}
      />
      <DropdownPicker
        label="Select State"
        options={states}
        selected={selectedState?.id || null}
        onChange={handleStateChange}
        disabled={!selectedCountry}
      />
      <DropdownPicker
        label="Select City"
        options={cities}
        selected={selectedCity?.id || null}
        onChange={handleCityChange}
        disabled={!selectedState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 12,
  },
});

export default CountryStateCityPicker;
