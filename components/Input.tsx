import { TextInput, StyleSheet } from "react-native";
type Props = {
  placeholder: string;
  onChangeText: any;
  value: any;
  isEmail?: boolean;
  isPass?: boolean;
};
export default function Input({
  placeholder,
  onChangeText,
  value,
  isEmail,
  isPass,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      {...(isEmail && { keyboardType: "email-address" })}
      {...(isPass && { secureTextEntry: true })}
      style={styles.text}
    />
  );
}
const styles = StyleSheet.create({
  text: {
    width: "40%",
    height: 50,
    textAlign: "center",
    borderRadius: 15,
    fontFamily: "Nunito",
    fontSize: 30,
    margin: 20,
    backgroundColor: "#f5f5f5",
  },
});
