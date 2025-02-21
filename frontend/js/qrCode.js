// qrCode.js

function generateQRCode(ticketId) {
    const qrCodeContainer = document.getElementById('qr-code');
    const qrCode = new QRCode(qrCodeContainer, {
        text: `ticket://${ticketId}`,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
}

// Call this function on the page where you want to display the QR code
generateQRCode("12345ABCD");

