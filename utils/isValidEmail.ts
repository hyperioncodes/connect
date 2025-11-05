export default function isValidEmail(email: string) {
  const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
