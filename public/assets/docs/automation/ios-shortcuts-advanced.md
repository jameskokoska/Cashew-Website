
## Advanced Siri Shortcuts
In addition to the "Add Transaction" shortcut, several other shortcuts are available. The sections below provide a brief overview of each option.

### Queue App Link URL
The "Queue App Link URL" shortcut queues an app link for processing the next time Cashew is opened. App links can be used to trigger automated actions in Cashew, including creating transactions automatically.

Compared to the "Add Transaction" shortcut, the `Add Transaction` app link endpoint provides greater flexibility, including support for additional parameters and more control over transaction fields and behavior. It requires slightly more setup, but offers more advanced customization. For a full list of supported parameters and all app links, refer to the <a href="./faq.html#app-links">App Link</a> automation documentation.

Unlike directly tapping an app link, which opens Cashew immediately, this shortcut stores the app link and delays processing until the app is opened later. Any app link can be sent to Cashew in the background through this shortcut.