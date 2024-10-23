import { useState, useEffect } from "react";

//total_distance = 240;
//gas_price = 3.33;

/*vehicles = [
  {
    id: "vehicle_1",
    gas_mileage: 18,
  },
  {
    id: "vehicle_2",
    gas_mileage: 12,
  },
];*/

function KStateTrip() {
  const [gasCost, setGasCost] = useState(3.33);
  const [totalMileage, setTotalMileage] = useState(240);
  const [vehicles, setVehicles] = useState([{ mileage: 10 }, { mileage: 25 }]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    let vehicleCost = 0;
    vehicles.forEach((vehicle) => {
      vehicleCost += (totalMileage / vehicle.mileage) * gasCost;
    });

    setTotalCost(vehicleCost);
  }, [gasCost, totalMileage, vehicles]);

  return (
    <div style={{ maxWidth: 200, margin: 8, backgroundColor: "#ffa" }}>
      <label>Gas Cost</label>
      <input
        type="number"
        value={gasCost}
        onChange={(e) => setGasCost(Number(e.target.value))}
      />

      <label>Total Milage</label>
      <input
        type="number"
        value={totalMileage}
        onChange={(e) => setTotalMileage(Number(e.target.value))}
      />
      <p>
        <strong>Total Cost: {totalCost}</strong>
      </p>
      <input
        type="number"
        onInput={(e) => {
          var v = vehicles;
          v.push({ mileage: e.target.value });
          setVehicles([...v]);
        }}
      />

      <pre>{JSON.stringify({ gasCost, totalMileage, vehicles })}</pre>
    </div>
  );
}

export default KStateTrip;
