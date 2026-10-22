import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTabs from "./AppTabs";
import NotificacoesScreen from "../screens/NotificacoesScreen";
import MinhasConsultasScreen from "../screens/ConsultasScreen";
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="AppTabs" component={AppTabs} />

      {/* Telas que abrem "por cima" das tabs, sem barra inferior */}
      <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
      <Stack.Screen name="MinhasConsultas" component={MinhasConsultasScreen} />
    </Stack.Navigator>
  );
}