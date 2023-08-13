// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Temporal } from "esm/@js-temporal/polyfill@0.4.4";

export function formatMonthId(string: string): string {
  const match = string.match(/(\d{4})(\d{2})/);
  if (!match) {
    return "unknown month";
  }
  const [_, year, month] = match;
  const ym = Temporal.PlainYearMonth.from({ year: +year, month: +month });
  return ym.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    calendar: "iso8601",
  });
}
