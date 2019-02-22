# Polling Website 

This is a full stack website that lets user create Polls and vote on them. 

This is a remake of an old project I had built without AngularJS or React.js, so I wanted to try out Redux with it. It was initially part of FreeCodeCamp's cirriculum, but it's developed past the point of it being like the other websites from it. I'm still working on it, but I wanted to get the minimum viable product out. 

## To Do

* Display what I voted for on the Results page
* Open/Close Polls
* Confirm User via Email
* Comment on Polls
* Graph Colors
* Hide user answers button
* Validate user doesn't already exist when registering.
* Validate created user answers
* Alert messaging
* Admin accounts

Firebase To Do

* Stop password from being saved to authenticate reducer
* Clean up reducers
* Cannot SET HEADERS

## Completed Job Stories

Job Story 1: When I'm on the Home page, I can create a poll, and view all polls. 

Job Story 2: When creating a poll, I have toggleable options (See results, rescind, multiple answers, user answers) and allow them, if logged in, to connect the poll to their account. I can also add my own question, and unlimited (as long as it's at least 2) answers, and submit it to the back end. 

Job Story 3: When clicking on poll on the home page, I'm redirected to the voting page of that poll.

Job Story 4: When on the voting page, I'm redirected if I've already voted and if I'm not logged in I can't vote. Depending on the options, I can do different things on this page such as vote on multiple answers, make my own answers, and see the results before voting. After voting, I am redirected to the results page.

Job Story 5: When on the results page, I'm redirected if I haven't voted or if I'm not logged in (if the user can't see the results as per the options). If I can see the options before voting, I can go back to the voting page, and if I've already voted I can rescind my answer. I can see the results via bar and pie charts.

Job Story 6: I can login and register with links in the Nav. I can also access my profile (still in progress)

## Built With

* [Heroku](https://dashboard.heroku.com/) - Hosting the website online
* [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) - Database interaction.
* [mLabs](https://mlab.com/home) - Database storage.
* [Express](https://expressjs.com/) - Running server.
* [React.JS](https://reactjs.org/) - Single-page application UI rendering pages, Redux.JS for uniflow data storage, and react-router for navigationg and routing.

## Authors

* **Nicolas Crumrine** - *EVERYTHING* - [CrumrineCoder](https://github.com/CrumrineCoder)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* A few friends and my brother for reviewing the design of the website over the course of the development of the website. 
* FreeCodeCamp for initial user stories and idea. 
