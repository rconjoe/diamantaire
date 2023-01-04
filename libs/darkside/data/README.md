# data in darkside

has 3 parts:

- `/api`: this code interfaces the `gateway` with:
- `/queries`. This folder contains all of the important stuff. Query keys and functions get paired together here with that `react-query-keys` library.
- `/hooks` contains hooks (lol) that simply do the `useQuery('blahblah...'...)` stuff that's done in components, but in a lot of places it'd probably be cleaner to make a hook for that, totally optional.
