async function o(r) {
  try {
    return await QRCode.toDataURL(r);
  } catch (e) {
    console.error("Error generating QR code:", e);
  }
}
export {
  o as generateQrcode
};
