import { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../App.styles';
import { consultasStyles } from './ConsultasScreen.styles';
import { ESPECIALIDADES, MEDICOS } from '../data/clinicInfo';

const DATAS = [
  { dia: '24', semana: 'Qui' },
  { dia: '25', semana: 'Sexta' },
  { dia: '26', semana: 'Sáb' },
  { dia: '28', semana: 'Seg' },
  { dia: '29', semana: 'Ter' },
];

const HORARIOS = ['08:00', '09:00', '10:30', '13:00', '14:30', '16:00'];

const TOTAL_ETAPAS = 4;

export default function ConsultasScreen({ navigation }) {
  const [etapa, setEtapa] = useState(1);
  const [especialidade, setEspecialidade] = useState(null);
  const [medico, setMedico] = useState(null);
  const [data, setData] = useState(null);
  const [horario, setHorario] = useState(null);

  const medicosDisponiveis = especialidade ? MEDICOS[especialidade.id] : [];

  const podeAvancar = () => {
    if (etapa === 1) return !!especialidade;
    if (etapa === 2) return !!medico;
    if (etapa === 3) return !!data && !!horario;
    return true;
  };

  const avancar = () => {
    if (!podeAvancar()) return;
    if (etapa < TOTAL_ETAPAS) setEtapa(etapa + 1);
  };

  const voltar = () => {
    if (etapa > 1) setEtapa(etapa - 1);
  };

  const confirmarAgendamento = () => {
    // Aqui entra a chamada pra API / navegação de sucesso
    alert('Consulta agendada com sucesso!');
  };

  return (
    <View style={consultasStyles.container}>
      <StatusBar style="light" />

      {/* ===== HEADER ===== */}
      <View style={consultasStyles.header}>
        <View style={consultasStyles.headerTop}>
          <TouchableOpacity
            style={consultasStyles.iconButton}
            onPress={etapa > 1 ? voltar : () => navigation.navigate('Perfil')}
          >
            <Ionicons
              name={etapa > 1 ? 'arrow-back' : 'menu'}
              size={20}
              color={colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={consultasStyles.iconButton}
            onPress={() => navigation.navigate('Notificacoes')}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={consultasStyles.titulo}>Agendar Consulta</Text>

        <View style={consultasStyles.headerBadge}>
          <Text style={consultasStyles.headerBadgeText}>Atendimento rápido</Text>
        </View>

        <Text style={consultasStyles.subtitulo}>
          {etapa === 1 && 'Escolha a especialidade'}
          {etapa === 2 && 'Escolha o médico'}
          {etapa === 3 && 'Escolha data e horário'}
          {etapa === 4 && 'Confirme os dados'}
        </Text>

        {/* Indicador de etapas */}
        <View style={consultasStyles.etapasContainer}>
          {Array.from({ length: TOTAL_ETAPAS }).map((_, index) => {
            const numero = index + 1;
            const concluida = numero < etapa;
            const ativa = numero === etapa;
            return (
              <View key={numero} style={{ flexDirection: 'row', alignItems: 'center', flex: numero < TOTAL_ETAPAS ? 1 : 0 }}>
                <View
                  style={[
                    consultasStyles.etapaBolinha,
                    ativa && consultasStyles.etapaBolinhaAtiva,
                    concluida && consultasStyles.etapaBolinhaConcluida,
                  ]}
                >
                  {concluida ? (
                    <Ionicons name="checkmark" size={14} color={colors.white} />
                  ) : (
                    <Text
                      style={[
                        consultasStyles.etapaNumero,
                        ativa && consultasStyles.etapaNumeroAtiva,
                      ]}
                    >
                      {numero}
                    </Text>
                  )}
                </View>
                {numero < TOTAL_ETAPAS && (
                  <View
                    style={[
                      consultasStyles.etapaLinha,
                      concluida && consultasStyles.etapaLinhaConcluida,
                    ]}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* ===== ETAPA 1: ESPECIALIDADE ===== */}
        {etapa === 1 && (
          <View style={consultasStyles.card}>
            <Text style={consultasStyles.tituloCard}>Selecione a especialidade</Text>
            <View style={consultasStyles.lista}>
              {ESPECIALIDADES.map((item) => {
                const ativo = especialidade?.id === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[consultasStyles.itemSelecao, ativo && consultasStyles.itemSelecaoAtivo]}
                    onPress={() => {
                      setEspecialidade(item);
                      setMedico(null); // reseta médico se trocar especialidade
                    }}
                  >
                    <Ionicons
                      name={item.icone}
                      size={20}
                      color={colors.primary}
                      style={consultasStyles.iconeItem}
                    />
                    <Text style={consultasStyles.textoItem}>{item.nome}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ===== ETAPA 2: MÉDICO ===== */}
        {etapa === 2 && (
          <View style={consultasStyles.card}>
            <Text style={consultasStyles.tituloCard}>Médicos de {especialidade?.nome}</Text>
            <View style={consultasStyles.lista}>
              {medicosDisponiveis.map((item) => {
                const ativo = medico?.id === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[consultasStyles.itemSelecao, ativo && consultasStyles.itemSelecaoAtivo]}
                    onPress={() => setMedico(item)}
                  >
                    <View style={consultasStyles.avatarMedico}>
                      <Text style={consultasStyles.avatarMedicoTexto}>
                        {item.nome.split(' ')[1]?.[0] || item.nome[0]}
                      </Text>
                    </View>
                    <View style={consultasStyles.infoItem}>
                      <Text style={consultasStyles.textoItem}>{item.nome}</Text>
                      <Text style={consultasStyles.subtextoItem}>{item.sub}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ===== ETAPA 3: DATA E HORÁRIO ===== */}
        {etapa === 3 && (
          <View style={consultasStyles.card}>
            <Text style={consultasStyles.tituloCard}>Selecione a data</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={consultasStyles.dataScroll}
            >
              {DATAS.map((item) => {
                const ativo = data?.dia === item.dia;
                return (
                  <TouchableOpacity
                    key={item.dia}
                    style={[consultasStyles.dataItem, ativo && consultasStyles.dataItemAtivo]}
                    onPress={() => setData(item)}
                  >
                    <Text style={[consultasStyles.dataItemDia, ativo && consultasStyles.dataItemDiaAtivo]}>
                      {item.dia}
                    </Text>
                    <Text style={[consultasStyles.dataItemSemana, ativo && consultasStyles.dataItemSemanaAtivo]}>
                      {item.semana}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={consultasStyles.tituloCard}>Selecione o horário</Text>
            <View style={consultasStyles.horariosGrid}>
              {HORARIOS.map((item) => {
                const ativo = horario === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[consultasStyles.horarioItem, ativo && consultasStyles.horarioItemAtivo]}
                    onPress={() => setHorario(item)}
                  >
                    <Text style={[consultasStyles.horarioTexto, ativo && consultasStyles.horarioTextoAtivo]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ===== ETAPA 4: CONFIRMAÇÃO ===== */}
        {etapa === 4 && (
          <View style={consultasStyles.card}>
            <View style={consultasStyles.confirmacaoIconeWrapper}>
              <View style={consultasStyles.confirmacaoIconeCirculo}>
                <Ionicons name="checkmark-circle" size={40} color="#22C55E" />
              </View>
            </View>
            <Text style={[consultasStyles.tituloCard, { textAlign: 'center' }]}>
              Confira os dados da consulta
            </Text>

            <View style={consultasStyles.resumoLinha}>
              <View style={consultasStyles.resumoIcone}>
                <Ionicons name={especialidade?.icone} size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={consultasStyles.resumoLabel}>Especialidade</Text>
                <Text style={consultasStyles.resumoValor}>{especialidade?.nome}</Text>
              </View>
            </View>

            <View style={consultasStyles.resumoLinha}>
              <View style={consultasStyles.resumoIcone}>
                <Ionicons name="person-outline" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={consultasStyles.resumoLabel}>Médico</Text>
                <Text style={consultasStyles.resumoValor}>{medico?.nome}</Text>
              </View>
            </View>

            <View style={consultasStyles.resumoLinha}>
              <View style={consultasStyles.resumoIcone}>
                <Ionicons name="calendar-outline" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={consultasStyles.resumoLabel}>Data e horário</Text>
                <Text style={consultasStyles.resumoValor}>
                  {data?.dia}/{data?.semana} às {horario}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ===== BOTÕES DE NAVEGAÇÃO ===== */}
      <View style={consultasStyles.botoesEtapa}>
        {etapa > 1 && (
          <TouchableOpacity style={consultasStyles.botaoVoltar} onPress={voltar}>
            <Text style={consultasStyles.textoBotaoVoltar}>Voltar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            consultasStyles.botaoAvancar,
            !podeAvancar() && consultasStyles.botaoAvancarDesabilitado,
          ]}
          disabled={!podeAvancar()}
          onPress={etapa === TOTAL_ETAPAS ? confirmarAgendamento : avancar}
        >
          <Text style={consultasStyles.textoBotaoAvancar}>
            {etapa === TOTAL_ETAPAS ? 'Confirmar agendamento' : 'Avançar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}