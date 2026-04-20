import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState } from "react";

export default function CustomCalendar({ events = [], onDateClick }) {
  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");

  // ✅ Safe event normalization
  const normalizedEvents = events
    .filter((e) => e && (e.date || e.start))
    .map((e) => ({
      title: e.name || "Event",
      start: e.date || e.start,
      extendedProps: {
        name: e.name,
        time: e.time,
        venue: e.venue,
        desc: e.desc,
      },
    }));

  // ✅ Safe date formatter
  const normalizeDate = (date) => {
    if (!date) return null;

    const d = new Date(date);

    if (isNaN(d.getTime())) return null;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getEventsCount = (date) => {
    const target = normalizeDate(date);
    return normalizedEvents.filter((e) => normalizeDate(e.start) === target).length;
  };

  // ✅ Safe event lookup
  const getEventsForDate = (date) => {
    const target = normalizeDate(date);

    return normalizedEvents.filter((e) => {
      const eventDate = normalizeDate(e.start);
      return eventDate === target;
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3 px-2">
        <button
          onClick={() => calendarRef.current?.getApi().prev()}
          className="text-4xl font-bold text-gray-600 hover:text-black"
        >
          ‹
        </button>

        <h2 className="text-lg font-semibold text-gray-700">
          {title}
        </h2>

        <button
          onClick={() => calendarRef.current?.getApi().next()}
          className="text-4xl font-bold text-gray-600 hover:text-black"
        >
          ›
        </button>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        height={380}
        aspectRatio={2.2}
        events={normalizedEvents}
        dayHeaderFormat={{
          weekday: "short",
        }}
        dayHeaderContent={(args) => args.text[0]}

        // update title
        datesSet={(info) => setTitle(info.view.title)}

        // ✅ highlight event days
        dayCellClassNames={(arg) => {
          const hasEvent = getEventsForDate(arg.date).length > 0;
          return hasEvent ? "event-day" : "";
        }}

        dayCellContent={(arg) => {
          const count = getEventsCount(arg.date);

          return (
            <div className="flex flex-col items-center justify-start w-full h-full pt-1">
              {/* Date number */}
              <div className="text-center w-full">
                {arg.dayNumberText}
              </div>

              {/* DOTS */}
              {count > 0 && (
                <div className="flex gap-[2px] mt-[2px]">
                  {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                    <span
                      key={i}
                      className="w-[4px] h-[4px] rounded-full bg-gray-500"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        }}





        // ✅ click only event days
        dateClick={(info) => {
          const events = getEventsForDate(info.date);

          if (!events.length) return;

          onDateClick?.(events, info.dateStr);
        }}
      />

      {/* STYLES */}
      <style>{`
        .fc {
          font-family: inherit;
          color: #444;
        }

        .fc-daygrid-event,
        .fc-daygrid-day-events,
        .fc-daygrid-day-bottom {
          display: none !important;
        }

        .fc,
        .fc-scrollgrid,
        .fc-theme-standard td,
        .fc-theme-standard th {
          border: none !important;
        }

        .fc .fc-daygrid-day-frame {
          min-height: 30px !important;
          padding: 0px !important;
          position: relative;
        }

        .fc .fc-daygrid-day-top {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 4px;
        }

        .fc .fc-daygrid-day-number {
          width: 100%;
          text-align: center;
        }

        .event-day {
          position: relative;
        }

        /* Grey dot under date */
        // .event-day .fc-daygrid-day-frame::after {
        //   content: "";
        //   width: 4px;
        //   height: 4px;
        //   background: green;
        //   border-radius: 50%;
        //   position: absolute;
        //   top: 35px; /* 👈 key fix (just below date number) */
        //   left: 50%;
        //   transform: translateX(-50%);
        // }

        .event-day:hover {
          background: rgba(46, 125, 50, 0.05);
          cursor: pointer;
        }

        .fc-day-today {
          background: transparent !important;
        }

        .fc-day-today .fc-daygrid-day-number {
          color: #111 !important;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}