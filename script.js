// 1. Load the QRCode.js library dynamically so you don't have to change your HTML head
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
document.head.appendChild(script);

script.onload = () => {
    // 2. Select your HTML Elements based on your classes
    const inputField = document.querySelector('.input-section input');
    const generateBtn = document.querySelector('.generate-btn');
    const qrImage = document.querySelector('.generated-qr');
    const downloadBtn = document.querySelector('.download-btn');

    // Create a hidden division container for the library to draw the initial canvas
    const hiddenQrContainer = document.createElement('div');
    
    // Initialize the library configurations
    const qrGenerator = new QRCode(hiddenQrContainer, {
        text: "https://example.com", // default placeholder value
        width: 400,                  // high-res for quality downloads
        height: 400,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Function to update the <img> source once the library finishes rendering
    function updateQrImageSrc() {
        // Wait briefly for the library to generate the base64 image data string
        setTimeout(() => {
            const generatedImgElement = hiddenQrContainer.querySelector('img');
            if (generatedImgElement) {
                qrImage.src = generatedImgElement.src;
            }
        }, 50);
    }

    // Run once on load to swap your "fake-qr.png" placeholder with a real starting QR code
    updateQrImageSrc();

    // 3. Action: Handle Clicking the "Generate" Button
    generateBtn.addEventListener('click', () => {
        const userUrl = inputField.value.trim();
        
        if (userUrl !== "") {
            qrGenerator.clear(); // Clear the old layout matrix
            qrGenerator.makeCode(userUrl); // Generate new layout matrix
            updateQrImageSrc(); // Push data back to your .generated-qr image tag
        } else {
            alert("Please paste or type a link first!");
        }
    });

    // 4. Action: Handle Clicking the "Download" Button
    downloadBtn.addEventListener('click', () => {
        const currentImageSrc = qrImage.src;
        
        // Safety check to ensure a QR code data string exists before downloading
        if (currentImageSrc && !currentImageSrc.includes('fake-qr.png')) {
            const triggerLink = document.createElement('a');
            triggerLink.download = 'gen-qr-code.png';
            triggerLink.href = currentImageSrc;
            
            document.body.appendChild(triggerLink);
            triggerLink.click();
            document.body.removeChild(triggerLink);
        } else {
            alert("Please generate a valid QR code before downloading!");
        }
    });
};