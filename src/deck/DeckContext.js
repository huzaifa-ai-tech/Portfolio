import { createContext, useContext } from "react";

export const DeckContext = createContext({
  goTo: () => {},
  index: 0,
  count: 0,
  ready: true,
});

export function useDeck() {
  return useContext(DeckContext);
}
