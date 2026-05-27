# Reddit Comment Delete

A local Chrome extension that automatically deletes your comments on old Reddit.

## Build

```bash
bun run build
```

### Options

| Flag | Default | Description |
|------|---------|-------------|
| `--min-karma=<n>` | `10` | Only delete comments with karma below this threshold |

**Example:**
```bash
bun run build --min-karma=5
```

## Load the extension

The extension is not published to any store — it must be loaded manually as an unpacked extension.

### Chrome / Chromium
1. Go to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `dist/` folder inside this project

### Brave
1. Go to `brave://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist/` folder

### Microsoft Edge
1. Go to `edge://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist/` folder

### Opera
1. Go to `opera://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist/` folder

After any code change, run `bun run build` again and click the **refresh icon** on the extension card.

## Usage

1. Sign in to Reddit
2. Navigate to your comments page:
   ```
   https://old.reddit.com/user/<your-username>/comments/
   ```
3. The extension runs automatically — it will delete qualifying comments and advance through pages until done

### IMPORTANT ‼️

**Leave the page open** while it runs. Deletions are intentionally throttled to one every 500ms to avoid Reddit rate-limiting your IP, so a page with many comments will take a while to complete
