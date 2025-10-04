import React, { useEffect, useRef, useState } from "react";

interface DatePickerProps {
  label?: string;
  value: string; // ISO YYYY-MM-DD or empty string
  onChange: (value: string) => void;
  placeholder?: string;
}

/* ------ Icons ------ */
const IconCalendar = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
  </svg>
);

const IconChevron = ({
  dir = "left",
  className = "w-3.5 h-3.5",
}: {
  dir?: "left" | "right";
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {dir === "left" ? (
      <polyline points="15 18 9 12 15 6" />
    ) : (
      <polyline points="9 18 15 12 9 6" />
    )}
  </svg>
);

/* ------ Helpers ------ */
const formatDisplay = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

const buildCalendarGrid = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  const last = endOfMonth(first);
  const startDay = first.getDay();
  const days: { date: Date; inMonth: boolean }[] = [];

  for (let i = startDay - 1; i >= 0; i--)
    days.push({ date: new Date(year, month, -i), inMonth: false });
  for (let d = 1; d <= last.getDate(); d++)
    days.push({ date: new Date(year, month, d), inMonth: true });
  while (days.length % 7 !== 0) {
    const next = new Date(
      year,
      month + 1,
      days.length - last.getDate() - startDay + 1
    );
    days.push({ date: next, inMonth: false });
  }
  return days;
};

const weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = Array.from({ length: 12 }, (_, i) =>
  new Date(2000, i, 1).toLocaleString(undefined, { month: "short" })
);

/* ------ Component ------ */
const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select date",
}) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() =>
    value ? new Date(value + "T00:00:00") : new Date()
  );
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value) setViewDate(new Date(value + "T00:00:00"));
  }, [value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
        setMonthPickerOpen(false);
        setYearPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selected = value ? new Date(value + "T00:00:00") : null;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const grid = buildCalendarGrid(year, month);

  const yearRange = Array.from({ length: 11 }, (_, i) => year - 5 + i);

  const pickMonth = (m: number) => {
    setViewDate((d) => new Date(d.getFullYear(), m, 1));
    setMonthPickerOpen(false);
  };

  const pickYear = (y: number) => {
    setViewDate((d) => new Date(y, d.getMonth(), 1));
    setYearPickerOpen(false);
  };

  return (
    <div className="relative inline-block w-full" ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="text-sm text-gray-700">
          {selected ? (
            formatDisplay(value)
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <IconCalendar className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-[270px] rounded-xl bg-white shadow-lg ring-1 ring-gray-200 p-2 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <div className="flex items-center gap-1">
              {/* Prev month */}
              <button
                onClick={() =>
                  setViewDate(
                    (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)
                  )
                }
                className="p-1 hover:bg-gray-100 rounded-md text-gray-600"
                aria-label="Previous month"
              >
                <IconChevron dir="left" />
              </button>

              <div className="flex items-center gap-1 relative">
                {/* Month Button */}
                <button
                  onClick={() => {
                    setMonthPickerOpen((m) => !m);
                    setYearPickerOpen(false);
                  }}
                  className="px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded"
                >
                  {monthNames[month]}
                </button>

                {/* Year Button */}
                <button
                  onClick={() => {
                    setYearPickerOpen((y) => !y);
                    setMonthPickerOpen(false);
                  }}
                  className="px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded"
                >
                  {year}
                </button>

                {/* Month Picker */}
                {monthPickerOpen && (
                  <div
                    className="absolute left-1/2 top-full z-[60] mt-2 w-[200px] -translate-x-1/2 
                               rounded-lg bg-white/95 backdrop-blur-sm border border-gray-100 
                               shadow-xl ring-1 ring-gray-200 p-2 grid grid-cols-3 gap-1 animate-fade-in"
                  >
                    {monthNames.map((mn, i) => (
                      <button
                        key={mn}
                        onClick={() => pickMonth(i)}
                        className={`text-sm py-1.5 px-2 rounded text-center transition-all
                                    ${
                                      i === month
                                        ? "bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-200"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                      >
                        {mn}
                      </button>
                    ))}
                  </div>
                )}

                {/* Year Picker */}
                {yearPickerOpen && (
                  <div
                    className="absolute left-1/2 top-full z-[60] mt-2 w-[160px] -translate-x-1/2 
                               rounded-lg bg-white/95 backdrop-blur-sm border border-gray-100 
                               shadow-xl ring-1 ring-gray-200 p-2 animate-fade-in"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={() =>
                          setViewDate(
                            (d) =>
                              new Date(d.getFullYear() - 1, d.getMonth(), 1)
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                      >
                        <IconChevron dir="left" />
                      </button>
                      <div className="text-sm font-semibold text-gray-800">
                        {year}
                      </div>
                      <button
                        onClick={() =>
                          setViewDate(
                            (d) =>
                              new Date(d.getFullYear() + 1, d.getMonth(), 1)
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                      >
                        <IconChevron dir="right" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      {yearRange.map((y) => (
                        <button
                          key={y}
                          onClick={() => pickYear(y)}
                          className={`text-sm py-1 px-2 rounded text-center transition-all
                                      ${
                                        y === year
                                          ? "bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-200"
                                          : "text-gray-700 hover:bg-gray-100"
                                      }`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setViewDate(new Date())}
              className="text-xs px-2 py-1 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700"
            >
              Today
            </button>

            {/* Next month */}
            <button
              onClick={() =>
                setViewDate(
                  (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)
                )
              }
              className="p-1 hover:bg-gray-100 rounded-md text-gray-600"
              aria-label="Next month"
            >
              <IconChevron dir="right" />
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-1 px-1">
            {weeks.map((w) => (
              <div key={w} className="text-center">
                {w}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 px-1">
            {grid.map(({ date: d, inMonth }, i) => {
              const iso = toISO(d);
              const isSelected = selected && iso === toISO(selected);
              return (
                <button
                  key={i}
                  onClick={() => {
                    onChange(toISO(d));
                    setOpen(false);
                  }}
                  disabled={!inMonth}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-xs transition
                    ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }
                    ${!inMonth ? "opacity-40 cursor-default" : ""}`}
                  aria-pressed={isSelected}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
