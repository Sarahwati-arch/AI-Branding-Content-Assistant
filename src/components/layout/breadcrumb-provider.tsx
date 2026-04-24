"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type BreadcrumbOverrides = Record<string, string>;

const BreadcrumbContext = createContext<{
  overrides: BreadcrumbOverrides;
  setOverride: (segment: string, label: string) => void;
}>({
  overrides: {},
  setOverride: () => {},
});

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<BreadcrumbOverrides>({});

  const setOverride = useCallback((segment: string, label: string) => {
    setOverrides((prev) => ({ ...prev, [segment]: label }));
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ overrides, setOverride }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}
