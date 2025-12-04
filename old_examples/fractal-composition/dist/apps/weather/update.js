import { IO, httpTask, Either, Task } from "effects-vdom";
/** Fetch geolocation (city → lat/lon) */
const fetchGeocode = (city) => httpTask(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
/** Fetch weather using lat/lon */
const fetchForecast = (lat, lon) => httpTask(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
/** Main composed Task chain */
export const fetchWeather = (city, env, dispatch) => IO(() => {
    // Start async effect but don't return a promise
    (async () => {
        const geocodeTask = fetchGeocode(city)
            .run(env)
            .chain((geoData) => Task(async () => {
            // geoData is the raw data, not an Either
            const results = geoData.results;
            if (!results || results.length === 0)
                return Either.Left({ status: 404, message: "City not found" });
            const { latitude, longitude } = results[0];
            const forecastTask = fetchForecast(latitude, longitude).run(env);
            return await forecastTask.run();
        }));
        const either = await geocodeTask.run();
        if (Either.isRight(either)) {
            dispatch({ type: "FETCH_OK", data: either.right });
        }
        else {
            const err = either.left;
            dispatch({
                type: "FETCH_ERR",
                error: typeof err?.status === "number"
                    ? err
                    : { status: 0, message: err?.message ?? "Unknown error" },
            });
        }
    })();
});
/** Update */
export const update = (msg, m, dispatch) => {
    switch (msg.type) {
        case "SET_CITY":
            return { model: { ...m, city: msg.city }, effects: [] };
        case "FETCH": {
            const effect = fetchWeather(m.city, m.env, dispatch); // Reader->Task->IO
            return {
                model: { ...m, loading: true },
                effects: [effect],
            };
        }
        case "FETCH_OK":
            return { model: { ...m, loading: false, data: msg.data }, effects: [] };
        case "FETCH_ERR":
            return {
                model: { ...m, loading: false, data: { error: msg.error } },
                effects: [],
            };
        default:
            return { model: m, effects: [] };
    }
};
