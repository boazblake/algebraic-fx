import { div, h1, button, p, input } from "../../utils/renderer";
export const view = (m, dispatch) => {
    const weather = m.data?.current_weather;
    const error = m.data?.error;
    return div({
        className: "flex flex-col space-y-4 p-4 bg-white shadow rounded-lg max-w-sm w-full mx-auto transition",
    }, [
        h1({ className: "text-xl font-semibold text-emerald-600" }, "Weather"),
        div({ className: "flex space-x-2" }, [
            input({
                className: "flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none",
                value: m.city,
                placeholder: "Enter city...",
                oninput: (e) => dispatch({ type: "SET_CITY", city: e.target.value }),
            }),
            button({
                className: "bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow transition",
                onclick: () => dispatch({ type: "FETCH" }),
            }, m.loading ? "Loading..." : "Get Weather"),
        ]),
        m.loading
            ? p({ className: "text-gray-500 text-sm" }, "Loading weather...")
            : error
                ? p({ className: "text-red-500 text-sm" }, error.message || "Error")
                : weather
                    ? div({ className: "space-y-2 text-sm text-gray-700" }, [
                        div({ className: "flex justify-between" }, [
                            p({}, `🌡 Temperature:`),
                            p({ className: "font-semibold" }, `${weather.temperature} °C`),
                        ]),
                        div({ className: "flex justify-between" }, [
                            p({}, `💨 Wind Speed:`),
                            p({ className: "font-semibold" }, `${weather.windspeed} km/h`),
                        ]),
                        div({ className: "flex justify-between" }, [
                            p({}, `🧭 Direction:`),
                            p({ className: "font-semibold" }, `${weather.winddirection}°`),
                        ]),
                        div({ className: "flex justify-between" }, [
                            p({}, `⏰ Time:`),
                            p({ className: "font-semibold" }, weather.time),
                        ]),
                    ])
                    : p({ className: "text-gray-400 text-sm italic" }, "Enter a city and click Get Weather."),
    ]);
};
