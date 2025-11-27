import { View, Text, FlatList, StyleSheet } from "react-native";

const dados = [
  { id: "1", titulo: "09h30: Reunião \"Daily\"" },
  { id: "2", titulo: "14h00: Reunião com cliente Carros & Carros" },
  { id: "3", titulo: "16h30: Prazo final Projeto X" },
];

export default function MeusCompromissos() {
  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Text>{item.titulo}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>(Eu)</Text>

      <Text style={styles.texto}>Pedro Henrique Mendes Cândido</Text>
      <Text style={styles.texto}>6° Semestre Engenharia de Software</Text>

      <FlatList
        style={styles.lista}
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 32},
  titulo: {fontSize: 20, marginBottom: 8},
  texto: {fontSize: 16, marginBottom: 4},
  lista: {marginTop: 16, width: "80%"},
  item: {paddingVertical: 8},
});
