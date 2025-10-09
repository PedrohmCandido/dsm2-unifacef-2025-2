import { View, Text, Button, StyleSheet } from 'react-native';

export default function Welcome({navigation, route}) {
    const { userName, userEmail, userPhone, userPassword } = route.params;

    return(
        <View style={styles.container}>
            <Text style={styles.texto}>Bem-vindo, {userName}!</Text>
            <Text style={styles.texto}>Seu e-mail: {userEmail}</Text>
            <Text style={styles.texto}>Seu telefone: {userPhone}</Text>
            <Text style={styles.texto}>Senha: {userPassword}</Text>
            <Button title="Voltar ao Cadastro" onPress={() => navigation.navigate('Register')} />
        </View>
    )
}

 const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  texto: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
 });