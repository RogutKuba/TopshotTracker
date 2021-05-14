# TopShot Tracker
This project is built for [NBA Topshots](https://nbatopshot.com/). If you have never heard about topshots, I highly recommend reading this [article](https://www.cnbc.com/2021/02/28/230-million-dollars-spent-on-nba-top-shot.html).

There are two main features of TopshotTracker
* The site will analyze the latest listings on topshot every 15 minutes and keep track of any deals that are listed. A deal is defined as a Topshot Moment that is less than 85% of the average price of the cheapest 5 listings (not including the newest listing). The moment also needs to be more than 5$ cheaper than the next cheapest listing, so to filter out a user listing a 5$ card for 4$.
* A user can create an account and see the total value of their topshot collection, and a list of all their moments and their respective values
--------------------------------------

## [Live Site](https://topshot-tracker-rogutkuba.vercel.app/)
