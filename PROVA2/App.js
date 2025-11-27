import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "./pages/inicio";
import MeusCompromissos from "./pages/meusCompromissos";
import CompromissosEquipe from "./pages/compromissosEquipe";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} options={{ title: "Início" }}/>
        <Stack.Screen name="MeusCompromissos" component={MeusCompromissos} options={{ title: "Meus compromissos" }}/>
        <Stack.Screen name="CompromissosEquipe" component={CompromissosEquipe} options={{ title: "Compromissos da equipe" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
