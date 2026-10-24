import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConsultasAgendadasScreen from '../screens/ConsultasAgendadasScreen';
import ConsultasScreen from '../screens/ConsultasScreen';

const Stack = createNativeStackNavigator();

function criarConsultaDemo() {
  const data = new Date();
  data.setDate(data.getDate() + 7);

  return {
    id: 'consulta-demo',
    especialidade: 'Estrabismo',
    medico: 'Dr. Luís Fernando',
    data: data.toISOString(),
    horario: '10:30',
  };
}

export default function ConsultasStack() {
  const [consultas, setConsultas] = useState([criarConsultaDemo()]);

  const cancelarConsulta = (id) => {
    setConsultas((atuais) => atuais.filter((consulta) => consulta.id !== id));
  };

  const salvarConsulta = (dados, reagendarId) => {
    setConsultas((atuais) => {
      const consultaAtualizada = {
        ...dados,
        id: reagendarId || `consulta-${Date.now()}`,
      };

      const atualizadas = reagendarId
        ? atuais.map((consulta) => consulta.id === reagendarId ? consultaAtualizada : consulta)
        : [...atuais, consultaAtualizada];

      return atualizadas.sort((a, b) => new Date(a.data) - new Date(b.data));
    });
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConsultasAgendadas">
        {(props) => (
          <ConsultasAgendadasScreen
            {...props}
            consultas={consultas}
            onCancelarConsulta={cancelarConsulta}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AgendarConsulta">
        {(props) => (
          <ConsultasScreen
            {...props}
            onConfirmarAgendamento={(dados) =>
              salvarConsulta(dados, props.route.params?.reagendarId)
            }
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
