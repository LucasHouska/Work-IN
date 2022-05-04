import React from 'react';


function AboutPage() {
  return (
    <div className="container">
      <div id='about'>
        <h1>Technologies Used</h1>
        <ul className='about-list'>
          <li>JavaScript</li>
          <li>React</li>
          <li>Redux</li>
          <li>Redux-Saga</li>
          <li>Express.js</li>
          <li>Node.js</li>
          <li>PostgreSQL</li>
          <li>Passport</li>
        </ul>
        <h1>Going forward...</h1>
        <ul className='about-list'>
          <li>Show the progress for exercises done after workout</li>
          <li>Add body weight, water, and mood tracker</li>
        </ul>
        <h1>Big Thanks</h1>
        <ul className='about-list'>
          <li>Dane Smith</li>
          <li>Butler cohort</li>
          <li>Prime Digital Academy</li>
          <li>My girlfriend, friends, and family</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
