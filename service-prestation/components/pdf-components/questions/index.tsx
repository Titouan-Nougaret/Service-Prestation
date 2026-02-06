import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Question() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la prestation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
