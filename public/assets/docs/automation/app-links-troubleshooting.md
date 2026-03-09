
## Troubleshooting
Ensure the app is installed on the target device. Follow the device specific troubleshooting below for more troubleshooting advice:

### Android

If you get redirected to the website instead of the Cashew app, your device may not be correctly set up to open App Links. Ensure Cashew can open its respective app link. On your Android device head to your device settings, 'Default apps', 'Opening links' and ensure Cashew has permission to open from the domain `cashewapp.web.app` under 'Supported web addresses'. This may be disabled by default if you did not install a Google Play signed copy of Cashew (i.e. downloaded from GitHub). This is because Cashew now uses App Links which need to be verified as per Android 12+ requirements with an app's signature public key. Alternatively, you can use a redirect application such as LinkSheet which can manage which apps open when certain links are activated.

### iOS

Links that use shorteners, tracking/redirect URLs, non-HTTPS, or a different subdomain/path than what's supported will typically open in the browser instead of the Cashew app. Some in-app browsers don't fully support App Links (Universal Links), so ensure the link is opened in Safari.

### Web App

If you clicked a Cashew app link from this documentation (or another source), it is most likely using the route link of the mobile app, not the web app. The endpoint for the web app is the address of the web app itself: `https://budget-track.web.app/[Endpoint here]`. In contrast, the mobile application processes app links with: `https://cashewapp.web.app/[Endpoint here]`.