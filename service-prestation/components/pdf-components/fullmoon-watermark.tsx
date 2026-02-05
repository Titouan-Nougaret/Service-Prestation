/* eslint-disable jsx-a11y/alt-text */
import { Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  watermark: {
    position: "absolute",
    top: "1%",
    right: "1%",
    width: 150,
    opacity: 0.5,
    zIndex: -1,
  },
});

export default function FullmoonWatermark() {
  return (
    <Image src="/fullmoon-logo.png" style={styles.watermark} fixed={true} />
  );
}
