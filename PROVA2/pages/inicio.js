import { View, Text, Button, StyleSheet } from "react-native";

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda do dia</Text>

      <Text style={styles.texto}>Pedro Henrique Mendes Cândido</Text>
      <Text style={styles.texto}>6° Semestre Engenharia de Software</Text>

      <View style={styles.botoes}>
        <Button
          title="Meus compromissos"
          onPress={() => navigation.navigate("MeusCompromissos")}
        />
      </View>

      <View style={styles.botoes}>
        <Button
          title="Compromissos da equipe"
          onPress={() => navigation.navigate("CompromissosEquipe")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center"},
  titulo: {fontSize: 22, marginBottom: 16},
  texto: {fontSize: 16, marginBottom: 4},
  botoes: {marginTop: 12, width: 200},
});
