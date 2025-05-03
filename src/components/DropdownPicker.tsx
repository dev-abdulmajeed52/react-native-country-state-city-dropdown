import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Option = {
  id: number;
  name: string;
};

type Props = {
  label: string;
  options: Option[];
  selected: number | null;
  onChange: (id: number) => void;
  disabled?: boolean;
};

const DropdownPicker: React.FC<Props> = ({ label, options, selected, onChange, disabled }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        enabled={!disabled}
        selectedValue={selected}
        onValueChange={(value) => {
          if (value !== 0 && value !== null) onChange(value);
        }}
      >
        <Picker.Item label={`-- ${label} --`} value={0} />
        {options.map((option) => (
          <Picker.Item key={option.id} label={option.name} value={option.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 4,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
  },
});

export default DropdownPicker;
