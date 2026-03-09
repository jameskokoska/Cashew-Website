
> [!NOTE]  
> The `Mailbox` feature must be enabled in `Experimental Features` in the Settings.

## Inbox

Quickly access transaction entries from any Google Sheet. As transactions are added to the Google Sheet, they will show up in the `Inbox` within the application. Open the `Inbox` and select a transaction to quickly add it to your transactions list.

To setup the inbox:

1) Create a Google Sheet using the [Google Sheet Mailbox Template](https://docs.google.com/spreadsheets/d/1Eiib2fiaC8SNdau8T8TBQql-wyWXVYOLJY-7Ycuky4I/copy?usp=sharing).
2) Set the sharing permissions to `anyone with the link can view`, 
3) Copy the shared link into Cashew. 

<img src="/public/assets/docs/automation/images/mailbox-inbox.png" class="tiny"/>

Now you can open the Inbox to see the transactions parsed from the external Google Sheet. Tap a transaction to quickly add it to your transactions list. You can also add a `Home Page Inbox Shortcut` to quickly access the inbox from the Cashew home page, in the home page header.

## Outbox

Periodically export transactions to a CSV on your Google Drive. The most recent 1000 transactions will be exported. This is useful if you want to periodically parse the transactions added to Cashew without manually exporting the data.

To setup the Outbox:
1) Enable the `Outbox` feature in the `Mailbox` settings 
    * Allow Cashew to write files to your Google Drive
2) Restart the app to trigger an outbox creation when the app is launched.

<img src="/public/assets/docs/automation/images/mailbox-outbox.png" class="tiny"/>

The exported CSV of transactions will be available in the Cashew folder in your Google Drive and will be periodically updated. 

> [!NOTE]  
> The exported outbox CSV file gets overwritten on your Google Drive every update