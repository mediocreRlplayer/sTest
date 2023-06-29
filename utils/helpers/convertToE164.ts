// Converts a phone number to E.164 format, or throws an error if the number is invalid
function convertToE164(phoneNumber: string): string {
  // Check if phone number is an empty string and return an empty string
  if (phoneNumber.length === 0) {
    return "";
  }

  // Remove any non-digit characters from the phone number
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Check if the digitsOnly string is empty or not
  if (digitsOnly.length === 0) {
    throw new Error("Invalid phone number format");
  }

  // Add the country calling code (assuming US country code of "+1")
  const e164Number = `+1${digitsOnly}`;

  return e164Number;
}

export default convertToE164;
