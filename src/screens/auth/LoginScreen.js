import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { colors } from '../../../App.styles';
import { authStyles } from './Auth.styles';

// Traduz os códigos de erro do Firebase pra mensagens em português
function traduzErroFirebase(codigo) {
  const mensagens = {
    'auth/invalid-email': 'E-mail inválido.',
    'auth/user-not-found': 'Não encontramos uma conta com esse e-mail.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
  };
  return mensagens[codigo] || 'Não foi possível entrar. Tente novamente.';
}

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const podeEntrar = email.trim().length > 0 && senha.length > 0 && !carregando;

  const handleLogin = async () => {
    setErro('');

    if (!email.includes('@')) {
      setErro('Digite um e-mail válido.');
      return;
    }

    setCarregando(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha);
      // Navegação automática: o listener de auth no App.js troca de stack sozinho
    } catch (e) {
      setErro(traduzErroFirebase(e.code));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={authStyles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={authStyles.logoWrapper}>
          <View style={authStyles.logoCirculo}>
            <Ionicons name="eye" size={32} color={colors.white} />
          </View>
          <Text style={authStyles.titulo}>Bem-vindo de volta</Text>
          <Text style={authStyles.subtitulo}>Entre para continuar com seus agendamentos</Text>
        </View>

        <View style={authStyles.form}>
          {/* E-mail */}
          <View style={authStyles.campo}>
            <Text style={authStyles.label}>E-mail</Text>
            <View style={authStyles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color={colors.textSecondary} style={authStyles.inputIcone} />
              <TextInput
                style={authStyles.input}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>
          </View>

          {/* Senha */}
          <View style={authStyles.campo}>
            <Text style={authStyles.label}>Senha</Text>
            <View style={authStyles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} style={authStyles.inputIcone} />
              <TextInput
                style={authStyles.input}
                placeholder="Sua senha"
                placeholderTextColor={colors.textSecondary}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Ionicons
                  name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={authStyles.linkEsqueciSenha}
              onPress={() => navigation.navigate('RecuperarSenha')}
            >
              <Text style={authStyles.textoLinkEsqueciSenha}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          {erro ? <Text style={authStyles.textoErro}>{erro}</Text> : null}

          <TouchableOpacity
            style={[authStyles.botaoPrimario, !podeEntrar && authStyles.botaoPrimarioDesabilitado]}
            disabled={!podeEntrar}
            onPress={handleLogin}
          >
            {carregando ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={authStyles.textoBotaoPrimario}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={authStyles.rodape}>
          <Text style={authStyles.textoRodape}>Ainda não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={authStyles.textoRodapeLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}