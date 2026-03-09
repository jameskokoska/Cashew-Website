iOS 17 introduced Transaction Triggers in the Shortcuts app. This allows automatic execution of shortcuts following an Apple Pay transaction. Cashew can use this functionality to automatically add transactions.

## Configuration

1) Create a transaction automation
    * Open the Shortcuts app → `Automation` Tab → Tap (+) → `Wallet`
    * Select the cards and categories to monitor, all can be selected
    * Check `Run Immediately` to bypass manual confirmation
    * <div class="img-scroll-container">
        <img src="assets/docs/automation/images/siri-shortcuts-1.png" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-2.png" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-3.png" class="tiny"/>
    </div>
   
2) Create the shortcut
    * Choose `Create New Shortcut` and add the Cashew `Add Transaction` action
    * <div class="img-scroll-container">
        <img src="assets/docs/automation/images/siri-shortcuts-4.png" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-5.png" class="tiny"/>
    </div>

3) Configure the shortcut input
    * Set `Amount` to `Shortcut Input` → `Amount`. To do this, tap the Amount text input field → `Select Variable` → Scroll up and tap `Shortcut Input`. Then tap the `Shortcut Input` in the Amount text input field → Select `Amount`. 
    * Set `Title` to `Shortcut Input` → `Merchant`. To do this, tap the Title text input field → `Select Variable` → Scroll up and tap `Shortcut Input`. Then tap the `Shortcut Input` in the Amount text input field → Select `Merchant`.
    * Configure all other fields as you wish
    * <div class="img-scroll-container">
        <img src="assets/docs/automation/images/siri-shortcuts-6.png" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-7.png" class="tiny"/>
        <img src="assets/docs/automation/images/siri-shortcuts-8.png" class="tiny"/>
    </div>
    * Tap the Checkmark when completed. Changes can be made later by editing the shortcut from the `Automation` tab.

Now, all Apple Pay transactions matching the selected cards/categories will be automatically added to Cashew.

You can also use the `Add Transaction` action for any other shortcut.

Note that transaction polarity (income/expense) is determined by the set category. If a category is not set, you will be prompted by Cashew when the app is opened, since all transactions require a category.

> [!TIP]
> Enable `Edit Before Adding` in the `Add Transaction` action to modify or add any transaction details incoming from the executed shortcut before the transaction is added to your transaction list.

> [!NOTE]
> In some cases the shortcut may fail to execute while the device is locked. To ensure reliable execution, unlock the iPhone before completing an Apple Pay transaction.

> [!NOTE]
> The transaction shortcut is limited to Apple Pay purchases made on iPhone at physical payment terminals. Transactions made via Apple Watch or online (e.g., in a browser) do not activate the automation. This is an iOS limitation.

> [!IMPORTANT]
> The transaction shortcut may occasionally time out, causing the shortcut to fail. This is an iOS limitation. The issue is likely related to card providers, as transactions are not always delivered to the Apple Wallet app immediately. While the Wallet app can processes delayed transactions eventually, the automation trigger does not handle delayed transactions in the same way, resulting in timeouts. This issue is discussed here: https://developer.apple.com/forums/thread/765516