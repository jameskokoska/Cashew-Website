This feature allows you to automatically create transactions from received external device notifications. All notification data is processed on device and will be parsed for transaction details.

## Configuration

1) Enable `Notification Scanning`
    * Grant Cashew the necessary permissions to read system level notifications
    
2) Add a new `Configuration` by tapping the (+) under `Configurations`
    * Give the configuration a name, such as "Bank"
    * Setup the default category, account, and/or title (optional)
    * <img src="/public/assets/docs/automation/images/notif-scanning-configuration.png" class="tiny"/>

3) Setup notification parsing for the configuration
    * Within the configuration, press `Select a Notification` to setup the parser and select a notification from the application you are trying to parse from 
    * Select the "subject" of the selected notification. All notifications that contain that text will be parsed by this configuration. Tap `Next` when complete.
    * Then, select the "amount" of the transaction within the notification. Tap `Next` when complete.
    * Then, select the "title" of the transaction within the notification. This is optional, tap `Next` or `Skip` when complete.
    * <img src="/public/assets/docs/automation/images/notif-scanning-parsing-selection.png" class="tiny"/>

Now when a notification is posted to your system, Cashew will save it in the background. When the application is opened, Cashew will parse the message to see if it matches the set configuration.

> [!NOTE]  
> Some system notifications are blocked by system level restrictions (usually on sensitive applications) and cannot be parsed by Cashew.

> [!IMPORTANT]  
> Occasionally the notification listener may be stopped by Android background/battery restrictions.
> To reduce this from happening: **Disable Battery Optimization** for this app (set battery usage to **Unrestricted / Don't optimize** in the system settings)


