import React from "react";

export default function DynamicRoutePage({ params }) {
  const id = params.id;
  if (!id) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dynamic Route</h1>
      <p>The ID from the route is: {id}</p>
    </div>
  );
}
