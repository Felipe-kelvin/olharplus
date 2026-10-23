import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../App.styles';
import { CLINICA, ESPECIALIDADES, EXAMES, MEDICOS } from '../data/clinicInfo';
import { clinicaStyles as styles } from './ClinicaScreen.styles';

const PROFISSIONAIS = Object.values(MEDICOS).flat();

function SectionTitle({ icon, title }) {
  return (
    <View style={styles.sectionTitle}>
      <View style={styles.sectionIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={styles.sectionHeading}>{title}</Text>
    </View>
  );
}

export default function ClinicaScreen() {
  const abrirWhatsApp = async () => {
    const mensagem = encodeURIComponent('Olá! Gostaria de mais informações sobre a clínica.');
    const url = `https://wa.me/${CLINICA.whatsapp}?text=${mensagem}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Não foi possível abrir o WhatsApp',
        'Verifique sua conexão e tente novamente.'
      );
    }
  };

  const abrirMapa = async () => {
    const query = encodeURIComponent(CLINICA.endereco.replace('\n', ', '));

    try {
      await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    } catch {
      Alert.alert(
        'Não foi possível abrir o mapa',
        'Verifique sua conexão e tente novamente.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="eye-outline" size={24} color={colors.white} />
          </View>
          <Text style={styles.eyebrow}>OLHAR+</Text>
          <Text style={styles.title}>Conheça a clínica</Text>
          <Text style={styles.subtitle}>
            Cuidado completo para a saúde dos seus olhos.
          </Text>
        </View>

        <View style={styles.demoNotice}>
          <Ionicons name="information-circle-outline" size={18} color="#8A5B00" />
          <Text style={styles.demoNoticeText}>
            Endereço, horários, exames e profissionais são demonstrativos. Atualize-os com informações reais.
          </Text>
        </View>

        <View style={styles.card}>
          <SectionTitle icon="location-outline" title="Endereço e localização" />
          <Text style={styles.bodyText}>{CLINICA.endereco}</Text>
          <TouchableOpacity
            style={styles.mapButton}
            accessibilityRole="button"
            accessibilityLabel="Ver localização no mapa"
            onPress={abrirMapa}
          >
            <Ionicons name="navigate-outline" size={17} color={colors.primaryLight} />
            <Text style={styles.mapButtonText}>Ver no mapa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <SectionTitle icon="time-outline" title="Horários de funcionamento" />
          {CLINICA.horarios.map((item) => (
            <View key={item.dias} style={styles.hoursRow}>
              <Text style={styles.hoursDay}>{item.dias}</Text>
              <Text style={[styles.hoursTime, item.horario === 'Fechado' && styles.closed]}>
                {item.horario}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <SectionTitle icon="medical-outline" title="Especialidades e exames" />
          <Text style={styles.subheading}>Especialidades</Text>
          <View style={styles.chipList}>
            {ESPECIALIDADES.map((item) => (
              <View key={item.id} style={styles.specialtyChip}>
                <Ionicons name={item.icone} size={15} color={colors.primary} />
                <Text style={styles.specialtyText}>{item.nome}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.subheading, styles.examHeading]}>Exames</Text>
          {EXAMES.map((exam) => (
            <View key={exam} style={styles.examRow}>
              <Ionicons name="checkmark-circle" size={17} color="#16845B" />
              <Text style={styles.examText}>{exam}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <SectionTitle icon="people-outline" title="Nossos profissionais" />
          {PROFISSIONAIS.map((professional) => (
            <View key={professional.id} style={styles.professionalRow}>
              <View style={styles.professionalAvatar}>
                <Ionicons name="person-outline" size={19} color={colors.primary} />
              </View>
              <View style={styles.professionalInfo}>
                <Text style={styles.professionalName}>{professional.nome}</Text>
                <Text style={styles.professionalDetails}>{professional.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.whatsappButton}
          accessibilityRole="button"
          accessibilityLabel="Entrar em contato pelo WhatsApp"
          onPress={abrirWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={21} color={colors.white} />
          <Text style={styles.whatsappButtonText}>Fale conosco pelo WhatsApp</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
