---
name: ui-review
description: Review React and Material UI interfaces for correctness, usability, accessibility and MVP-level simplicity.
---

# UI Review

## Objective

Review the frontend from both engineering and user experience perspectives.

The goal is to identify real problems.

Do not suggest changes merely because another implementation is possible.

## Review

Inspect:

### React

- Component responsibility
- State management
- Hooks
- Rendering
- Conditional rendering
- Unnecessary effects

### TypeScript

- `any`
- Unsafe assertions
- Missing types
- API contracts
- Incorrect event types

### Material UI

- Theme usage
- Spacing
- Typography
- Responsive layout
- Component consistency
- Accessibility

### Chat UX

Check:

- Message readability
- Input behavior
- Loading state
- Error state
- Empty state
- Source visibility
- Long responses
- Retry behavior

### Responsive

Check:

- Mobile
- Tablet
- Desktop
- Overflow
- Long messages
- Input layout
- Source layout

### Accessibility

Check:

- Keyboard navigation
- Labels
- Focus
- Semantic elements
- Icon labels
- Error messages

## MVP Perspective

Do not recommend:

- New architecture without a problem
- New libraries without necessity
- Global state without a requirement
- Design system abstractions
- Complex animations
- Premature optimization

## Output

Classify findings:

### Critical

Blocks functionality or creates serious accessibility problems.

### High

Major functional, UX or architectural issue.

### Medium

Meaningful maintainability or consistency problem.

### Low

Minor improvement.

For every finding provide:

- File
- Problem
- Impact
- Recommendation

Finish with:

APPROVED

APPROVED WITH COMMENTS

or

CHANGES REQUIRED