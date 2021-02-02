import React from 'react';
import { NavLink } from 'react-router-dom';


const Home = () => {
  return (
    <section className="section">
      <h1 className="page-heading">What I Desire</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      <ul>
        <li>
          <NavLink to="/items">Items</NavLink>
        </li>
      </ul>

    </section>
  )
}

export default Home;