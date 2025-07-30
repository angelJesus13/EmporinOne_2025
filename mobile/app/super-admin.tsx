// app/super-admin.tsx
import { View, Text } from 'react-native';

export default function SuperAdmin() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bienvenido Super Admin</Text>
      <Text>Aquí puedes agregar el dashboard o funcionalidades especiales.</Text>
    </View>
  );
}
