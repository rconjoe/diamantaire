#### _While we are rebuilding things I don't see a point in fussing too much over a wiki/docs structure in this repo. So for now,_

I will be following these simple guidelines:

1. Using [typedoc](https://typedoc.org/) **is the bare minimum.** There should never be a situation where an undocumented function, class, or interface is pushed to git.
   We generate static documentation from these comments, so if they are missing, documentation will be incomplete.
   Eventually we should incorporate some light typedoc-related linting into the repo hooks to prevent missed docs from slipping through.

2. If additional docs are required, append to the `README.md` in any library or project's root folder.

3. Any time something that we want documented extends beyond the scope of typedoc, use the project/library's `README.md`.

---

### Architecture Decision Records (ADR)

The `docs/decisions` directory contains [MADR](https://adr.github.io/madr/) that should be completed whenever an architectural decision is made.

The purpose of ADR is to keep track of _what_ is being built, and _why_ it's being built this way, and less about the technical details of _how_ something was implemented.

The only hard formatting requirement we need for it is to increment by 1 the previous report's number and put it at the top of the page.
Directly below that, put the date on which this decision was made.

So every ADR should start with something like:

```
14
12/20/2022

...and so on
```

You can read more about ADR [here](https://adr.github.io/madr/), and see some finished in `decisions/`.
