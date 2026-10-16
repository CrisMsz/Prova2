import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inicio() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Qualquer outra coisa" }} />

      <View style={styles.cabecalho}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.saudacao}>Olá, Estudante</Text>
          <Text style={styles.subtitulo}>Bem-vindo de volta</Text>
        </View>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Bordeis</Text>
        <Text style={styles.detalhe}>...</Text>
        <Link href="/bordel" style={styles.link}>
          Ver meus bordeis →
        </Link>
        </View>

        <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Flores</Text>
        <Text style={styles.detalhe}>...</Text>
        <Link href="/flores" style={styles.link}>
          Ver minhas flores →
        </Link>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D9DDE3",
  },

  saudacao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitulo: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },

  cartao: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 6,
  },

  cartaoTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  detalhe: {
    fontSize: 14,
    color: "#374151",
  },

  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2354D6",
    marginTop: 4,
  },
});
