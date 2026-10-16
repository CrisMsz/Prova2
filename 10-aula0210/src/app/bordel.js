import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("bordeis.db");

//db.execSync(`DROP TABLE tarefas`);

db.execSync(`
    CREATE TABLE IF NOT EXISTS bordeis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      cor VARCHAR(255) NOT NULL
    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM bordeis ORDER BY id DESC");
}

function salvar(nome, cor) {
  db.runSync("INSERT INTO bordeis (nome, cor) VALUES (?, ?)", [nome, cor]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM bordeis WHERE id = ?", [codigo]);
}

function edita(nome, cor, id) {
  db.runSync("UPDATE bordeis SET nome = ?, cor = ? WHERE id = ?", [
    nome,
    cor,
    id,
  ]);
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(nome, cor);
    } else {
      edita(nome, cor, idEditando);
    }
    setNome("");
    setCor("");
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(bordel) {
    setIdEditando(bordel.id);
    setNome(bordel.nome);
    setCor(bordel.cor);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Meus bordeis" }} />
      <Text> {idEditando}</Text>
      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do bordel"
      />
      <TextInput
        style={styles.campo}
        value={cor}
        onChangeText={setCor}
        placeholder="Cor do bordel"
      />
      <Button title="Salvar" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.item}>
              {item.id} - {item.nome} - {item.cor}
            </Text>
            <Button
              title="Editar"
              onPress={() => {
                editar(item);
              }}
            />
            <Button
              title="Excluir"
              onPress={() => {
                remover(item.id);
              }}
            />
          </View>
        )}
      />
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

  campo: {
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },

  lista: {
    flex: 1,
    marginTop: 16,
  },

  item: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    fontSize: 15,
    color: "#111827",
  },
});
