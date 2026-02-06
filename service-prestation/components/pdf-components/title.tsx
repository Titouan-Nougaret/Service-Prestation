import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface TitleProps {
  children: string;
  size?: "sm" | "md" | "lg";
  underline?: boolean;
  bold?: boolean;
  align?: "left" | "center" | "right" | "justify";
}

export default function Title({
  children,
  size = "md",
  underline = false,
  bold = false,
  align = "center",
}: TitleProps) {
  const sizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: sizes[size],
          textAlign: align,
          textDecoration: underline ? "underline" : "none",
          fontWeight: bold ? 700 : 400,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: "100%",
  },
});
