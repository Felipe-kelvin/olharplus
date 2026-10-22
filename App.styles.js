import { StyleSheet } from "react-native";

// Tokens de design — centraliza cores e espaçamentos pra facilitar manutenção
export const colors = {
  primary: "#0F4C81",
  primaryLight: "#1976D2",
  primaryBg: "#E8F3FF",
  background: "#F5F7FB",
  white: "#FFFFFF",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#4B5563",
  headerSubtitle: "#E5E7EB",
  iconBg: "rgba(255,255,255,0.15)",
  avisoTitulo: "#0C447C",
  avisoTexto: "#185FA5",
};

const spacing = {
  xs: 5,
  sm: 12,
  md: 20,
  lg: 22,
};

// Sombra reutilizável — elevation cobre Android, shadow* cobre iOS
const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 5,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ===== HEADER =====
  header: {
    backgroundColor: colors.primary,
    paddingTop: 55,
    paddingHorizontal: spacing.md,
    paddingBottom: 45,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  // botão circular dos ícones do header (menu / notificação)
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.iconBg,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "600",
  },

  subtitulo: {
    color: colors.headerSubtitle,
    fontSize: 14,
    marginTop: 4,
  },

  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    flexWrap: "wrap",
  },

  chip: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  chipText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "600",
  },

  // ===== CARD DE CONSULTA =====
  cardConsulta: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md - 4,
    marginTop: -25,
    padding: 18,
    borderRadius: 20,
    ...shadow,
  },

  tituloCard: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 14,
  },

  consultaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  data: {
    alignItems: "center",
    width: 72,
  },

  dia: {
    fontSize: 30,
    fontWeight: "600",
    color: colors.textPrimary,
    lineHeight: 34,
  },

  mes: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    textTransform: "uppercase",
    marginTop: 2,
  },

  semana: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },

  infoConsulta: {
    flex: 1,
    marginLeft: 14,
  },

  medico: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  especialidade: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 3,
  },

  horario: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  detalhes: {
    fontSize: 13,
    color: colors.primaryLight,
    marginTop: 12,
    fontWeight: "600",
  },

  // ===== AVISOS =====
  avisos: {
    marginHorizontal: spacing.md - 4,
    marginTop: spacing.lg,
  },

  tituloAvisos: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 10,
  },

  cardAviso: {
    backgroundColor: colors.primaryBg,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  avisoTitulo: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.avisoTitulo,
    marginBottom: 4,
  },

  avisoTexto: {
    fontSize: 13,
    color: colors.avisoTexto,
    width: "80%",
  },

  // ===== BOTÃO =====
  botao: {
    backgroundColor: colors.primaryLight,
    marginHorizontal: spacing.md - 4,
    marginTop: spacing.lg,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  botaoDesabilitado: {
    opacity: 0.5,
  },

  textoBotao: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },

  // ===== NAV INFERIOR =====
  navInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 12,
  },

  itemNav: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },

  textoNav: {
    fontSize: 10,
    marginTop: 3,
    color: colors.textMuted,
  },

  textoNavAtivo: {
    color: colors.primaryLight,
    fontWeight: "600",
  },
});