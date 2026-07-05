// Load the QRCode.js library dynamically so the page works without changing the HTML head
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
document.head.appendChild(script);

script.onload = () => {
    const inputField = document.querySelector('.input-section input');
    const generateBtn = document.querySelector('.generate-btn');
    const qrImage = document.querySelector('.generated-qr');
    const downloadBtn = document.querySelector('.download-btn');

    // Create an off-screen container so the QR library can render reliably on mobile browsers
    const hiddenQrContainer = document.createElement('div');
    hiddenQrContainer.style.position = 'absolute';
    hiddenQrContainer.style.left = '-9999px';
    hiddenQrContainer.style.top = '-9999px';
    hiddenQrContainer.style.width = '0';
    hiddenQrContainer.style.height = '0';
    hiddenQrContainer.style.overflow = 'hidden';
    document.body.appendChild(hiddenQrContainer);

    function renderQrCode(text) {
        hiddenQrContainer.innerHTML = '';

        const qrGenerator = new QRCode(hiddenQrContainer, {
            text,
            width: 400,
            height: 400,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
            const canvas = hiddenQrContainer.querySelector('canvas');
            const img = hiddenQrContainer.querySelector('img');

            if (canvas) {
                qrImage.src = canvas.toDataURL('image/png');
            } else if (img && img.src) {
                qrImage.src = img.src;
            }
        }, 50);
    }

    renderQrCode('https://example.com');

    generateBtn.addEventListener('click', () => {
        const userUrl = inputField.value.trim();

        if (userUrl !== '') {
            renderQrCode(userUrl);
        } else {
            alert('Please paste or type a link first!');
        }
    });

    downloadBtn.addEventListener('click', () => {
        const currentImageSrc = qrImage.src;

        if (currentImageSrc && !currentImageSrc.includes('fake-qr.png')) {
            const triggerLink = document.createElement('a');
            triggerLink.download = 'gen-qr-code.png';
            triggerLink.href = currentImageSrc;

            document.body.appendChild(triggerLink);
            triggerLink.click();
            document.body.removeChild(triggerLink);
        } else {
            alert('Please generate a valid QR code before downloading!');
        }
    });
};