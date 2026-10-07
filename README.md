# Between Us

A private truth-or-dare game for two. It's one static page (`index.html`) with no build step.

## How a round works

1. **Duel:** a quick mini-challenge (rock-paper-scissors, staring contest, a 20-second no-hands kiss…). Play it, then tap who lost, or let fate decide.
2. **Truth or Dare:** the loser picks one, and the winner reads it out.
3. **Hot Seat:** the loser answers one hot question from the winner.
4. Each player has 2 passes per game. In "Let it build" mode the heat rises as you play: Playful (rounds 1–2), Spicy (3–5), Hot (6–8), After Dark (9+). You can also pick a single heat level for the whole night.
5. **End:** whoever lost more rounds owes the other a final forfeit.

## Editing cards

All cards are in the `CARDS` object at the top of the `<script>` in `index.html`.
- `{winner}` and `{loser}` insert the players' names.
- A `|30` at the end of a card adds a 30-second timer.
- Starting a card with `her:` or `him:` means it only comes up when she or he is the loser. Each player is set to Her or Him on the start screen.
- Heat levels: `1` Playful, `2` Spicy, `3` Hot, `4` After Dark.

You can also add cards from the **✎ Cards** screen in the app. Those are saved only in that phone's browser.

## Deploy (GitHub + Vercel)

1. Create a **private** GitHub repo and push this folder.
2. Import it in Vercel. Framework preset: **Other**. No build command.
3. In Vercel → Project → Settings → Environment Variables, add `GAME_PASSWORD` with a password you both know.
4. Redeploy. When the site opens, the browser asks for a username and password. Type anything as the username and `GAME_PASSWORD` as the password.

Without `GAME_PASSWORD` the site shows "Locked" to everyone, so it never opens without a password.

On a phone, use **Share → Add to Home Screen** so it opens like an app.
