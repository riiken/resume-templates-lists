const express = require('express');
const router = express.Router();
const Template = require('../model/templateModel');
const path = require('path');
const fs = require('fs');

router.get('/',(req,res)=>{
    res.json({message:"Hello"});
})
// Endpoint to get the list of templates
router.get('/templates', async (req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates);
    } catch (err) {
        console.error('Error fetching templates:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to add a new template
router.post('/templates', async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

   let content = `<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name ="viewport" content="width = device-width, initial-scale = 1" >
        <title>Bootcamp / CV</title>
        <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1"
            crossorigin="anonymous" />
        <!-- <link rel="stylesheet" href="style.css" /> -->
        <link rel="shortcut icon" href="./favicon.ico">
  
        <style>
          body {
      background: linear-gradient(to bottom right, #50a3a2 0%, #2eca7f 100%);
      padding: 0;
      margin: 0;
      border: none;
      font-family: 'Poppins';
      font-size: 14px;
      color: #626262;
      letter-spacing: 0em;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
  }
  
  a {
      text-decoration: none;
      color: #171717;
  }
  
  
  
  .background.gradient {
      background: #50a3a2;
      background: linear-gradient(to bottom right, #50a3a2 0%, #2eca7f 100%);
      position: fixed;
      overflow: hidden;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  
  input, textarea, button {
      margin: 0;
      padding: 0;
      display: block;
      font-family: 'Poppins';
      font-size: 13px;
      width: 100%;
      height: 60px;
      color: #171717;
      background: none;
      border: none;
      border-bottom: 1px solid #d8dbe2;
      appearance: none;
      resize: none;
      outline: 0;
      transition: all 0.3s ease 0s;
      border-radius: 0px;
  }
  
  input:focus, textarea:focus, button:focus {
      color: #171717;
      border-bottom: 1px solid #2eca7f;
  }
  
  .title{
      text-align: left;
      margin: 0 0 15px 20px;
      padding: 0 0 5px 0;
      position: relative;
      font-size: 17px;
      color: #171717;
      line-height: 21px;
      font-weight: 500;
  }
  
  /* Círculo verde encima del título */
  .title::before{
      content: '';
      position: absolute;
      left: -12px;
      top: 0;
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, rgba(46, 202, 127, 0.4) 0%, rgba(46, 202, 127, 0.01) 100%);
      z-index: -1;
      border-radius: 30px;
  }
  /* Línea gris debajo del título */
  .title::after{
      content: '';
      position: absolute;
      left: -40px;
      bottom: -15px;
      width: 95%;
      height: 1px;
      background: radial-gradient(ellipse at left, rgba(197, 202, 213, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
  }
  
  .line-left{
      position: relative;
  }
  .line-left::before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background: radial-gradient(ellipse at top, rgba(197, 202, 213, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
  }
  
  .line-down{
      position: relative;
  }
  
  .line-down::after{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: radial-gradient(ellipse at left, rgba(197, 202, 213, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
  }
  
  header{
      background-color: white;
      border-radius: 0 0 5px 5px;
      width: 100%;
      max-width: 540px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.05);
      position: fixed;
      top: 0;
      z-index: 100;
  }
  
  header nav{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
  }
  
  header nav a {
      width: 100%;
      height: 72px;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: color 0.3s ease 0s;
      font-size: 20px;
  }
  
  header nav a::before{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 1px;
      height: 100%;
      background: radial-gradient(ellipse at top, rgba(197, 202, 213, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
  }
  
  header nav a .link{
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      margin-top: 4px;
  
  }
  
  header nav a:hover {
      color: #2eca7f;
  }
  
  main{
      margin-top: 88px;
  }
  
  main .profile, main .about, main .resume, main .works, main .blog, main .contact{
      box-sizing: border-box;
      position: relative;
      background: #ffffff;
      text-align: center;
      z-index: 10;
      border-radius: 4px;
      max-width: 540px;
      margin: 0 auto;
  }
  
  main .about, main .resume, main .works, main .blog, main .contact{
      padding: 30px 20px 30px 20px;
      margin-top: 15px;
  }
  
  main .profile{
      margin-top: 18px;
      overflow: hidden;
  }
  
  .profile-background{
      height: 300px;
  }
  
  .profile-image{
      position: relative;
      height: 84px;
  }
  .profile-image img{
      position: relative;
      top: -82px;
      border-radius: 50%;
      border: 3px solid white;
      width: 134px;
  }
  
  .profile-image::before{
      content: '';
      position: absolute;
      top: -69px;
      left: calc(50% - 78px);
      width: 134px;
      height: 134px;
      background: linear-gradient(135deg, rgba(46, 202, 127, 0.4) 0%, rgba(46, 202, 127, 0.01) 100%);
      border-radius: 100%;
  }
  
  .profile-name{
      font-size: 32px;
      color: #171717;
      line-height: 32px;
      font-weight: 400;
      margin: 0 auto 0 auto;
  }
  
  .profile-profession{
      font-size: 14px;
      color: #2eca7f;
      line-height: 14px;
      font-weight: 400;
  }
  
  .profile-social a{
      transition: color 0.3s ease 0s;
      margin: 0 6px;
      font-size: 16px;
  }
  
  .profile-social a:hover{
      text-decoration: none;
      color: #2eca7f;
  }
  
  .profile-buttons{
      position: relative;
      display: flex;
      margin-top: 58px;
  }
  .profile-buttons::before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background: radial-gradient(ellipse at left, rgba(197, 202, 213, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
  }
  
  .profile-buttons a{
      position: relative;
      width: 50%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.3s ease;
      line-height: 70px;
      font-size: 12px;
      font-weight: 500;
      color: #171717;
  }
  
  
  
  .profile-buttons a:hover{
      color: #2eca7f;
  }
  
  .profile-buttons a:first-child::before, .profile-buttons a:first-child::after{
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background: radial-gradient(ellipse at top, rgba(197, 202, 213, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
  }
  
  .profile-buttons a i{
      margin-left: 10px;
      font-size: 15px;
  }
  
  .about-aboutMe > div{
      padding: 5px 17px;
      position: relative;
  
  }
  
  .about-aboutMe > div > div{
      display: flex;
      flex-wrap: wrap;
  }
  
  .about-aboutMe > div > div > div{
      width: 50%;
      text-align: left;
  }
  
  .about-aboutMe > div > div > div span{
      font-weight: 500;
      font-size: 13px;
  }
  
  
  .about-aboutMe p{
      text-align: left;
  }
  
  .about-services{
      margin-top: 50px;
  }
  
  .about-services >div{
     display: flex;
     flex-wrap: wrap;
     position: relative;
  }
  .about-services >div:after{
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      width: 1px;
      height: 100%;
      background: radial-gradient(ellipse at top, rgba(197, 202, 213, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
  }
  
  .about-services article{
      position: relative;
      width: 50%;
      text-align: left;
      padding: 15px 20px;
      box-sizing: border-box;
  }
  
  .about-services article .fas{
      margin: 0;
      width: 60px;
      height: 60px;
      text-align: center;
      font-size: 32px;
      color: #2eca7f;
      background: linear-gradient(135deg, rgba(46, 202, 127, 0.4) 0%, rgba(46, 202, 127, 0.01) 100%);
      border-radius: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .about-services article h4{
      font-size: 13px;
      color: #171717;
      font-weight: 500;
      text-transform: uppercase;
  }
  
  .about-services article p{
      font-size: 14px;
      line-height: 1.6;
      padding: 0;
  }
  
  .resume-lines{
      display: flex;
  }
  
  .resume-line h4{
      margin: 0;
      text-align: left;
      padding: 20px 18px;
      font-size: 13px;
      line-height: 13px;
      color: #171717;
      font-weight: 500;
      text-transform: uppercase;
  }
  
  .resume-line h4 .fas{
      position: relative;
      float: left;
      top:-7px;
      width: 40px;
      height: 40px;
      font-size: 26px;
      color: #2eca7f;
  }
  
  .resume-line{
      flex: 1;
      text-align: left;
  }
  
  .resume-line article{
      padding: 15px 15px;
  }
  
  .resume-line .date{
      margin: 0 0 10px 0;
      padding: 0;
      position: relative;
      display: inline-block;
      font-size: 11px;
      line-height: 18px;
      color: #d8dbe2;
      font-weight: 500;
      text-transform: uppercase;
      border-radius: 4px;
  }
  
  
  .resume-line .date::before{    
      content: '';
      position: absolute;
      left: -19px;
      top: 4px;
      width: 9px;
      height: 9px;
      background: #d8dbe2;
      border-radius: 9px;
      -moz-border-radius: 9px;
      -webkit-border-radius: 9px;
      -khtml-border-radius: 9px;
  }
  
  .resume-line .date.active{
      color: #2eca7f;
  }
  
  .resume-line .date.active::before{
      background: #2eca7f;
  }
  
  .resume-line .name{
      margin: 0;
      font-size: 13px;
      color: #171717;
      font-weight: 500;
      text-transform: uppercase;
  }
  
  .resume-line .company{
      margin: 0 0 10px 0;
      font-size: 11px;
      color: #999999;
      font-weight: 300;
      text-transform: uppercase;
  }
  
  .resume-skills{
      margin-top: 50px;
  }
  .resume-skills > div{
      display: flex;
  }
  .resume-skills > div section{
      flex: 1;
      text-align: left;
  }
  
  .resume-skills > div section > div{
      padding: 18px 20px;
  }
  
  .resume-skills > div section > div > div:first-child{
      margin: 0 0 8px 0;
      font-size: 14px;
      line-height: 14px;
      color: #626262;
      text-align: left;
  }
  
  .resume-skills > div section > div > div:last-child{
      width: 100%;
      background: #d8dbe2;
      height: 4px;
  }
  
  .resume-skills > div section > div > div > div{
      background: #2eca7f;
      height: 4px;
  }
  
  .resume-skills h4{
      margin: 0;
      text-align: left;
      padding: 20px 18px;
      font-size: 13px;
      line-height: 13px;
      color: #171717;
      font-weight: 500;
      text-transform: uppercase;
  }
  
  .resume-skills h4 .fas{
      position: relative;
      float: left;
      top:-7px;
      width: 40px;
      height: 40px;
      font-size: 26px;
      color: #2eca7f;
  }
  
  
  main .contact{
      margin-bottom: 40px;
  }
  
  .contact-information{
      display: flex;
      flex-wrap: wrap;
      padding: 11px 18px;
  }
  
  .contact-information > div{
      width: 50%;
      text-align: left;
  }
  
  .contact-information > div span{
      font-weight: 500;
      font-size: 13px;
  }
  
  
  @media only screen and (min-width: 540px){
      header{
          left: calc(50% - 270px);
      }
  }
  
  @media only screen and (min-width: 1040px) {
      .selected{
          color: #2eca7f;
      }
      .page{
          position: absolute;
          top:0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      header{
          max-width: 80px;
          position: relative;
          border-radius: 5px;
          left: -6px;
      }
      header nav{
          display: flex;
          flex-direction: column;
      }
      header nav a::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: radial-gradient(ellipse at left, rgba(197, 202, 213, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
      }
  
      main{
          display: flex;
          margin: 0;
          width: 1020px;
      }
  
      main .about, main .resume, main .contact {
          width: 0;
          height: 0;
          opacity: 0;
          overflow: hidden;
          position: relative;
          top: 16px;
          transform: translateX(-450px);
          transition: opacity 1s ease, transform 1s ease;
          z-index: 0;
          margin: 0;
          padding: 0;
      }
  
      main .profile{
          width: 480px;
          height: 600px;
          box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
          margin: 0;
      }
    
      main .view{
          height: 574px;
          width: 540px;
          padding: 30px 20px 30px 20px;
          overflow: auto;
          opacity: 1;
          transform: translateX(-8px);
      }
  
      main .view::-webkit-scrollbar {
          width: 5px;
      }
         
      main .view::-webkit-scrollbar-track {
          background: #ddd;
      }
         
      main .view::-webkit-scrollbar-thumb {
          background: #666; 
      }
  
      main .contact {
          margin-bottom: 0;
      }
  }
        </style>
    </head>
  
  <body> 
      <div class="background gradient">
        <!-- Delete if animation
          <ul class="bg-bubbles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
        -->
      </div>
      <div class="page">
          <header>
              <nav>
                  <a href="#about" class="selected" id='getAbout'>
                      <span class="fas fa-user"></span>
                      <span class="link">About</span>
                  </a>
                  <a href="#resume" id='getResume'>
                      <span class="fas fa-file"></span>
                      <span class="link">Resume</span>
                  </a>
                  <a href="#contact" id='getContact'>
                      <span class="fas fa-at"></span>
                      <span class="link">Contact</span>
                  </a>
              </nav>
          </header>
          <main>
              <section id="presentation" class="profile">
                  <div class="profile-background"></div>
                  <div>
                      <div class="profile-image">
                          <img src="https://i.ibb.co/JHjYgmv/profile.png" alt="Ryan Adlard">
                      </div>
                      <h1 class="profile-name" id="nombre">Ryan Adlard</h1>
                      <h2 class="profile-profession">Web Designer</h2>
                      <div class="profile-social" id="profile-social">
                          <a href="www.dribbble.com" class="fab fa-dribbble"></a>
                          <a href="www.twitter.com" class="fab fa-twitter"></a>
                          <a href="www.github.com" class="fab fa-github"></a>
                          <a href="www.spotify.com" class="fab fa-spotify"></a>
                          <a href="www.stackoverflow.com" class="fab fa-stack-overflow"></a>
                      </div>
                  </div>
                  <div class="profile-buttons">
                      <a href="/myCV.txt" download>DOWNLOAD CV <i class="fas fa-download"></i></a>
                      <a href="#contact">CONTACT ME <i class="fas fa-arrow-right"></i></a>
                  </div>
              </section>
              <section id="about" class="about view">
                  <article class="about-aboutMe">
                      <h3 class="title">About Me</h3>
                      <div class="line-left">
                          <p>I am Ryan Adlard, web designer from USA, California. I have rich experience in web site
                              design
                              and
                              building and customization, also I am good at wordpress. I love to talk with you about our
                              unique.</p>
                          <div>
                              <div>
                                  <span>AGE . . . . </span>24
                              </div>
                              <div>
                                  <span>RESIDENCE . . . . </span>USA
                              </div>
                              <div>
                                  <span>FREELANCE . . . . </span>Available
                              </div>
                              <div>
                                  <span>ADDRESS . . . . </span>California, USA
                              </div>
                          </div>
                      </div>
                  </article>
                  <article class="about-services">
                      <h3 class="title">My Services</h3>
                      <div class="line-left">
                          <article class="line-down">
                              <div class="fas fa-code"></div>
                              <h4>WEB DEVELOPMENT</h4>
                              <p>Modern and mobile-ready website that will help you reach all of your marketing.</p>
                          </article>
                          <article class="line-down">
                              <div class="fas fa-music"></div>
                              <h4>MUSIC WRITING</h4>
                              <p>Music copying, transcription, arranging and composition services.</p>
                          </article>
                          <article>
                              <div class="fas fa-bullhorn"></div>
                              <h4>ADVETISING</h4>
                              <p>Advertising services include television, radio, print, mail and web.</p>
                          </article>
                          <article>
                              <div class="fas fa-gamepad"></div>
                              <h4>GAME DEVELOPMENT</h4>
                              <p>Developing memorable and unique mobile android, ios games.</p>
                          </article>
                      </div>
                  </article>
              </section>
              <section id="resume" class="resume">
                  <h3 class="title">Resume</h3>
                  <article class="resume-lines">
                      <section class="resume-line line-left">
                          <h4 class="line-down"> <i class="fas fa-briefcase"></i> Experience</h4>
                          <article class="line-down">
                              <div class="date active">2013 - PRESENT</div>
                              <h5 class="name">ART DIRECTOR</h5>
                              <h6 class="company">FACEBOOK INC.</h6>
                              <p>Collaborate with creative and development teams on the execution of ideas.</p>
                          </article>
                          <article class="line-down">
                              <div class="date">2011 - 2012</div>
                              <h5 class="name">FRONT-END DEVELOPER</h5>
                              <h6 class="company">GOOGLE INC.</h6>
                              <p>Monitored technical aspects of the front-end delivery for several projects.</p>
                          </article>
                          <article>
                              <div class="date">2009 - 2010</div>
                              <h5 class="name">SENIOR DEVELOPER</h5>
                              <h6 class="company">ABC INC.</h6>
                              <p>Optimize website performance using latest technology.</p>
                          </article>
                      </section>
                      <section class="resume-line line-left">
                          <h4 class="line-down"> <i class="fas fa-university"></i> Education</h4>
                          <article class="line-down">
                              <div class="date">2006 - 2008</div>
                              <h5 class="name">ART DIRECTOR</h5>
                              <h6 class="company">NEW YORK</h6>
                              <p>Bachelor's Degree in Computer Science ABC Technical Institute, Jefferson, Missouri</p>
                          </article>
                          <article class="line-down">
                              <div class="date">2005 - 2006</div>
                              <h5 class="name">PROGRAMMING COURSE</h5>
                              <h6 class="company">PARIS</h6>
                              <p>Coursework - Git, WordPress, Javascript, iOS, Android.</p>
                          </article>
                          <article>
                              <div class="date">2004 - 2005</div>
                              <h5 class="name">WEB DESIGN COURSE</h5>
                              <h6 class="company">LONDON</h6>
                              <p>Converted Photoshop layouts to web pages using HTML, CSS, and JavaScript.</p>
                          </article>
                      </section>
                  </article>
                  <article class="resume-skills">
                      <h3 class="title">My Skills</h3>
                      <div>
                          <section class="line-left">
                              <h4 class="line-down"> <i class="fas fa-tv"></i> DESIGN</h4>
                              <div class="line-down">
                                  <div>Web Design</div>
                                  <div>
                                      <div style="width: 70%"></div>
                                  </div>
                              </div>
                              <div class="line-down">
                                  <div>Write Music</div>
                                  <div>
                                      <div style="width: 76%"></div>
                                  </div>
                              </div>
                              <div class="line-down">
                                  <div>Photoshop</div>
                                  <div>
                                      <div style="width: 66%"></div>
                                  </div>
                              </div>
                              <div>
                                  <div>Graphic Design</div>
                                  <div>
                                      <div style="width: 86%"></div>
                                  </div>
                              </div>
                          </section>
                          <section class="line-left">
                              <h4 class="line-down"><i class="fas fa-code"></i> CODING</h4>
                              <div class="line-down">
                                  <div>WordPress</div>
                                  <div>
                                      <div style="width: 50%"></div>
                                  </div>
                              </div>
                              <div class="line-down">
                                  <div>PHP/MYSQL</div>
                                  <div>
                                      <div style="width: 40%"></div>
                                  </div>
                              </div>
                              <div class="line-down">
                                  <div>Angular/JavaScript</div>
                                  <div>
                                      <div style="width: 95%"></div>
                                  </div>
                              </div>
                              <div>
                                  <div>HTML/CSS</div>
                                  <div>
                                      <div style="width: 100%"></div>
                                  </div>
                              </div>
                          </section>
                      </div>
                  </article>
              </section>
              <section id="contact" class="contact">
                <h3 class="title">Get in Touch</h3>
                <div class="contact-information line-left">
                  <div>
                    <span>ADDRESS . . . . </span> California, USA
                  </div>
                  <div>
                    <span>EMAIL . . . . </span> adlard@example.com
                  </div>
                  <div>
                    <span>PHONE . . . . </span> +123 654 78900
                  </div>
                  <div>
                    <span>FREELANCE . . . . </span> Available
                  </div>
                </div>
              </section>
          </main>
      </div>
  
      <script>
          let getAbout = document.getElementById("getAbout");
  let getResume = document.getElementById("getResume");
  let getContact = document.getElementById("getContact");
  
  // Sections
  let about = document.getElementById("about");
  let resume = document.getElementById("resume");
  let contact = document.getElementById("contact");
  
  function removeClass() {
      // Links
      getAbout.classList.remove('selected');
      getResume.classList.remove('selected');
      getContact.classList.remove('selected');
      // Sections
      about.classList.remove('view');
      resume.classList.remove('view');
      contact.classList.remove('view');
  }
  
  getAbout.addEventListener('click', function (e) {
      if (window.innerWidth > 1040) {
          e.preventDefault();
          removeClass();
          about.classList.add('view');
          getAbout.classList.add('selected');
      }
  
  });
  getResume.addEventListener('click', function (e) {
      if (window.innerWidth > 1040) {
          e.preventDefault();
          removeClass();
          resume.classList.add('view');
          getResume.classList.add('selected');
      }
  })
  getContact.addEventListener('click', function (e) {
      if (window.innerWidth > 1040) {
          e.preventDefault();
          removeClass();
          contact.classList.add('view');
          getContact.classList.add('selected');
      }
  })
  
      </script>
  
  </body>
  
  </html>`;

    const template = new Template({ name, description, content });

    try {
        await template.save();
        res.status(201).json({ message: 'Template added successfully' });
    } catch (err) {
        console.error('Error adding template:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to render a specific template as JSON
router.get('/templates/render/:id', async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (template) {
            const filePath = path.join(__dirname, '../', template.file_path);
            const content = fs.readFileSync(filePath, 'utf8');
            res.json({ template: template.name, content });
        } else {
            res.status(404).send('Template not found');
        }
    } catch (err) {
        console.error('Error rendering template:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
