import { OrderData } from "@/types/SmartDocumentBuilder";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function OrderInfo({ orderData }: { orderData: OrderData }) {
  const {
    tarifPrestation,
    moyenDePaiement,
    nomClient,
    prenomClient,
    adresseClient,
    codePostalClient,
    villeClient,
  } = orderData;
  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.label}>Prix de la prestation : </Text>
        {tarifPrestation} €
      </Text>
      <Text>
        <Text style={styles.label}>Moyen de paiement : </Text>
        {moyenDePaiement}
      </Text>
      <Text>
        <Text style={styles.label}>Nom et prénom du client : </Text>
        {nomClient} {prenomClient}
      </Text>
      <Text>
        <Text style={styles.label}>Adresse du client : </Text>
        {adresseClient}, {codePostalClient} {villeClient}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    fontSize: 12,
    flexDirection: "column",
    gap: 7,
  },
  label: {
    fontWeight: 600,
  },
});
