import { Text, View } from "@react-pdf/renderer";

export default function Title({ children }: { children: string }) {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {children}
      </Text>
    </View>
  );
}
