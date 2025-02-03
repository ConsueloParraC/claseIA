import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

const App = () => {
  const [distancia, setDistancia] = useState(80);
  const [habitaciones, setHabitaciones] = useState(3);
  const [banos, setBanos] = useState(2);
  const [carros, setCarros] = useState(2);
  const [areaCons, setAreaCons] = useState(200);
  const [areaNoConstruida, setAreaNoConstruida] = useState(100);
  const [precio, setPrecio] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://ec2-52-90-124-102.compute-1.amazonaws.com:8080/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Distancia: distancia,
          habitaciones: habitaciones,
          Banos: banos,
          Carros: carros,
          AreaCons: areaCons,
          AreaNoConstruida: areaNoConstruida,
        }),
      });

      const data = await response.json();
      setPrecio(Math.round(data.predicted_price));
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Servicios de Peritaje</Text>
      <Text style={styles.subtitle}>Consuelo Parra su Perita de Confianza</Text>

      <Text style={styles.label}>Distancia: {distancia}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={distancia}
        onValueChange={setDistancia}
      />

      <Text style={styles.label}>Habitaciones: {habitaciones}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={20}
        step={1}
        value={habitaciones}
        onValueChange={setHabitaciones}
      />

      <Text style={styles.label}>Baños: {banos}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={8}
        step={1}
        value={banos}
        onValueChange={setBanos}
      />

      <Text style={styles.label}>Carros: {carros}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={20}
        step={1}
        value={carros}
        onValueChange={setCarros}
      />

      <Text style={styles.label}>Área Construida: {areaCons}</Text>
      <Slider
        style={styles.slider}
        minimumValue={40}
        maximumValue={1200}
        step={10}
        value={areaCons}
        onValueChange={setAreaCons}
      />

      <Text style={styles.label}>Área No Construida: {areaNoConstruida}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1000}
        step={10}
        value={areaNoConstruida}
        onValueChange={setAreaNoConstruida}
      />

      <Button title="Calcular Precio" onPress={handleSubmit} />

      {precio !== null && (
        <Text style={styles.result}>Precio estimado: ${precio}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  slider: {
    width: 300,
    height: 40,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default App;