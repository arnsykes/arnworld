import { useState } from "react";
import useUX from "../context/UX";
import ThemeToggle from "./ThemeToggle";

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const { fx, setFx } = useUX();

  return (
    <>
      <button
        aria-label="settings"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[90] rounded-full shadow-lg bg-base-card border border-base-line p-3 hover:scale-105 transition"
        style={{ pointerEvents: "auto" }}
      >
        {/* ikon gear SVG (tanpa emoji) */}
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M19.14 12.94a7.49 7.49 0 0 0 .05-.94 7.49 7.49 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.63 7.63 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54a7.63 7.63 0 0 0-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.7 7.84a.5.5 0 0 0 .12.64l2.03 1.58c-.03.31-.05.63-.05.94s.02.63.05.94L2.82 13.5a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.32.62.23l2.39-.96c.5.38 1.05.7 1.63.94l.36 2.54c.05.24.26.42.5.42h3.84c.24 0 .45-.18.5-.42l.36-2.54c.58-.24 1.13-.56 1.63-.94l2.39.96c.23.09.49-.01.62-.23l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"/>
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-[90] w-64 rounded-xl bg-base-card/95 border border-base-line p-4 backdrop-blur">
          <div className="text-sm font-semibold mb-3">Quick Settings</div>

          <label className="text-xs block mb-1">FX Quality</label>
          <select
            value={fx}
            onChange={(e) => setFx(e.target.value as any)}
            className="w-full mb-3 rounded-lg border border-base-line bg-base-card px-2 py-1 text-xs"
          >
            <option value="low">FX Low</option>
            <option value="med">FX Med</option>
            <option value="high">FX High</option>
          </select>

          <div className="flex items-center justify-between">
            <span className="text-xs">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
