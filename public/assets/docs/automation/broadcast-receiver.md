This feature allows external apps (such as [Tasker (paid)](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm) or [Automate (free)](https://play.google.com/store/apps/details?id=com.llamalab.automate)) to send information, such as transaction details, to Cashew while the app is in the background. When Cashew is opened, it will be processed and transactions can be added from the sent information.

## Configuration

Send any valid <a href="./faq.html#app-links">App Link</a> data to the receiver class: `com.budget.tracker_app.UriReceiver`. When Cashew is opened, the data will be processed. See the <a href="./faq.html#app-links">App Link</a> automation documentation to see how to formulate app links that contain transaction information.

To use this feature with [Automate (free)](https://play.google.com/store/apps/details?id=com.llamalab.automate), see the example guide below:

1) Create a new Flow
2) Add a new action by pressing (+), and attach a `Broadcast send` block to the `Flow beginning` block
    * <img src="assets/docs/automation/images/automate-1.png" class="tiny"/>
3) Tap the `Broadcast send` block to edit it.
    * Tap `Pick Receiver` and select the `Cashew`:`com.budget.tracker_app.UriReceiver`. You can search for this by tapping the magnifying glass in the picker.
    * In the `Data URI` field, add an <a href="./faq.html#app-links">App Link</a> that you would like Cashew to parse, such as `https://cashewapp.web.app/addTransactionRoute?amount=123`. This will add a transaction with an amount of "123".
    * <img src="assets/docs/automation/images/automate-2.png" class="tiny"/>
4) To run the automation, tap the back arrow, and tap `Start`. This will send the data to Cashew without opening the application.
5) Open Cashew at any point in the future to see the sent data get processed by Cashew.

> [!TIP]
> When broadcasting a message, it is added to an internal queue. Cashew will only process the queued data when the app is opened.

> [!TIP]
> Automate and Tasker are powerful apps. You can add any automatic trigger, or automatically modify the parameter's data of the <a href="./faq.html#app-links">App Link</a> being sent to Cashew. It is up to you how you want to automate the process!