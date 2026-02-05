import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function FullmoonAddress() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FULLMOON</Text>
      <Text style={styles.address}>255 Boulevard de la Madeleine</Text>
      <Text style={styles.address}>06000 Nice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "30px",
    width: 150,
  },
  title: {
    fontSize: 14, // Increased slightly because Teko is narrow
    fontWeight: 600,
  },
  address: {
    fontSize: 11, // Increased slightly because Teko is narrow
  },
});
