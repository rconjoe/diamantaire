# darkside-data-react-query

- The data fetching framework is contained in its own internal library - right now `darkside/data/react-query`.
- In the future, with this setup, we can further abstract `darkside`'s fetching requirements away from `darkside` itself, since we can identify somewhat of an API for this:
  > "What are the requirements of an API that `darkside` can use to effectively fetch data, outside of the context of a particular implementation (e.g. react-query, swr)?"

A good abstraction around this allows for building internal libraries where we could swap out data-fetching clients interchangeably - think of this pattern as the **frontend complement to a database driver in a backend.**
