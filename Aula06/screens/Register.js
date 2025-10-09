import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

 export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [authSenha, setAuthSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroAuth, setErroAuth] = useState('');
  
  const handleCadastro = () => {
    let valid = true;

    if (!email.includes('@')) {
      setErroEmail('Digite um e-mail válido');
      valid = false;
    } else {
      setErroEmail('');
    }

    if (senha.length < 6) {
      setErroSenha('A senha deve ter no mínimo 6 caracteres');
      valid = false;
    } else {
      setErroSenha('');
    }

    if (senha !== authSenha) {
      setErroAuth('As duas senhas não são iguais');
      valid = false;
    } else {
      setErroAuth('');
    }

    if (valid) {
      alert('Cadastro realizado com sucesso!');
      navigation.navigate('Welcome', { userName: nome, userEmail: email, userPhone: telefone, userPassword: senha });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nome Completo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        keyboardType="default"
        autoCapitalize="words"
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.titulo}>Cadastro:</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (text.includes('@')) setErroEmail('');
        }}
      />
      {erroEmail ? <Text style={styles.erro}>{erroEmail}</Text> : null}
      <Text style={styles.titulo}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(text) => {
          setSenha(text);
          if (text.length >= 6) setErroSenha('');
          if (authSenha && text === authSenha) setErroAuth('');
        }}
      />
      {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}
      <Text style={styles.titulo}>Confirme sua senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={authSenha}
        onChangeText={(text) => {
          setAuthSenha(text);
          if (senha && text === senha) setErroAuth('');
        }}
      />
      {erroAuth ? <Text style={styles.erro}>{erroAuth}</Text> : null}
      <Text style={styles.titulo}>Telefone:</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="numeric"
        value={telefone}
        onChangeText={setTelefone}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
 }
 const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 8 },
  erro: { color: 'red', marginBottom: 10 }
 });