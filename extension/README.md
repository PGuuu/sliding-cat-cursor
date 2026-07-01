# Sliding Cat Cursor

A tiny Chrome extension inspired by the viral sliding cat moment:
https://x.com/maid_Pelori/status/2066760278558302679

The included cat artwork is an original illustrated asset made for this extension.

When your cursor moves downward, the cat appears near the cursor. When the
cursor moves upward, it fades out. If the cursor moves down-left, the cat is
mirrored so the slide direction still feels right.

## Install locally

1. Open `chrome://extensions`.
2. Turn on `Developer mode`.
3. Click `Load unpacked`.
4. Select this folder: `sliding-cat-extension`.

The popup lets you turn the effect on/off and adjust the cat height. The default
height is 150px.

After changing files, click the extension's reload button in `chrome://extensions`
and refresh any page you are testing. Content scripts only update after reload.

Use the popup's `Open demo page` button to verify mouse movement quickly.
If you open `test-page.html` as a local file instead, Chrome requires enabling
`Allow access to file URLs` for this extension.
