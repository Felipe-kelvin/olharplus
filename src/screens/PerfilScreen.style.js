import { StyleSheet } from "react-native";
import { colors } from "../../App.styles";

const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 5,
};

export const perfilStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ===== HEADER ===== //
  header: {
    backgroundColor: colors.primary,
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 14,
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
  },

  avatarTexto: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.primary,
  },

  nome: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
  },

  email: {
    color: colors.headerSubtitle,
    fontSize: 13,
    marginTop: 2,
    opacity: 0.9,
  },

  badgeStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 12,
  },

  badgeStatusText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "600",
  },

  // ===== CARD DE INFORMAÇÕES ===== //
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: -35,
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

  // ===== LISTA DE OPÇÕES ===== //
  lista: {
    gap: 4,
  },

  itemOpcao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F6",
  },

  iconeOpcao: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  textoOpcao: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.textPrimary,
    flex: 1,
  },

  // ===== BOTÃO SAIR ===== //
  botaoSair: {
    marginHorizontal: 16,
    marginTop: 22,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  textoSair: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "600",
  },
});