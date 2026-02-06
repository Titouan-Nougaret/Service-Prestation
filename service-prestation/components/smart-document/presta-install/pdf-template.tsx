"use client";

import {
  FullmoonAddress,
  FullmoonWatermark,
  List,
  ListItem,
  OrderInfo,
  PdfViewerWrapper,
  Title,
} from "@/components/pdf-components";
import Question from "@/components/pdf-components/questions";
import { OrderData } from "@/types/SmartDocumentBuilder";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";

const order: OrderData = {
  tarifPrestation: "100",
  moyenDePaiement: "CB",
  nomClient: "Doe",
  prenomClient: "John",
  adresseClient: "123 Rue de la Paix",
  codePostalClient: "75001",
  villeClient: "Paris",
};

export default function PrestaInstallPdf({
  className,
}: {
  className?: string;
}) {
  return (
    <PdfViewerWrapper className={className}>
      <Document>
        <Page size="A4" style={styles.page}>
          <FullmoonWatermark />
          <View style={styles.section}>
            <FullmoonAddress />
            <Title>
              MISE EN RELATION POUR PRESTATION D’INSTALLATION DE VOTRE
              CLIMATISEUR
            </Title>
            <OrderInfo orderData={order} />
            <Question />
            <List>
              <ListItem>
                Les éléments communiqués par le client engagent sa
                responsabilité.
              </ListItem>
              <ListItem>
                En cas de données erronées, incomplètes ou d&apos;impréparation
                rendant l&apos;intervention impossible ou dangereuse, Fullmoon
                pourra annuler, reporter ou facturer les ajustements
                nécessaires.
              </ListItem>
              <ListItem>
                Une arrivée électrique adaptée est à disposition du technicien
                pour raccordement à l&apos;unité extérieure, le tirage de
                l&apos;alimentation électrique peut faire l&apos;objet
                d&apos;une surfacturation.
              </ListItem>
              <ListItem>
                Le client s&apos;engage à ce que le site d&apos;installation
                soit conforme à la réglementation en vigueur (normes
                électriques, DTU, etc.) et à informer Fullmoon en cas de
                non-conformité connue.
              </ListItem>
              <ListItem>
                La pose des unités intérieures sera inférieure ou égale à 2m50,
                si cette hauteur est supérieure à 2m50, cela pourrait entraîner
                une surfacturation.
              </ListItem>
              <ListItem>
                La pose de l&apos;unité extérieure au sol ou sur support sera
                d&apos;une hauteur inférieure à 1m50, si cette hauteur est
                supérieure à 1m50, cela pourrait entraîner une surfacturation.
              </ListItem>
              <ListItem>
                L&apos;épaisseur du mur doit être inférieure à 30cm, si cette
                épaisseur est supérieure à 30cm, cela pourrait entraîner une
                surfacturation.
              </ListItem>
              <ListItem>
                Le technicien est autorisé à prendre des photographies du
                chantier si nécessaire, pour constater un empêchement, une
                non-conformité ou un besoin technique.
              </ListItem>
              <ListItem>
                Tout changement de prix doit être approuvé à l&apos;avance par
                un accord signé. À défaut, nous ne pourrons pas prendre en
                charge la différence.
              </ListItem>
              <ListItem>
                Le client s&apos;engage à renseigner et signer le procès-verbal
                de fin de chantier à l&apos;issue de l&apos;intervention. Ce
                document atteste de la bonne réalisation des travaux, et
                conditionne la validation de l&apos;installation ainsi que la
                traçabilité réglementaire des opérations effectuées.
              </ListItem>
            </List>
          </View>
        </Page>
      </Document>
    </PdfViewerWrapper>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    position: "relative",
    color: "black",
    fontFamily: "Teko",
  },
  section: {
    margin: 10,
    padding: 10,
  },
});
