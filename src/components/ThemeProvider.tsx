// "use client";

// import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// export function ThemeProvider({ children, ...props }: any) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }




"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // পেজ লোড হওয়া পর্যন্ত অপেক্ষা করবে
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // যতক্ষণ মাউন্ট না হচ্ছে ততক্ষণ সাধারণ চিলড্রেন দেখাবে, কোনো স্ক্রিপ্ট রান করবে না
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}