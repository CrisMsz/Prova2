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

const db = SQLite.openDatabaseSync("flores.db");

//db.execSync(`DROP TABLE tarefas`);

db.execSync(`
    CREATE TABLE IF NOT EXISTS flores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_cientifico VARCHAR(255) NOT NULL,
      nome VARCHAR(255) NOT NULL,
      cor VARCHAR(255) NOT NULL
    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM flores ORDER BY id DESC");
}

function salvar(nome_cientifico, nome, cor) {
  db.runSync("INSERT INTO flores (nome_cientifico, nome, cor) VALUES (?, ?, ?)", [nome_cientifico, nome, cor ]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM flores WHERE id = ?", [codigo]);
}

function edita(nome_cientifico, nome, cor, id) {
  db.runSync("UPDATE flores SET nome_cientifico = ?, nome = ?, cor = ? WHERE id = ?", [
    nome_cientifico,
    nome,
    cor,
    id,
  ]);
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [nome_cientifico, setNome_cientifico] = useState("");
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(nome_cientifico, nome, cor);
    } else {
      edita(nome_cientifico, nome, cor, idEditando);
    }
    setNome_cientifico("");
    setNome("");
    setCor("");
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(flores) {
    setIdEditando(flores.id);
    setNome_cientifico(flores.nome_cientifico);
    setNome(flores.nome);
    setCor(flores.cor);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Minhas Flores" }} />
      <Text> {idEditando}</Text>
      <TextInput
        style={styles.campo}
        value={nome_cientifico}
        onChangeText={setNome_cientifico}
        placeholder="Nome da Ciêntifico da Flor"
      />
      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome da Flor"
      />
      <TextInput
        style={styles.campo}
        value={cor}
        onChangeText={setCor}
        placeholder="Cor predominante da Flor"
      />
      <Button title="Salvar" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.item}>
              {item.id} - {item.nome_cientifico} - {item.nome} - {item.cor}
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
