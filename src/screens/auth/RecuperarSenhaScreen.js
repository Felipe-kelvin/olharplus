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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { colors } from '../../../App.styles';
import { authStyles } from './Auth.styles';

function traduzErroFirebase(codigo) {
  const mensagens = {
    'auth/invalid-email': 'E-mail inválido.',
    'auth/user-not-found': 'Não encontramos uma conta com esse e-mail.',
    'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
  };
  return mensagens[codigo] || 'Não foi possível enviar o e-mail. Tente novamente.';
}

export default function RecuperarSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const podeEnviar = email.includes('@') && !carregando;

  const handleRecuperar = async () => {
    setErro('');
    setCarregando(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setEnviado(true);
    } catch (e) {
      // Por segurança, não revelamos se o e-mail existe ou não —
      // mas aqui optamos por mostrar erro pra dar feedback claro ao usuário.
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        {!enviado ? (
          <>
            <View style={authStyles.logoWrapper}>
              <View style={authStyles.logoCirculo}>
                <Ionicons name="key-outline" size={30} color={colors.white} />
              </View>
              <Text style={authStyles.titulo}>Esqueceu sua senha?</Text>
              <Text style={authStyles.subtitulo}>
                Digite seu e-mail e enviaremos um link para redefinir sua senha
              </Text>
            </View>

            <View style={authStyles.form}>
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

              {erro ? <Text style={authStyles.textoErro}>{erro}</Text> : null}

              <TouchableOpacity
                style={[authStyles.botaoPrimario, !podeEnviar && authStyles.botaoPrimarioDesabilitado]}
                disabled={!podeEnviar}
                onPress={handleRecuperar}
              >
                {carregando ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={authStyles.textoBotaoPrimario}>Enviar link de recuperação</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={authStyles.sucessoWrapper}>
            <View style={authStyles.sucessoCirculo}>
              <Ionicons name="checkmark-circle" size={36} color="#22C55E" />
            </View>
            <Text style={authStyles.titulo}>E-mail enviado!</Text>
            <Text style={authStyles.sucessoTexto}>
              Enviamos um link de redefinição de senha para{'\n'}
              <Text style={{ fontWeight: '700', color: colors.textPrimary }}>{email}</Text>
              {'\n\n'}Verifique também a caixa de spam.
            </Text>

            <TouchableOpacity
              style={[authStyles.botaoPrimario, { marginTop: 24, width: '100%' }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={authStyles.textoBotaoPrimario}>Voltar para o login</Text>
            </TouchableOpacity>
          </View>
        )}

        {!enviado && (
          <View style={authStyles.rodape}>
            <Text style={authStyles.textoRodape}>Lembrou a senha? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={authStyles.textoRodapeLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}