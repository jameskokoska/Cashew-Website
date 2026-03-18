> [!NOTE]  
> The `Notification Scanning` feature must be enabled in `Experimental Features` in the Settings of Cashew.

This feature allows you to automatically create transactions from received external device notifications. Most notifications from other apps (such as banking apps) all follow a similar format, with only certain pieces of information changing per posted transaction. You need to setup a configuration so Cashew understands how to parse the format for information such as the title or amount of a posted transaction. All notification data is processed on device and is an optional service.

## Configuration

1) Enable `Notification Scanning`
    * When enabled, follow your system settings and grant Cashew the necessary permissions to read your phone's posted notifications
    
2) Add a new `Configuration` by tapping the (+) under `Configurations`
    * Give the configuration a name, such as "Bank"
    * Setup the default category, account, and/or title (optional)
    * <img src="assets/docs/automation/images/notif-scanning-configuration.png" class="tiny"/>

3) Setup notification parsing for the configuration
    * You will need to wait for a notification to be posted from the application you are trying to parse from.
    * Once a notification is posted, within the configuration press `Select a Notification`, select the notification to setup the parser.
    * Select the "subject" of the selected notification. All notifications that contain that text will be parsed by this configuration. Tap `Next` when complete.
    * Then, select the "amount" of the transaction within the notification. Tap `Next` when complete.
    * Then, select the "title" of the transaction within the notification. This is optional, tap `Next` or `Skip` when complete.
    * <img src="assets/docs/automation/images/notif-scanning-parsing-selection.png" class="tiny"/>

Now when a notification is posted to your system, Cashew will save it in the background. When the application is opened, Cashew will parse the message to see if it matches the set configuration.

> [!NOTE]  
> Some system notifications are blocked by system level restrictions (usually on sensitive applications) and cannot be parsed by Cashew.

> [!IMPORTANT]  
> Occasionally the notification listener may be stopped by Android background/battery restrictions.
> To reduce this from happening: **Disable Battery Optimization** for this app (set battery usage to **Unrestricted / Don't optimize** in the system settings)


