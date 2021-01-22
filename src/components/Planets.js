import { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  const data = await res.json();
  return data;
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['planets', page],
    fetchPlanets
  );

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && <div>Loading Data</div>}

      {status === 'error' && <div>Error Fetching Data</div>}

      {status === 'success' && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previos page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) =>
                !latestData || !latestData.next ? old : old + 1
              )
            }
            disabled={!latestData || !latestData.next}
          >
            Next page
          </button>
          <div>
            {resolvedData.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
