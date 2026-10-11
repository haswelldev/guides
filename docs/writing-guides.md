# Writing guides

How to write a quest guide for this site. The reference is the Antharas guide,
[c5-gracia-final.mdx](../src/content/guides/antharas/c5-gracia-final.mdx). It covers the same quest as its
sources ([l2-servera.com](https://l2-servera.com/en/kategorii/quests/antharas/) and
[L2Hub quest 337](https://l2hub.info/quests/337-audience-with-the-land-dragon)) but has 18 stops instead of 26
and is meant to be followed during the run, not read the evening before.

The format (fields, components) is in the [README](../README.md). This file covers **what to write**.

## What we are making

A **run sheet**: the shortest correct order of stops, with exactly what to do at each one. It is not a
quest description.

The sources describe the quest the way the NPCs tell it. Our guide describes **the route**: where you go,
in what order, and what you do there. A player should be able to follow it with the game open, tick
boxes, and never scroll back to look for something.

## Comparison: the sources vs. our Antharas guide

| | Sources | Our guide |
|---|---|---|
| Order | The NPC dialogue order: get a task, fly out, kill, fly back, hand in. Repeated 4 times. | Geography: one farm loop around Aden, then all hand-ins on one trip. |
| Stops | 26 numbered steps. Gabrielle 3 times, every task NPC twice. | 18 stops. The 4 task NPCs once each, Moke and Helton once each. |
| Step text | Narration ("we fly to…, we talk to…, she asks us to…") with items mixed into the sentences. | Place, NPC and action on one line; items as chips; text only for what is not obvious. |
| Group play | Not covered, or "take some friends". | Every hunt says how many kills a party needs (`1 mob per person`, `1 pull = whole party`). |
| Mechanics | Spread across steps or only hinted ("quest monsters will appear"). | Exact: below **50% HP**, everyone must hit the jewel, the guards attack, these mobs drop nothing. |
| Travel | Mostly left to the player. | Every hunt ends with where to SoE; zones are ordered so the SoE lands next to the next stop; noblesse and no-noblesse options. |
| Extras | A screenshot and a wiki link for every name, item icons, lore. | None. One item table at the end, sources in the footer. |

How the 26 became 18:

1. **Farm before you are asked.** Tested on the server: once the quest is started, every item drops,
   even before the NPC asks for it. That removes the first visit to each of the 4 task NPCs.
2. **Order hunts by travel.** Forsaken Plains → Giant's Cave → Seal of Shilen → Forest of Mirrors. The
   last SoE lands in Hunters Village, where the hand-in trip starts.
3. **Kill first, then talk in the same town.** For the two jewels, the NPC is in the town you SoE to, so
   each jewel is one hunt stop and one talk stop.
4. **Merge hand-ins.** Gabrielle takes all 4 marks in one talk.

## Rules

### 1. Plan the route before you write

1. Read at least two sources and the quest log text from the game client.
2. Make the item table first: **item → mob → zone → NPC who takes it**. This is the raw material for the
   route.
3. Find what you can do early. Usually items can drop as soon as the quest is started. **Test it on a
   server** before you build the route on it, and say which server in `testedOn`.
4. Group hunts by hub town and order them so each SoE or port lands near the next stop.
5. Keep the order the game forces: a mob that only spawns after a talk stays after that talk.
6. Count the stops in the usual guide and put that in `summary.baseline`. If the route is not shorter
   than the usual one, it needs another reason to exist.

### 2. One stop = one place, one action

- A stop is a place where the player does something: **talk**, **hunt**, or **move** (travel that needs
  its own instruction).
- Two NPCs in the same town are two stops. Several mobs in the same zone are one stop.
- `where` is the place as the player sees it, with detail if it helps: "Ivory Tower, 4th floor",
  "Aden, Warrior Guild".
- `who` is the NPC's full in-game name, or the mobs to hunt, or a hint for how to get there
  ("from Gludin Village").
- Group stops into 3–6 phases. A phase title says what the leg does ("Get 4 marks"); the note says how it
  goes ("Hunters Village → Ivory Tower → Aden → Giran").

### 3. Items go in chips, not sentences

- `give` and `get` hold every item that changes hands at the stop. Include the count when it matters:
  `Portal Stone ×1`, `Mark of Watchman ×4`.
- Do not repeat in the text what the chips already say. A talk stop with nothing unusual has **no text
  at all** (see Orven, Moke, Helton).
- Every hunt has a `group` chip that says how drops scale for a party:
  - normal drop → `1 mob per person`
  - spawn mob → how many people one spawn covers (`3 people per spawn`, `1 pull = whole party`)
  - shared target → who has to do what (`all hit the jewel`).

### 4. Text says only what is not obvious

Write a sentence only if the player could get it wrong without it:

- **Which mob and where:** "Both mobs are in the first halls, you do not need to go deep."
- **The mechanic:** the HP threshold, who must hit, what spawns, what attacks, what drops nothing.
- **Where to go after:** end every hunt with the exit ("SoE to Aden."), unless the next stop is
  right there.
- **Traps:** "She is on the 4th floor, not on the entrance floor." "Do not run through the valley."
- **Why this order**, once, where it is not obvious: "Do this zone last: SoE from here brings you to
  Hunters Village."

Mistakes that **lose items or progress** (an NPC that takes your items, a dialogue answer that ends the
quest) go in the stop's `warn` field, not in `text`. It renders as a red "Danger" box. Use it rarely, so it
keeps its weight: at most one per stop, and only for things that cannot be undone.
The opposite case, the one action that must be done exactly right (the dialogue answer to pick), goes in
`do`, a green "Do" box. Pair them when both apply: `do` says what to pick, `warn` says what the other
choice costs.

Leave out: NPC dialogue, lore, the reward story, drop chances (unless they change the plan),
coordinates, screenshots, and wiki links for every name.

### 5. Plain, short English

Many readers are not native English speakers and read the guide while playing.

- Use "you" and the imperative: "Kill Blood Queens until…", not "we fly to…" or "the player should…".
- Short sentences and short paragraphs: about 2–4 sentences each, and usually no more than 3
  paragraphs per stop. Prefer common words: "kill" over "eliminate", "go" over "proceed".
- Use game terms players already know (SoE, DD, support, pull, spawn, port, noblesse). Do not explain them.
- **Bold** only what the eye should catch: the key mob, the threshold, the condition label. Not whole
  sentences.
- For choices, use the same pattern every time:
  "**With noblesse:** … **Without noblesse:** …".
- Write numbers as digits: 3 people, 50% HP, 4th floor.

### 6. Names are exact and consistent

- NPC, item and mob names are written as in the game client. Check them against the sources.
- Use the same name everywhere: in the stop, the chips and the item table. A short form is fine in chips
  once the full name has appeared ("3rd Fragment" after "3rd Fragment of Abyss Jewel").

### 7. The page around the route

Every guide has the same parts, in the same order. Do not add new kinds of sections without a reason.

- **Facts:** level, start NPC, reward, repeatable. The chronicle and "tested on" are added automatically.
- **Summary:** how this route differs from the usual one. Prefer 2–4 `points` (a 1–2 word label and one
  short line each) over a long paragraph; use `text` only for a single short sentence, as in Antharas. Talk about the route, not about the research: never "the sources disagree…" or "checked
  against the script". Source conflicts are resolved in the text, not reported.
- **Callouts:** at most 3. `info` for assumptions and party advice ("Tested on…", "Bring 3 people or
  more"). `warn` only for something that can kill the run.
- **Before you start:** only things that change the route (how many SoE, which ports). Not general
  advice ("bring potions").
- **Route**, then **item table**: every item you farm, where it drops, the zone, who takes it.
- **Sources:** the pages used to check names and steps, and the server the route was tested on.

### 8. Chronicles

- When the quest is different in another chronicle, write a **separate version file**. Do not mix
  chronicles in one text ("in Interlude, instead…").
- Start a new version by copying the closest one and editing it. Keep stop ids the same where the stop is
  the same.
- Only claim ranges you have checked. A gap ("no version yet") is better than a wrong guide.

## Checklist before publishing

- [ ] The route was tested on a server, or the unchecked parts are clearly marked.
- [ ] The stop count is lower than the usual guide's, and `summary.baseline` says by how much.
- [ ] Every hunt has a `group` chip and ends with where to go next.
- [ ] Every item you farm is in a `get` chip, a `give` chip and the item table.
- [ ] No stop repeats its chips in its text; talk stops with nothing unusual have no text.
- [ ] Names match the game client and are the same everywhere.
- [ ] Paragraphs are short; nothing is bold that does not need to be.
- [ ] `npm run build` passes.
