---
name: material-ui
description: Build consistent responsive interfaces using Material UI for the documentation chatbot MVP.
---

# Material UI Skill

## Objective

Create a clean and consistent UI using Material UI without creating a custom design system.

## Before Creating UI

Inspect:

- Existing theme
- Existing components
- Existing spacing conventions
- Existing typography
- Existing responsive patterns

Reuse existing patterns.

## Components

Prefer MUI components.

Common components:

- Box
- Stack
- Container
- Paper
- Typography
- TextField
- Button
- IconButton
- Alert
- CircularProgress
- Divider
- Card

## Chat Interface

The chat should prioritize readability.

Recommended structure:

ChatPage
├── Header
├── MessageList
│   └── ChatMessage
├── LoadingIndicator
└── ChatInput

## Message

A message should clearly communicate:

- Author
- Content
- Optional sources
- Optional timestamp if required

Do not add unnecessary metadata.

## Styling

Use:

sx

for local styling.

Use the theme for global design decisions.

Avoid creating CSS files unless there is a concrete reason.

## Responsive

Always consider:

- Mobile
- Tablet
- Desktop

The chat input should remain usable on small screens.

Long assistant responses must not cause horizontal overflow.

## Accessibility

Ensure:

- Inputs have labels
- Buttons have accessible names
- Keyboard navigation works
- Focus behavior is predictable
- Errors are understandable

## Visual Complexity

Avoid unnecessary:

- Animations
- Gradients
- Decorative elements
- Complex layouts

The interface is a documentation tool, not a marketing website.