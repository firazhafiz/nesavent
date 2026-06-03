import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const CARD_WIDTH = SCREEN_WIDTH * 0.75;
export const CARD_HEIGHT = CARD_WIDTH * (5 / 4);
export const BANNER_WIDTH = SCREEN_WIDTH * 0.82;
export const SEARCH_BAR_H = 48;
export const SEARCH_OVERLAP = SEARCH_BAR_H / 2;

export { SCREEN_WIDTH };
