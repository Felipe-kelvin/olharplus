import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { colors } from '../../App.styles';
import { perfilStyles } from './PerfilScreen.style';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../services/firebaseConfig';

export default function EditarPerfilScreen({ navigation }) {
  const { user, refreshUser } = useAuth();
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarPerfil = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'usuarios', user.uid);
        const snapshot = await getDoc(docRef);
        const nomeNoFirestore = snapshot.exists() ? snapshot.data()?.nome : '';
        setNome((nomeNoFirestore || user.displayName || '').trim());
      } catch (e) {
        console.error('Erro ao carregar perfil:', e);
        setError('Não foi possível carregar os dados do perfil.');
      } finally {
        setLoading(false);
      }
    };

    carregarPerfil();
  }, [user]);

  const nomeValido = nome.trim().length >= 2;
  const mudouNome = nome.trim() !== (user?.displayName || '').trim();

  const salvar = async () => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para salvar o perfil.');
      return;
    }

    const nomeFormatado = nome.trim();
    if (!nomeFormatado || nomeFormatado.length < 2) {
      setError('Digite um nome com pelo menos 2 caracteres.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const docRef = doc(db, 'usuarios', user.uid);
      const snapshot = await getDoc(docRef);

      await updateProfile(auth.currentUser, { displayName: nomeFormatado });

      if (snapshot.exists()) {
        await updateDoc(docRef, {
          nome: nomeFormatado,
          email: user.email,
          atualizadoEm: new Date().toISOString(),
        });
      } else {
        await setDoc(docRef, {
          nome: nomeFormatado,
          email: user.email,
          telefone: '',
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
        });
      }

      await refreshUser();
      Alert.alert('Perfil atualizado', 'Seu nome foi salvo com sucesso.');
      navigation.goBack();
    } catch (e) {
      console.error('Erro ao salvar perfil:', e);
      setError('Não foi possível salvar o perfil. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <View style={perfilStyles.container}>
        <Text style={{ textAlign: 'center', marginTop: 40, color: colors.textPrimary }}>
          Faça login para editar seu perfil.
        </Text>
      </View>
    );
  }

  return (
    <View style={perfilStyles.container}>
      <StatusBar style="light" />
      <View style={{ padding: 16 }}>
        <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
          Editar perfil
        </Text>

        {loading ? (
          <View style={{ alignItems: 'center', paddingVertical: 30 }}>
            <ActivityIndicator color={colors.primaryLight} size="small" />
          </View>
        ) : (
          <>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Nome completo"
              autoCapitalize="words"
              style={{
                borderWidth: 1,
                borderColor: error ? '#DC2626' : '#E5E7EB',
                padding: 12,
                borderRadius: 10,
                marginBottom: 8,
                backgroundColor: colors.white,
              }}
            />

            <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 12 }}>
              Use seu nome completo ou como preferir ser chamado.
            </Text>

            {error ? (
              <Text style={{ color: '#DC2626', fontSize: 12, marginBottom: 12 }}>{error}</Text>
            ) : null}

            <TouchableOpacity
              onPress={salvar}
              disabled={saving || !nomeValido || !mudouNome}
              style={{
                backgroundColor: saving || !nomeValido || !mudouNome ? '#B7C7D9' : colors.primaryLight,
                padding: 12,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 48,
              }}
            >
              {saving ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={{ color: colors.white, fontWeight: '600' }}>Salvar</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
