import { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../App.styles';
import { notificacoesStyles as styles } from './NotificacoesScreen.style';

// Mock — quando conectar ao Firestore, troca por uma query na coleção
// "notificacoes" filtrando por userId, ordenada por data desc.
const NOTIFICACOES_MOCK = [
  {
    id: '1',
    tipo: 'lembrete',
    titulo: 'Consulta amanhã',
    texto: 'Você tem consulta com Dr. Luís Fernando às 10:30. Chegue com 15 min de antecedência.',
    tempo: 'Há 2 horas',
    lida: false,
    grupo: 'Hoje',
  },
  {
    id: '2',
    tipo: 'confirmacao',
    titulo: 'Consulta agendada',
    texto: 'Sua consulta de 24 de julho às 10:30 foi confirmada com sucesso.',
    tempo: 'Há 5 horas',
    lida: false,
    grupo: 'Hoje',
  },
  {
    id: '3',
    tipo: 'cancelamento',
    titulo: 'Consulta cancelada',
    texto: 'Sua consulta com Dra. Camila Rocha do dia 18/07 foi cancelada.',
    tempo: 'Ontem',
    lida: true,
    grupo: 'Esta semana',
  },
  {
    id: '4',
    tipo: 'lembrete',
    titulo: 'Avalie sua consulta',
    texto: 'Como foi sua experiência com o Dr. André Souza? Deixe sua avaliação.',
    tempo: '3 dias atrás',
    lida: true,
    grupo: 'Esta semana',
  },
];

// Ícone + cor por tipo de notificação
const CONFIG_TIPO = {
  lembrete: { icone: 'time-outline', cor: '#D97706', fundo: '#FEF3C7' },
  confirmacao: { icone: 'checkmark-circle-outline', cor: '#16A34A', fundo: '#DCFCE7' },
  cancelamento: { icone: 'close-circle-outline', cor: '#DC2626', fundo: '#FEE2E2' },
  padrao: { icone: 'notifications-outline', cor: colors.primary, fundo: colors.primaryBg },
};

export default function NotificacoesScreen({ navigation }) {
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_MOCK);

  const temNaoLidas = notificacoes.some((n) => !n.lida);

  const marcarComoLida = (id) => {
    setNotificacoes((atual) =>
      atual.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes((atual) => atual.map((n) => ({ ...n, lida: true })));
  };

  // Agrupa por "grupo" (Hoje / Esta semana / etc) preservando a ordem de chegada
  const grupos = notificacoes.reduce((acc, item) => {
    if (!acc[item.grupo]) acc[item.grupo] = [];
    acc[item.grupo].push(item);
    return acc;
  }, {});

  const renderItem = (item) => {
    const config = CONFIG_TIPO[item.tipo] || CONFIG_TIPO.padrao;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.itemNotificacao, !item.lida && styles.itemNaoLida]}
        onPress={() => marcarComoLida(item.id)}
      >
        <View style={[styles.iconeWrapper, { backgroundColor: config.fundo }]}>
          <Ionicons name={config.icone} size={20} color={config.cor} />
        </View>

        <View style={styles.conteudo}>
          <View style={styles.linhaTopo}>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            {!item.lida && <View style={styles.bolinhaNaoLida} />}
          </View>
          <Text style={styles.itemTexto}>{item.texto}</Text>
          <Text style={styles.itemTempo}>{item.tempo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLado} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Notificações</Text>

        <TouchableOpacity
          style={styles.headerLado}
          onPress={marcarTodasComoLidas}
          disabled={!temNaoLidas}
        >
          {temNaoLidas && <Text style={styles.marcarTodasTexto}>Marcar{'\n'}todas</Text>}
        </TouchableOpacity>
      </View>

      {/* ===== LISTA OU ESTADO VAZIO ===== */}
      {notificacoes.length === 0 ? (
        <View style={styles.vazioContainer}>
          <View style={styles.vazioIconeCirculo}>
            <Ionicons name="notifications-off-outline" size={32} color={colors.primary} />
          </View>
          <Text style={styles.vazioTitulo}>Nenhuma notificação</Text>
          <Text style={styles.vazioTexto}>
            Você será avisado aqui sobre lembretes, confirmações e novidades da clínica.
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.entries(grupos)}
          keyExtractor={([grupo]) => grupo}
          contentContainerStyle={styles.lista}
          renderItem={({ item: [grupo, itens] }) => (
            <View>
              <Text style={styles.separadorData}>{grupo}</Text>
              {itens.map(renderItem)}
            </View>
          )}
        />
      )}
    </View>
  );
}