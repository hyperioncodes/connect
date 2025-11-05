import Dropdown from "react-native-input-select";

export default function Select({ val, setVal, options }: any) {
  return (
    <Dropdown
      label="Account type"
      placeholder="Select an account type..."
      options={options}
      selectedValue={val}
      onValueChange={(value) => setVal(value)}
    />
  );
}
