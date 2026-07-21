> [!NOTE]  
> The `Intelligence` feature must be enabled in `Experimental Features` in the Settings of Cashew.

Add transactions using natural language using Artificial Intelligence. Cashew Intelligence uses Apple Intelligence, a local on-device model only available on iOS. You can customize what information is sent to the model within the Intelligence settings in the Cashew app. Apple intelligence works offline, however, smaller local models tend to make more mistakes.

1) Enable Apple Intelligence on your iOS device.
    * See this <a href="https://support.apple.com/en-ca/121115">official guide</a> by Apple
    * Note that only newer Apple Devices support Apple Intelligence.

2) Enable the Apple Intelligence feature in Cashew's Intelligence settings

Once the setup has been completed, you can add transactions from natural language. To do so, swipe up on the (+) button on the main page (the same button used to add transactions). You will then be asked for a prompt. For example, you can write `Went grocery shopping yesterday and spent 50$`. The category, amount, notes, etc. will be automatically filled in based on the input. You can also use an image of a receipt instead of a text prompt.

<img src="assets/docs/automation/images/intelligence-popup.png" class="small"/>

Alternatively, you can use the <a href="./faq.html#app-links">App Link</a> feature and use the `/addTransaction/intelligence` endpoint which will be parsed to create a transaction.