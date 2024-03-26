# hanzi-game

## Summary

A full-stack web app using [Hanzi Writer](https://hanziwriter.org/docs.html) to allow users to practise writing Chinese characters of their choice. A deployed version of the app can be accessed ([link](https://hanzi-game.vercel.app/practice)). 

## Background

I have enjoyed using several apps for learning Chinese, particularly Chineasy, Duolingo and Pleco. While Chineasy allows a user to practise characters, they must be drawn from characters that a user has unlocked. I wanted more flexibility, so began some working putting together an app that would allow a user to curate a library of characters that they want to practise. 

## Execution

I made the app with NextJS. Initially, I used the [Chinese Character Web API (HTTP address)](http://ccdb.hemiola.com/) for pronunciation, search and definition. However, I observed (rather late) that there was no support for secure HTTPS requests. Although the security risks seemed limited to me, I decided it would be better to recreate the functionality myself. I created an API with Postgres that I then populated with data from the same source used by the Chinese Character Web API, the [Unihan Database](https://www.unicode.org/charts/unihan.html). There are some nice features of the Chinese Character Web API that I have not reproduced, but it broadly succeeds in the requirements I had for this project. One issue I faced was that not all the characters in the Unihan Database can generate quizzes with Hanzi Writer, so I used [Make Me a Hanzi](https://github.com/skishore/makemeahanzi/tree/master)'s dictionary, which Hanzi Writer uses, to filter the items entered into the database. 

## Design

The design for the practice page was heavily indebted to Chineasy's character practice UI. For the navigation bar design, I drew from the navigation bar in Duolingo's app. For button design, I was influenced by the work of the design team from my time with Lyfta Education. The modals, and the switches on the settings page, took advantage of templates as well as functionality provided by [Headless UI](https://headlessui.com/). The carousel was created using [React Slick](https://react-slick.neostack.com/). 

## Screenshots

![Screenshot 2024-03-19 at 13 09 48](https://github.com/lascellesabercrombie/hanzi-game/assets/68148169/dadd7d26-1ac1-4b0e-a929-d657e083c445)
![Screenshot 2024-03-19 at 13 09 52](https://github.com/lascellesabercrombie/hanzi-game/assets/68148169/34f962a7-6842-4729-a0c3-a2036d8d203b)
![Screenshot 2024-03-19 at 13 11 13](https://github.com/lascellesabercrombie/hanzi-game/assets/68148169/3bafef4e-3780-4423-8ed2-6c97d4f3b0be)
![Screenshot 2024-03-19 at 13 11 24](https://github.com/lascellesabercrombie/hanzi-game/assets/68148169/206e66d0-0cf3-431a-88b1-51ce553deea2)
