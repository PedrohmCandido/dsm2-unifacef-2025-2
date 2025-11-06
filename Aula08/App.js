import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  // Avatar genérico inicial (pode trocar por uma imagem local se quiser)
  const DEFAULT_AVATAR = 'https://placehold.co/250x250/png?text=Avatar';
  const [imagem, setImagem] = useState(DEFAULT_AVATAR);

  async function abrirCamera() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Conceda acesso à câmera para tirar uma foto.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // quadrado para avatar
        quality: 0.9,
      });

      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    }
  }

  async function abrirGaleria() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Conceda acesso à galeria para escolher uma foto.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // quadrado para avatar
        quality: 0.9,
      });

      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Tirar Foto" onPress={abrirCamera} />
      <Button title="Escolher da Galeria" onPress={abrirGaleria} />

      <Image source={{ uri: imagem }} style={styles.image} />
    </View>
  );
}

const SIZE = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2, // deixa circular
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#eee',
  },
});
