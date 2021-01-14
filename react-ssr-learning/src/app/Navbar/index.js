import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const languages = [
  {
    name: 'All',
    param: 'all'
  },
  {
    name: 'JavaScript',
    param: 'javascript',
  },
  {
    name: 'Ruby',
    param: 'ruby',
  },
  {
    name: 'Python',
    param: 'python',
  },
  {
    name: 'Java',
    param: 'java',
  }
];

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink activeStyle={{ fontWeight: 'bold' }} to="/home">Home</NavLink>
        </li>
        {languages.map(({ name, param }) => (
          <li key={param}>
            <NavLink
              activeStyle={{ fontWeight: 'bold' }}
              to={`/popular/${param}`}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
