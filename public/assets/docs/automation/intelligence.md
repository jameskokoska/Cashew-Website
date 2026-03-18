> [!NOTE]  
> The `Intelligence` feature must be enabled in `Experimental Features` in the Settings of Cashew.

Add transactions using natural language using Artificial Intelligence. Cashew Intelligence uses Google Gemini. You can customize what information is sent to Gemini within the Intelligence settings in the Cashew app. Do not use this feature if you wish to not send information to Gemini. An API key is required to use this feature.

1) Get an API key
    * To get an API key [follow this guide here](https://ai.google.dev/gemini-api/docs/api-key).

2) Paste the API key into the API Key field within the Intelligence settings in Cashew. 
    * <img src="assets/docs/automation/images/intelligence-api-key.png" class="tiny"/>

Once the API key has been verified, you can add transactions from natural language. To do so, swipe up on the (+) button on the main page (the same button used to add transactions). You will then be asked for a prompt. For example, you can write `Went grocery shopping yesterday and spent 50$`. The category, amount, notes, etc. will be automatically filled in based on the input. You can also use an image of a receipt instead of a text prompt.

<img src="assets/docs/automation/images/intelligence-popup.png" class="small"/>

Alternatively, you can use the App Link feature and use a prompt parameter which will be parsed to create a transaction.