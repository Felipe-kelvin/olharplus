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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';
import { colors } from '../../../App.styles';
import { authStyles } from './Auth.styles';

function traduzErroFirebase(codigo) {
  const mensagens = {
    'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
    'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
  };
  return mensagens[codigo] || 'Não foi possível criar a conta. Tente novamente.';
}

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const podeCadastrar =
    nome.trim().length > 0 &&
    email.includes('@') &&
    telefone.trim().length > 0 &&
    senha.length >= 6 &&
    confirmarSenha.length > 0 &&
    aceitouTermos &&
    !carregando;

  const handleCadastro = async () => {
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);
    try {
      const credencial = await createUserWithEmailAndPassword(auth, email.trim(), senha);

      // Nome exibido no objeto de auth do Firebase
      await updateProfile(credencial.user, { displayName: nome.trim() });

      // Documento do usuário no Firestore, com os dados que o resto do app vai consultar
      await setDoc(doc(db, 'usuarios', credencial.user.uid), {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        criadoEm: new Date().toISOString(),
      });

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
            <Ionicons name="person-add" size={30} color={colors.white} />
          </View>
          <Text style={authStyles.titulo}>Criar conta</Text>
          <Text style={authStyles.subtitulo}>Preencha seus dados para começar</Text>
        </View>

        <View style={authStyles.form}>
          {/* Nome */}
          <View style={authStyles.campo}>
            <Text style={authStyles.label}>Nome completo</Text>
            <View style={authStyles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color={colors.textSecondary} style={authStyles.inputIcone} />
              <TextInput
                style={authStyles.input}
                placeholder="Seu nome"
                placeholderTextColor={colors.textSecondary}
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>
          </View>

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

          {/* Telefone */}
          <View style={authStyles.campo}>
            <Text style={authStyles.label}>Telefone</Text>
            <View style={authStyles.inputWrapper}>
              <Ionicons name="call-outline" size={18} color={colors.textSecondary} style={authStyles.inputIcone} />
              <TextInput
                style={authStyles.input}
                placeholder="(99) 99999-9999"
                placeholderTextColor={colors.textSecondary}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
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
                placeholder="Mínimo 6 caracteres"
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
          </View>

          {/* Confirmar senha */}
          <View style={authStyles.campo}>
            <Text style={authStyles.label}>Confirmar senha</Text>
            <View style={authStyles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} style={authStyles.inputIcone} />
              <TextInput
                style={authStyles.input}
                placeholder="Repita a senha"
                placeholderTextColor={colors.textSecondary}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!mostrarSenha}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Termos (LGPD — dado de saúde é sensível) */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            onPress={() => setAceitouTermos(!aceitouTermos)}
          >
            <Ionicons
              name={aceitouTermos ? 'checkbox' : 'square-outline'}
              size={20}
              color={aceitouTermos ? colors.primaryLight : colors.textSecondary}
            />
            <Text style={{ fontSize: 12, color: colors.textSecondary, flex: 1 }}>
              Li e aceito os Termos de Uso e a Política de Privacidade
            </Text>
          </TouchableOpacity>

          {erro ? <Text style={authStyles.textoErro}>{erro}</Text> : null}

          <TouchableOpacity
            style={[authStyles.botaoPrimario, !podeCadastrar && authStyles.botaoPrimarioDesabilitado]}
            disabled={!podeCadastrar}
            onPress={handleCadastro}
          >
            {carregando ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={authStyles.textoBotaoPrimario}>Criar conta</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={authStyles.rodape}>
          <Text style={authStyles.textoRodape}>Já tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={authStyles.textoRodapeLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}