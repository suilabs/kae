import React from 'react';

import './Home.module.css';

export default () => (
  <main>
    <h1>Welcome to KAE</h1>
    <h2>And now what?</h2>
    <p>
      This page is devided in 4 sections.
    </p>
    <ul>
      <li>
        <p><strong>Projects</strong>: every single project in the database. You can modify, delete, create projects from there.</p>
      </li>
      <li>
        <p><strong>Images</strong>: Our very own media manager. For now only supports images, or not, haven't try with any other type.</p>
      </li>
      <li>
        <p><strong>Sections</strong>: Here you can see the verticals we will show in Elantris. You can <span className="alert-text">delete</span>, <span className="success-text">create</span> and <span className="info-text">edit</span> them.</p>
      </li>
      <li>
        <p><strong>Types</strong>: Here are the types of projects (Il·lustació, Naming, etc). You can <span className="alert-text">delete</span>, <span className="success-text">create</span>, and <span className="info-text">edit</span> them there.</p>
      </li>
    </ul>
  </main>
)