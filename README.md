# SpeechToTextWithAADToken
Using Azure Speech SDK with Azure Active Directory Authentication

This is a simple node application to demostrate how to use Speech SDK for transcription with Azure Active Directory token.

How to run this code
1. Clone the repository
2. Create a .env file in SpeechToTextWithAADToken directory and create a variable RESOURCE_ID="<your speech resource ID>" in that file
3. Copy the wav file you want to transcribe in SpeechToTextWithAADToken directory
4. When running first time you must run command "npm install" in the terminal
5. Run the program by running the command "node SpeechRecognition.js"
6. Once program is finished transcribing it will log the output in the terminal
