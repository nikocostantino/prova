import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Suspense } from 'react';
import { useLoaderData, json, defer, Await, Link } from 'react-router-dom';


function Home() {
  const { events } = useLoaderData();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Benvenuto nella Home Page.</p>
      <Suspense fallback={<div style={{ textAlign: 'center' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <div>caricamento...</div>
        </div>
        }>
        <Await resolve={events}>
        {events => (
            <ul>
              {events.map(event => (
                <li key={event.id}>
                  <Link  to={`/details/${event.id}`}>
                    <div>
                      <h2>{event.slot}</h2>
                      <time>{event.date}</time>
                    </div>
                  </Link >
                </li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadAvailableSlot() {

  const response = await fetch('http://localhost:8081/home/getTodayAvailableBookings');

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch bookings.' },
      {
        status: 500,
      }
    );
  } 
  else {
    const resData = await response.json();
    return resData.bookings;
  }
}

export function loader() {
  return defer({
    events: loadAvailableSlot(),
  });
}
export default Home;