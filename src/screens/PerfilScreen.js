import { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../App.styles';
import { perfilStyles } from './PerfilScreen.style';
import { useAuth } from '../contexts/AuthContext';

const opcoes = [
  { nome: 'Editar perfil', icone: 'person-outline', rota: 'EditarPerfil' },
  { nome: 'Meus agendamentos', icone: 'calendar-outline', rota: 'MinhasConsultas' },
  { nome: 'Notificações', icone: 'notifications-outline', rota: 'Notificacoes' },
  { nome: 'Ajuda e suporte', icone: 'help-circle-outline', rota: 'Ajuda' },
  { nome: 'Configurações', icone: 'settings-outline', rota: 'Configuracoes' },
];

// Extrai as iniciais do nome pra usar no avatar (ex: "Felipe Silva" -> "FS")
function pegarIniciais(nome) {
  if (!nome) return '?';
  const partes = nome.trim().split(' ').filter(Boolean);
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export default function PerfilScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [saindo, setSaindo] = useState(false);

  const nome = user?.displayName || 'Usuário';
  const email = user?.email || '';

  const handleLogout = async () => {
    setSaindo(true);
    try {
      await logout();
    } catch (e) {
      console.error('Erro ao sair da conta:', e);
    } finally {
      setSaindo(false);
    }
  };

  return (
    <View style={perfilStyles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* ===== HEADER ===== */}
        <View style={perfilStyles.header}>
          <View style={perfilStyles.headerTop}>
            <TouchableOpacity style={perfilStyles.iconButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={20} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={perfilStyles.iconButton}
              onPress={() => navigation.navigate('EditarPerfil')}
            >
              <Ionicons name="create-outline" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View style={perfilStyles.avatar}>
            <Text style={perfilStyles.avatarTexto}>{pegarIniciais(nome)}</Text>
          </View>

          <Text style={perfilStyles.nome}>{nome}</Text>
          <Text style={perfilStyles.email}>{email}</Text>

          <View style={perfilStyles.badgeStatus}>
            <Ionicons name="shield-checkmark" size={14} color={colors.white} />
            <Text style={perfilStyles.badgeStatusText}>Perfil ativo</Text>
          </View>
        </View>

        {/* ===== CARD DE OPÇÕES ===== */}
        <View style={perfilStyles.card}>
          <Text style={perfilStyles.tituloCard}>Minha conta</Text>

          <View style={perfilStyles.lista}>
            {opcoes.map((item) => (
              <TouchableOpacity
                key={item.nome}
                style={perfilStyles.itemOpcao}
                onPress={() => navigation.navigate(item.rota)}
              >
                <View style={perfilStyles.iconeOpcao}>
                  <Ionicons name={item.icone} size={18} color={colors.primary} />
                </View>
                <Text style={perfilStyles.textoOpcao}>{item.nome}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={perfilStyles.botaoSair}
            onPress={handleLogout}
            disabled={saindo}
          >
            {saindo ? (
              <ActivityIndicator color="#DC2626" size="small" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={18} color="#DC2626" />
                <Text style={perfilStyles.textoSair}>Sair da conta</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}