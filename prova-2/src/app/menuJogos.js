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

const db = SQLite.openDatabaseSync("menuJogos.db");

//db.execSync(`DROP TABLE tarefas`);

db.execSync(`
    CREATE TABLE IF NOT EXISTS menuJogos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      plataforma VARCHAR(255) NULL,
      horas INTERGER NULL

    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM menuJogos ORDER BY id DESC");
}

function salvar(nome, plataforma, horas) {
  db.runSync("INSERT INTO menuJogos (nome, plataforma, horas) VALUES (?, ?, ?)", [nome, plataforma, horas]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM menuJogos WHERE id = ?", [codigo]);
}

function edita(nome, plataforma, horas, id) {
  db.runSync("UPDATE menuJogos SET nome = ?, plataforma = ?, horas = ? WHERE id = ?", [
    nome,
    plataforma,
    horas,
    id,
  ]);
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [horas, setHoras] = useState();
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(nome, plataforma, horas);
    } else {
      edita(nome, plataforma, horas, idEditando);
    }
    setNome("");
    setPlataforma("");
    setHoras();
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(menuJogos) {
    setIdEditando(menuJogos.id);
    setNome(menuJogos.nome);
    setPlataforma(menuJogos.plataforma);
    setHoras(menuJogos.horas);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Meus Jogos" }} />
      <Text> {idEditando}</Text>
      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do Jogo"
      />
      <TextInput
        style={styles.campo}
        value={plataforma}
        onChangeText={setPlataforma}
        placeholder="Plataforma do Jogo"
      />
      <TextInput
        style={styles.campo}
        value={horas}
        onChangeText={setHoras}
        placeholder="Horas Jogadas"
      />
      <Button title="Salvar" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.item}>
              {item.id} - Nome: {item.nome} - Plataforma: {item.plataforma} - Horas Jogadas: {item.horas}HRS
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
