
import { StyleSheet } from "react-native";
import { colors } from "../../App.styles";

export const notificacoesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ===== HEADER =====
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F6",
  },

  headerLado: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  marcarTodasTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryLight,
    textAlign: "right",
    marginLeft: -45
  },

  // ===== LISTA =====
  lista: {
    padding: 16,
    gap: 10,
  },

  itemNotificacao: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: "flex-start",
  },

  itemNaoLida: {
    backgroundColor: colors.primaryBg,
  },

  iconeWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  conteudo: {
    flex: 1,
  },

  linhaTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  itemTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },

  bolinhaNaoLida: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryLight,
    marginTop: 4,
  },

  itemTexto: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },

  itemTempo: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 8,
  },

  // ===== SEPARADOR DE DATA =====
  separadorData: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 2,
    marginLeft: 4,
  },

  // ===== ESTADO VAZIO =====
  vazioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 80,
  },

  vazioIconeCirculo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  vazioTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6,
  },

  vazioTexto: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});

