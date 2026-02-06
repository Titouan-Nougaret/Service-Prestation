import { Text, View } from "@react-pdf/renderer";

export default function Title({ children }: { children: string }) {
  return (
    <View>
      <Text style={{ fontSize: 16, textAlign: "center", marginVertical: 40 }}>
        {children}
      </Text>
    </View>
  );
}
