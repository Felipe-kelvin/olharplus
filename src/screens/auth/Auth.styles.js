import { StyleSheet } from "react-native";
import { colors } from "../../../App.styles";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },

  // ===== TOPO =====
  logoWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },

  logoCirculo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
  },

  // ===== FORMULÁRIO =====
  form: {
    marginTop: 30,
    gap: 16,
  },

  campo: {
    gap: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    height: 52,
  },

  inputWrapperErro: {
    borderColor: "#DC2626",
  },

  inputIcone: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    height: "100%",
  },

  textoErro: {
    fontSize: 12,
    color: "#DC2626",
    marginTop: 2,
  },

  linkEsqueciSenha: {
    alignSelf: "flex-end",
  },

  textoLinkEsqueciSenha: {
    fontSize: 13,
    color: colors.primaryLight,
    fontWeight: "600",
  },

  // ===== BOTÃO =====
  botaoPrimario: {
    backgroundColor: colors.primaryLight,
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  botaoPrimarioDesabilitado: {
    opacity: 0.5,
  },

  textoBotaoPrimario: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  // ===== RODAPÉ (trocar entre telas) =====
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 26,
  },

  textoRodape: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  textoRodapeLink: {
    fontSize: 14,
    color: colors.primaryLight,
    fontWeight: "700",
  },

  // ===== MENSAGEM DE SUCESSO (recuperar senha) =====
  sucessoWrapper: {
    alignItems: "center",
    marginTop: 10,
  },

  sucessoCirculo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  sucessoTexto: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});