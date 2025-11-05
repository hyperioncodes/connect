import { useWindowDimensions } from "react-native";

export default function heightPercentage(percentage: number) {
  const { height } = useWindowDimensions();
  return height * percentage;
}
