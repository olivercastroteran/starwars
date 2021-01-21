const Planet = ({ planet }) => {
  return (
    <div className="card">
      <h3>{planet.name}</h3>
      <p>population - {planet.population}</p>
      <p>Terrian - {planet.terrian}</p>
    </div>
  );
};

export default Planet;
