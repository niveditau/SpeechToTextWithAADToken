require('dotenv').config();
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const { DefaultAzureCredential } = require("@azure/identity");
const resourceID = process.env.RESOURCE_ID;

/*
    This function gets the Azure Active Directory auth token for the Cognitive services scope and 
    passes it to Speech SDK config. Then we transcribe a locally stored wav file and get the results
    back from the speech service instance.
*/

async function fromFile() {
    // Getting the token
    const credential = new DefaultAzureCredential();
    const token = await credential.getToken("https://cognitiveservices.azure.com/.default");

    // Passing token to the Speech SDK
    const speechConfig = sdk.SpeechConfig.fromAuthorizationToken ("aad#" + resourceID + "#" + token.token, "westus");
    speechConfig.speechRecognitionLanguage = "en-US";

    // Telling SDK which file to transcribe
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("sample1.wav"));
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    // Getting the transcription result back from the Speech Service
    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case sdk.ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
}
fromFile();