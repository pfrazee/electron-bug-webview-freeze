# electron-bug-webview-freeze

```bash
# Clone this repository
git clone https://github.com/pfrazee/electron-bug-webview-freeze
# Go into the repository
cd electron-bug-webview-freeze
# Install dependencies
npm install
# Run the app
npm start
```

The renderer has a webview embedded with a red border. It is viewing a custom stream-protocol resource (`custom://foo/index.html`).

Once a second, the webview is refreshed. A text-line will inform you of the last refresh time.

Eventually, the renderer process will freeze. It's not always consistent in the amount of time, so you may need to leave it running for a while.

Cheers ~prf