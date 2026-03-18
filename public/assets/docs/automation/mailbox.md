
> [!NOTE]  
> The `Mailbox` feature must be enabled in `Experimental Features` in the Settings of Cashew.

## Inbox

Quickly access transaction entries from any Google Sheet. As transactions are added to the Google Sheet, they will show up in the `Inbox` within the application. Open the `Inbox` and select a transaction to quickly add it to your transactions list.

To setup the inbox:

1) Create a Google Sheet using the [Google Sheet Mailbox Template](https://docs.google.com/spreadsheets/d/1Eiib2fiaC8SNdau8T8TBQql-wyWXVYOLJY-7Ycuky4I/copy?usp=sharing).
2) Set the sharing permissions to `anyone with the link can view`, 
3) Copy the shared link into Cashew. 

<img src="assets/docs/automation/images/mailbox-inbox.png" class="tiny"/>

Now you can open the Inbox to see the transactions parsed from the external Google Sheet. Tap a transaction to quickly add it to your transactions list. You can also add a `Home Page Inbox Shortcut` to quickly access the inbox from the Cashew home page, in the home page header.

## Outbox

Automatically export transaction data to a CSV file stored in your Google Drive. On each app launch or when a manual sync is performed with your authenticated Google account, the system exports up to the most recent 1,000 transactions to a CSV file. This is useful if you want to periodically parse transaction data within Cashew without manually exporting the data.

This feature addresses a <a href="https://cashewapp.web.app/faq.html#access-drive-data">limitation of Google Drive's app-specific storage</a> (which Cashew uses to store cloud backups and sync data), which is sandboxed and doesn't allow users to access Cashew backup data. So as an alternative, the outbox feature creates a CSV file to a Cashew folder in the user-visible root of Google Drive, ensuring the exported data can be directly accessed by a user.

To setup the Outbox:
0) Ensure you are signed in to your Google (Drive) account in Cashew
1) Enable the `Outbox` feature in the `Mailbox` settings 
    * Allow Cashew to write files to your Google Drive
2) Restart the app to trigger an outbox creation when the app is launched (or perform a manual sync)

<img src="assets/docs/automation/images/mailbox-outbox.png" class="tiny"/>

The exported CSV of transactions will be available in the Cashew folder in your Google Drive and will be periodically updated. 

> [!NOTE]  
> The exported outbox CSV file gets overwritten on your Google Drive every update