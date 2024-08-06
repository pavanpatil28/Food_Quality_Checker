document.addEventListener('DOMContentLoaded', (event) => {
    const extractText = () => {
        const imageUpload = document.getElementById('imageUpload').files[0];
        const loader = document.getElementById('loader');
        const evaluation = document.getElementById('evaluation');

        if (!imageUpload) {
            alert('Please upload an image first.');
            return;
        }

        loader.style.display = 'block';
        evaluation.innerHTML = '';

        Tesseract.recognize(
            imageUpload,
            'eng',
            {
                logger: m => console.log(m)
            }
        ).then(({ data: { text } }) => {
            loader.style.display = 'none';
            sendTextToBackend(text);
        }).catch(err => {
            loader.style.display = 'none';
            alert('Error extracting text. Please try again.');
            console.error(err);
        });
    };

    const sendTextToBackend = (text) => {
        $.ajax({
            url: '/api/receive-text', // Updated URL to the Vercel serverless function
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ text: text }),
            success: (response) => {
                displayEvaluation(response.evaluation);
            },
            error: (err) => {
                alert('Error sending text to backend.');
                console.error(err);
            }
        });
    };

    const displayEvaluation = (evaluationText) => {
        const evaluation = document.getElementById('evaluation');
        const formattedText = evaluationText
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Replace **text** with <b>text</b>
            .replace(/(\d+\.\s+[^$]+)/g, '<div class="evaluation-point">$1</div>'); // Add divs around each point
        evaluation.innerHTML = `${formattedText}`;
    };

    window.extractText = extractText;
});
