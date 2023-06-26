const axios = require('axios').default

const hostname = process.argv.indexOf("headless") ? 'ai' : '127.0.0.1';

const summarizeVoiceMessage = async function(data, mimetype) {
    try {
        let formData = new FormData();
        formData.append('file', data, {
            type: mimetype
        })


        const transcription_response = await axios.post('http://' + hostname + ':5000/transcribe', formData)
        const transcription = transcription_response.data.transcription
        console.log(`Transcription: ${transcription}`)

        const summary_response = await axios.post('http://' + hostname + ':5000/summarize', { text: transcription })
        const summary = summary_response.data.summary
        console.log(`Summary: ${summary}`)

        return summary
    } catch (error) {
        console.error(error);
    }
}

const summarizeText = async function(text) {
    try {
        const summary_response = await axios.post('http://' + hostname + ':5000/summarize', { text: text })
        const summary = summary_response.data.summary
        console.log(`Summary: ${summary}`)

        return summary
    } catch (error) {
        console.error(error);
    }
}

module.exports = { summarizeVoiceMessage, summarizeText };

const main = async function() {
    const fs = require('fs/promises');
    const data = await fs.readFile("/home/marcel/Temp/signal.ogg");
    const data_blob = new Blob([data])
    summarizeVoiceMessage(data_blob, "audio/ogg")
}

if (require.main === module) {
    // Test the summarizing
    main()
}

