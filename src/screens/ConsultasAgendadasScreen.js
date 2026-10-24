import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../App.styles';
import { consultasAgendadasStyles as styles } from './ConsultasAgendadasScreen.styles';

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function ConsultasAgendadasScreen({
  navigation,
  consultas,
  onCancelarConsulta,
}) {
  const [consultaParaCancelar, setConsultaParaCancelar] = useState(null);

  const confirmarCancelamento = (consulta) => {
    setConsultaParaCancelar(consulta);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="calendar-outline" size={23} color={colors.white} />
        </View>
        <Text style={styles.eyebrow}>SEU ACOMPANHAMENTO</Text>
        <Text style={styles.title}>Minhas consultas</Text>
        <Text style={styles.subtitle}>
          Consulte seus horários e gerencie seus agendamentos.
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximas consultas</Text>
          {consultas.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{consultas.length}</Text>
            </View>
          )}
        </View>

        {consultas.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="calendar-clear-outline" size={28} color={colors.primaryLight} />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma consulta agendada</Text>
            <Text style={styles.emptyText}>
              Quando você agendar uma consulta, ela aparecerá aqui.
            </Text>
          </View>
        ) : (
          consultas.map((consulta) => (
            <View key={consulta.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.specialtyBadge}>
                  <Text style={styles.specialtyBadgeText}>{consulta.especialidade}</Text>
                </View>
                <View style={styles.status}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Agendada</Text>
                </View>
              </View>

              <View style={styles.doctorRow}>
                <View style={styles.doctorAvatar}>
                  <Ionicons name="person-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{consulta.medico}</Text>
                  <Text style={styles.doctorLabel}>Profissional</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.dateTimeRow}>
                <View style={styles.dateTimeItem}>
                  <Ionicons name="calendar-outline" size={17} color={colors.primaryLight} />
                  <View>
                    <Text style={styles.dateTimeLabel}>Data</Text>
                    <Text style={styles.dateTimeValue}>{formatarData(consulta.data)}</Text>
                  </View>
                </View>
                <View style={styles.dateTimeItem}>
                  <Ionicons name="time-outline" size={17} color={colors.primaryLight} />
                  <View>
                    <Text style={styles.dateTimeLabel}>Horário</Text>
                    <Text style={styles.dateTimeValue}>{consulta.horario}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.rescheduleButton}
                  accessibilityRole="button"
                  onPress={() => navigation.navigate('AgendarConsulta', {
                    reagendarId: consulta.id,
                  })}
                >
                  <Ionicons name="calendar-outline" size={17} color={colors.primaryLight} />
                  <Text style={styles.rescheduleText}>Reagendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  accessibilityRole="button"
                  onPress={() => confirmarCancelamento(consulta)}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.scheduleButton}
          accessibilityRole="button"
          onPress={() => navigation.navigate('AgendarConsulta')}
        >
          <Ionicons name="add" size={20} color={colors.white} />
          <Text style={styles.scheduleButtonText}>Agendar nova consulta</Text>
        </TouchableOpacity>

        <Text style={styles.demoNotice}>
          Os agendamentos desta demonstração ficam salvos apenas enquanto o app estiver aberto.
        </Text>
      </ScrollView>

      <Modal
        transparent
        visible={!!consultaParaCancelar}
        animationType="fade"
        onRequestClose={() => setConsultaParaCancelar(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIcon}>
              <Ionicons name="close-circle-outline" size={25} color="#C24141" />
            </View>
            <Text style={styles.modalTitle}>Cancelar consulta?</Text>
            <Text style={styles.modalText}>
              Deseja cancelar a consulta de{' '}
              {consultaParaCancelar && formatarData(consultaParaCancelar.data)} às{' '}
              {consultaParaCancelar?.horario}?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalKeepButton}
                onPress={() => setConsultaParaCancelar(null)}
              >
                <Text style={styles.modalKeepText}>Manter consulta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  onCancelarConsulta(consultaParaCancelar.id);
                  setConsultaParaCancelar(null);
                }}
              >
                <Text style={styles.modalCancelText}>Sim, cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
