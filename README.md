<a name="readme-top"></a>



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/JokerZ75/ModernFit-Gym-Group11">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ModernFit Gym</h3>

  <p align="center">
    <br />
    <a href="https://github.com/JokerZ75/ModernFit-Gym-Group11"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/JokerZ75/ModernFit-Gym-Group11">View Demo</a>
    ·
    <a href="https://github.com/JokerZ75/ModernFit-Gym-Group11/issues">Report Bug</a>
    ·
    <a href="https://github.com/JokerZ75/ModernFit-Gym-Group11/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#demo-site">Demo Site</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Our client is ModernFit Gym from Sheffield. Is looking to **_move from a paper-based records system to a modern digital alternative_**.
They pride themselves on fitness and health with several seasoned specialists offering nutritional guidance. The software should allow members and staff alike to sign up to the gym and will provide them with pins to enter gym locations. It will also allow for the gym’s specialists to have digital records of members, who can submit logs of meals and workouts, allowing specialists to provide programs and diets through the software to gym members. The software should follow WCAG 2 guidelines and allow notifications of any planned maintenance. This software is also planned to be used in more than one geographical location.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Seamless Registration for members and overview of available services.
- [ ] Assign Members Unique Pins.
- [ ] Allow Trainers to monitor member progress.
- [ ] Allow Member to acces detailed nutritional information for foods.
- [ ] Allow members to securely log their daily meals and workouts.
- [ ] Notification System for maintenance and downtime

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Mongo][MongoDB]][MongoDB-url]
* [![Tailwind][Tailwind.CSS]][Tailwind.CSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECH DEMO --> 
## Demo Site

There is a tech demo for the site setup, the frontend has been hosted for free on vercel as it uses next.js.
The backend is running in an AWS EC2 instance using docker-compose to set up the web server.
**ITS IMPORTANT TO NOTE THE DEMO BELOW HAS SOME SMALL FIXES AND EDITS THAT AREN'T SHOWN IN THIS REPO AS THEY WERE NEEDED TO MAKE IT WORK HOSTING ON VERCEL**
When signing up we also suggest not using any real personal info as this is a demo and is bound to have some issues somewhere in its current state
So phone numbers can be fake as they have no real use
Temp emails can be made with sites like https://tempail.com/en/ 

https://modern-fit-frontend-x1sc.vercel.app/

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* It may also be beneficial to get docker as this is how we will show you how to get the application running

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/JokerZ75/ModernFit-Gym-Group11
   ```
2. Create environment variables
    - In the directory /frontend
        - Create a .env.local file
        - In the file add
          ```sh
          NEXT_PUBLIC_API_URL=http://localhost:80 (IF YOUR NOT USING THE DOCKER COMPOSE YOU CAN USE WHATEVER PORT YOU LIKE AS LONG AS ITS THE ONE UR BACKEND IS RUNNING ON)
          ```
    - In the directory /backend/src
        - Create a .env file
        - In the file you'll need
          ```sh
          MONGO_URI=<Your Mongodb URI>
          TOKEN_SECRET=<can be anything you want, recommend generating long hex string>
          REFRESH_TOKEN_SECRET=<can be anything you want, recommend generating long hex string>
          PORT=<port you want the backend to run on>
          EMAIL_PASSWORD=<google gmail app password (for gmail used as EMAIL_USER)>
          EMAIL_USER=<google gmail>
          ```
3. Now go to /ModernFit-Gym-Group11 directory
4. If you have docker installed you should be able to run
```sh
docker compose up --build
```
5. You can now visit the site on localhost:3000 and everything should be working.
6. You could also run them individually using npm if you like. For the backend, you will require Redis (https://redis.io/docs/install/)
<p align="right">(<a href="#readme-top">back to top</a>)</p>







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/JokerZ75/ModernFit-Gym-Group11.svg?style=for-the-badge
[contributors-url]: https://github.com/JokerZ75/ModernFit-Gym-Group11/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/JokerZ75/ModernFit-Gym-Group11.svg?style=for-the-badge
[issues-url]: https://github.com/JokerZ75/ModernFit-Gym-Group11/issues
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Tailwind.CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind.CSS-url]: https://tailwindcss.com/

