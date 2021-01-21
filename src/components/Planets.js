import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async () => {
  const res = await fetch('http://swapi.dev/api/planets/');
  const data = await res.json();
  return data;
};

const Planets = () => {
  const { data, status } = useQuery('planets', fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
      {status === 'loading' && <div>Loading Data</div>}

      {status === 'error' && <div>Error Fetching Data</div>}

      {status === 'success' && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
