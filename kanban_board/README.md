# Kanban Board

How to build the board

- Build UI
- Work with localStorage
	- localStorage can be called directly
	- localStorage is with json format, thus JSON.parse(localStorage.key) needs to be use to extract data out from localStorage with its key
	- localStorage.setItem(key, JSON.stringify(value)) can be use to save data to localStorage.
-Process when moving item or add item: Update DOM and localStorage
  - DOM is generally updated first
	- Then localStorage is updated from DOM