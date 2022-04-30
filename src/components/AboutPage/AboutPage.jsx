import React from 'react';


function AboutPage() {
  return (
    <div className="container">
      <div id = 'about'>
        <h1>Technologies Used</h1>
        <ul className='about-list'>
          <li>React</li>
          <li>JavaScript</li>
          <li>Redux</li>
          <li>Redux-Saga</li>
          <li>Express.js</li>
          <li>Node.js</li>
          <li>PostgreSQL</li>
        </ul>
        <h1>Big Thanks</h1>
        <ul className='about-list'>
          <li>Dane</li>
          <li>My cohort</li>
          <li>Prime Digital Academy</li>
          <li>My girlfriend, friends, and family</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
