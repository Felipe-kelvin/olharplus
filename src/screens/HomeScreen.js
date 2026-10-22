import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, styles } from '../../App.styles';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const nomeUsuario = user?.displayName || user?.email?.split('@')[0] || 'Paciente';

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Ionicons name="menu" size={20} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notificacoes')}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>Olá, {nomeUsuario}!</Text>
        <Text style={styles.subtitulo}>Tudo pronto para o seu cuidado hoje?</Text>

        <View style={styles.chipRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Consulta em 2 dias</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Status: em dia</Text>
          </View>
        </View>
      </View>

      {/* ===== CARD INFO CONSULTA ===== */}
      <View style={styles.cardConsulta}>
        <Text style={styles.tituloCard}>Próxima consulta</Text>

        <View style={styles.consultaContainer}>
          <View style={styles.data}>
            <Text style={styles.dia}>24</Text>
            <Text style={styles.mes}>Julho</Text>
            <Text style={styles.semana}>Quinta-feira</Text>
          </View>

          <View style={styles.infoConsulta}>
            <Text style={styles.medico}>Dr. Luís Fernando</Text>
            <Text style={styles.especialidade}>Cardiologia</Text>
            <Text style={styles.horario}>10:30</Text>
          </View>
        </View>

      </View>

      {/* ===== AVISOS ===== */}
      <View style={styles.avisos}>
        <Text style={styles.tituloAvisos}>Avisos da clínica</Text>

        <View style={styles.cardAviso}>
          <View>
            <Text style={styles.avisoTitulo}>Lembrete</Text>
            <Text style={styles.avisoTexto}>
              Não se esqueça da sua consulta!{"\n"}Chegue com 15 minutos de antecedência.
            </Text>
          </View>
        </View>
      </View>

      {/* ===== BOTÃO AGENDAR ===== */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Consultas')}
      >
        <Text style={styles.textoBotao}>Agendar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}