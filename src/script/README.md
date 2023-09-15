# Script Source Tree Code Organization Rules

## General

- Modules must **chage** some app data (DOM, storage, settings, etc.) in any way.
- Utils must **return** some data, nothing more.
- No importing of higher level code to lower level (modules to utils, utils to helpers, etc.)
- No importing of code from the same level (utils to utils, modules to modules, etc.) within a feature.
- No importing of code from one feature to another.
- All data that might change in the future (class names, links, etc.) and parameter values (time, size, etc.) are better stored as constants in a separate file.
- No helpers without utils.

## Tree

- Main - base and basic script features. Any optional and/or complicated stuff must be stored as a separate feature. Modules must be like Plug and Play: you import a module, call it once and everything "just works".

- Features - optional or complicated stuff. Each feature should have a Plug-and-Play-like module at root.

- Shared - code that is used by multiple script features.
