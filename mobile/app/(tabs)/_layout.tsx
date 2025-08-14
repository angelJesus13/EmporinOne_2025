import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // 🔒 Oculta el header
        tabBarStyle: { display: 'none' }, // opcional: oculta el tab bar
      }}
    />
  );
}
