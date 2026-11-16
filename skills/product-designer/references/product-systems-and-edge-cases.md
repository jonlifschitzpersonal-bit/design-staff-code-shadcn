# Product Systems and Edge Cases

Use when the experience depends on system behavior, permissions, async work,
large data, or collaborative state.

## Async Work

Model explicit states:
1. request created
2. accepted
3. queued / processing
4. partial result if useful
5. completed
6. failed
7. retry / recovery
8. canceled if supported

Never label "Done" at step 2.

## Optimistic UI

Good when:
- failure is rare
- action is reversible
- local prediction is safe

Risky when:
- money moves
- permission changes
- external side effects occur
- action is destructive
- conflicts are common

## Eventual Consistency

Tell users enough to maintain trust:
- "Changes may take a few seconds to appear"
- freshness / sync state where relevant
- retry / refresh behavior
- conflict handling

Avoid stale UI that silently contradicts the server.

## Large Data

Consider:
- empty
- 1 item
- hundreds
- tens of thousands+
- pagination
- virtualization
- bulk selection
- filter persistence
- export
- search indexing delay
- loading partial pages
- stable sorting
- count accuracy

## Collaboration / Concurrency

Consider:
- simultaneous edit
- stale version
- deleted by another user
- role changed mid-session
- ownership transfer
- merge / conflict behavior
- presence
- draft vs published state

## Permission Matrix

Example:

| Role | View | Edit | Delete | Invite | Transfer |
|---|---:|---:|---:|---:|---:|
| Owner | ✓ | ✓ | ✓ | ✓ | ✓ |
| Admin | ✓ | ✓ | ✓ | ✓ | — |
| Member | ✓ | scoped | — | — | — |
| Viewer | ✓ | — | — | — | — |

Do not hide every unavailable action by default. Sometimes disabled +
explanation improves discoverability; sometimes hiding prevents noise.
Choose by role expectation and security needs.

## Cross-Device State

Consider:
- draft continuity
- notification opened on another device
- session expiry
- upload in background
- state changed elsewhere
- offline changes and merge

## Migration / Legacy

Existing users may have:
- missing required new fields
- grandfathered permissions
- deprecated plans
- old data models
- partial migrations

Design explicit migration states rather than assuming all accounts are new.

## AI Product States

If the product includes generative AI, design:
- thinking / processing
- partial streaming
- cancel / stop
- regenerate
- edit / override
- source / confidence where appropriate
- unsafe / unsupported request
- model failure
- rate limit
- stale context
- user control over applied changes

Do not imply certainty the system does not have.
