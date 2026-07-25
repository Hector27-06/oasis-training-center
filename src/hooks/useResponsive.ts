import { useWindowDimensions } from "react-native";

import {
  MOBILE_BREAKPOINT,
  RESPONSIVE_LAYOUT,
  TABLET_BREAKPOINT,
} from "@/src/constants/responsive";

export default function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < MOBILE_BREAKPOINT;
  const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
  const isDesktop = width >= TABLET_BREAKPOINT;
  const compact = isMobile;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    layout: {
      pagePadding: compact
        ? RESPONSIVE_LAYOUT.pagePadding.compact
        : RESPONSIVE_LAYOUT.pagePadding.regular,
      cardPadding: compact
        ? RESPONSIVE_LAYOUT.cardPadding.compact
        : RESPONSIVE_LAYOUT.cardPadding.regular,
      sectionGap: compact
        ? RESPONSIVE_LAYOUT.sectionGap.compact
        : RESPONSIVE_LAYOUT.sectionGap.regular,
      contentMaxWidth: RESPONSIVE_LAYOUT.contentMaxWidth,
    },
  };
}
