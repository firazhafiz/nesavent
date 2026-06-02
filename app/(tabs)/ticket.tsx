import { Text, View } from "react-native";
export default function ScreenPlaceholder() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F8FA",
      }}
    >
      <Text>Screen Ready!</Text>
    </View>
  );
}
