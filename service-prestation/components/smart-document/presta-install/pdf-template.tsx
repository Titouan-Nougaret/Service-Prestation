"use client";

import {
  FullmoonAddress,
  FullmoonWatermark,
  PdfViewerWrapper,
  Title,
} from "@/components/pdf-components";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";

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
