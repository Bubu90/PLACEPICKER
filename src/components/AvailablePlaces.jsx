import Places from "./Places.jsx";
import ErrorBox from "./ErrorBox.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.jsx";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}
export default function AvailablePlaces({ onSelectPlace }) {
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState();

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchAvailablePlaces, []);

  if (error) {
    return (
      <ErrorBox
        title="An error occurred!"
        message={error.message}
        // onConfirm={() => setError(null)}
      />
    );
  }

  return (
    <>
      <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText="No places available."
        loadingText="Loading..."
        isLoading={isFetching}
        onSelectPlace={onSelectPlace}
      />
    </>
  );
}
