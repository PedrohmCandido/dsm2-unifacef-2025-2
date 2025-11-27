import { View, Text, SectionList, StyleSheet } from "react-native";

const secoes = [
  {
    title: "(Eu)",
    data: ["09h30: Reunião \"Daily\"", "14h00: Reunião com cliente Carros & Carros", "16h30 Prazo final Projeto X"],
  },
  {
    title: "Jurema (chefe)",
    data: ["09h30: Reunião \"Daily\"", "12h00: Almoço com a diretoria", "15h00: Saída viagem"],
  },
  {
    title: "Aderbal",
    data: ["09h30: Reunião \"Daily\"", "Visita técnica Uni-FACEF", "16h30: Prazo final Projeto X"],
  },
];

export default function CompromissosEquipe() {
  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Text>{item}</Text>
      </View>
    );
  }

  function renderSectionHeader({ section }) {
    return (
      <View style={styles.cabecalho}>
        <Text style={styles.tituloSecao}>{section.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
    <Text style={styles.texto}>Pedro Henrique Mendes Cândido</Text>
    <Text style={styles.texto}>6° Semestre Engenharia de Software</Text>

      <SectionList
        style={styles.lista}
        sections={secoes}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1,alignItems: "center",justifyContent: "flex-start",paddingTop: 32},
  titulo: {fontSize: 20, marginBottom: 8},
  texto: {fontSize: 16, marginBottom: 4},
  lista: {marginTop: 16, width: "80%"},
  cabecalho: {paddingVertical: 4, alignItems: "center"},
  tituloSecao: {fontWeight: "bold"},
  item: {paddingVertical: 8},
});
