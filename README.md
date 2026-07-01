# Sliding Cat Cursor

![Sliding Cat Cursor demo](docs/assets/screenshot-demo-1280x800.png)

Sliding Cat Cursor is a tiny Chrome extension that shows an original illustrated
sliding cat near your cursor when you move the mouse downward. Move upward and
the cat fades away.

The cat artwork is original and packaged locally with the extension.

## Download

Download the latest unpacked-extension zip:

[sliding-cat-cursor-v1.1.3.zip](dist/sliding-cat-cursor-v1.1.3.zip)

## Install on Windows or Mac

1. Download `sliding-cat-cursor-v1.1.3.zip`.
2. Unzip it.
3. Open Chrome or Edge.
4. Go to `chrome://extensions` or `edge://extensions`.
5. Turn on `Developer mode`.
6. Click `Load unpacked`.
7. Select the unzipped extension folder.

The cat will appear on normal webpages when your cursor moves downward.

## Features

- Appears only when the cursor moves downward
- Fades when the cursor moves upward
- Mirrors direction when moving down-left
- Adjustable cat size
- Adjustable sensitivity
- Simple on/off switch
- No tracking or analytics

## Privacy

This extension does not collect, sell, transmit, or share user data.

It stores only local settings such as:

- enabled or disabled state
- cat height
- downward sensitivity

The content script listens only to pointer movement direction so it can show or
hide the local cat image. It does not inspect page text, forms, links, cookies,
account information, browsing history, or page content.

## Build Package

The Chrome extension source lives in `extension/`.

To make a package manually, zip the contents of `extension/`, not the folder
itself. The zip should contain `manifest.json` at the top level.

## License

MIT
