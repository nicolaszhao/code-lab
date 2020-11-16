import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        <div className="nav-content">
          <div className="nav-links">
            <Link to="/">Posts</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
