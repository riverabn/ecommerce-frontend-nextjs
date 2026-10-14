"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(`[Web Vitals] ${metric.name}:`, Math.round(metric.value));
  });
  return null;
}