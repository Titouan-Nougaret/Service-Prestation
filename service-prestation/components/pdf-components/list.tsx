import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ReactNode } from "react";

interface ListProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}

export function List({ children, style }: ListProps) {
  return (
    <View style={style ? [styles.list, style] : styles.list}>{children}</View>
  );
}

interface ListItemProps {
  children: ReactNode;
}

export function ListItem({ children }: ListItemProps) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.content}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "column",
    marginVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  bullet: {
    width: 15,
    fontSize: 12,
  },
  content: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.4,
  },
});
