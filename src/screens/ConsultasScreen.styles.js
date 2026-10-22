import { StyleSheet } from "react-native";
import { colors } from "../../App.styles";

const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 5,
};

export const consultasStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ===== HEADER =====
  header: {
    backgroundColor: colors.primary,
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
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

  headerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 10,
  },

  headerBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
  },

  // ===== INDICADOR DE ETAPAS =====
  etapasContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginRight: 15,
  },

  etapaBolinha: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  etapaBolinhaAtiva: {
    backgroundColor: colors.white,
  },

  etapaBolinhaConcluida: {
    backgroundColor: "#4ADE80",
  },

  etapaNumero: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },

  etapaNumeroAtiva: {
    color: colors.primary,
  },

  etapaLinha: {
    flex: 1,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginHorizontal: 4,
  },

  etapaLinhaConcluida: {
    backgroundColor: "#4ADE80",
  },

  // ===== CARD =====
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: -5,
    padding: 18,
    borderRadius: 20,
    ...shadow,
    paddingBottom: 20,
  },

  tituloCard: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 14,
  },

  lista: {
    gap: 12,
  },

  // ===== ITEM DE SELEÇÃO (especialidade / médico) =====
  itemSelecao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryBg,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },

  itemSelecaoAtivo: {
    borderColor: colors.primaryLight,
  },

  iconeItem: {
    marginRight: 12,
  },

  avatarMedico: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarMedicoTexto: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
  },

  infoItem: {
    flex: 1,
  },

  textoItem: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },

  subtextoItem: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // ===== SELETOR DE DATA =====
  dataScroll: {
    marginBottom: 20,
  },

  dataItem: {
    width: 60,
    height: 74,
    borderRadius: 14,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },

  dataItemAtivo: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },

  dataItemDia: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  dataItemDiaAtivo: {
    color: colors.white,
  },

  dataItemSemana: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },

  dataItemSemanaAtivo: {
    color: colors.headerSubtitle,
  },

  // ===== GRID DE HORÁRIOS =====
  horariosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  horarioItem: {
    width: "30%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primaryBg,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },

  horarioItemAtivo: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },

  horarioTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },

  horarioTextoAtivo: {
    color: colors.white,
  },

  // ===== RESUMO / CONFIRMAÇÃO =====
  resumoLinha: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F6",
  },

  resumoIcone: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  resumoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  resumoValor: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 2,
  },

  confirmacaoIconeWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },

  confirmacaoIconeCirculo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
  },

  // ===== BOTÕES DE NAVEGAÇÃO DA ETAPA =====
  botoesEtapa: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 94,
    gap: 12,
  },

  botaoVoltar: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotaoVoltar: {
    color: colors.primaryLight,
    fontSize: 15,
    fontWeight: "600",
  },

  botaoAvancar: {
    flex: 2,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35
  },

  botaoAvancarDesabilitado: {
    opacity: 0.4,
  },

  textoBotaoAvancar: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});