> [!NOTE]
> The `Message Parsing` feature must be enabled in `Experimental Features` in the Settings of Cashew.

This feature allows you to automatically create transactions from received messages passed to Cashew. Most messages from other apps (such as banking apps) all follow a similar format, with only certain pieces of information changing per posted transaction message. You need to setup a configuration so Cashew understands how to parse the format for information such as the title or amount of a posted transaction. All message data is processed on device and is an optional service.

## Configuration

1) Create the message forwarding automation
    * We need to forward SMS messages to Cashew using Siri Shortcut automations
    * Open the Shortcuts app → `Automation` Tab → Tap (+) → `Message`
    * Configure the block so that it fowards messages from your bank
        * Either use the `Message contains...` or `Sender is...` to target these messages
    * <div class="img-scroll-container">
        <img src="assets/docs/automation/images/siri-shortcuts-1.png" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-message-parsing-1.jpg" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-message-parsing-2.jpg" class="tiny"/>
    </div>

2) Create the shortcut
    * Choose `Create New Shortcut` and add the Cashew `Parse Message For Transaction` action
    * <div class="img-scroll-container">
        <img src="assets/docs/automation/images/siri-shortcuts-4.png" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-message-parsing-3.jpg" class="tiny"/>
    </div>

3) Configure the shortcut input
    * Set `Message Text` to `Shortcut Input` → `Message`. To do this, tap the Message Text text input field → `Select Variable` → Scroll up and tap `Shortcut Input`. Then tap the `Shortcut Input`.
    * Configure all other fields as you wish
    * <div class="img-scroll-container">
        <img src="assets/docs/automation/images/siri-shortcuts-message-parsing-4.jpg" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-message-parsing-5.jpg" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-message-parsing-6.jpg" class="tiny"/>
    </div>
    * Tap the Checkmark when completed. Changes can be made later by editing the shortcut from the `Automation` tab.

Messages containing a certain message from a certain sender will be forwarded to Cashew to be parsed for transaction data. Now, we need to setup a configuration so Cashew understands how to parse the format for information such as the title or amount of a posted transaction message.

4) Add a new `Configuration` by tapping the (+) under `Configurations`
    * Give the configuration a name, such as "Bank"
    * Setup the default category, account, and/or title (optional)
    * <img src="assets/docs/automation/images/notif-scanning-configuration.png" class="tiny"/>

5) Setup message parsing for the configuration
    * You will need to wait for a message to be sent from the application you are trying to parse from.
    * Once a message is sent through the Shortcut, within the configuration press `Select Message`, select the message to setup the parser.
    * Select the "subject" of the selected message. All messages that contain that text will be parsed by this configuration. Tap `Next` when complete.
    * Then, select the "amount" of the transaction within the message. Tap `Next` when complete.
    * Then, select the "title" of the transaction within the message. This is optional, tap `Next` or `Skip` when complete.
    * <img src="assets/docs/automation/images/notif-scanning-parsing-selection.png" class="tiny"/>

Now when a message is sent via the shortcut automation, Cashew will save it in the background. When the application is opened, Cashew will parse the message to see if it matches the set configuration.


