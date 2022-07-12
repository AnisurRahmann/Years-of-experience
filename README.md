# Project Setup
1. Run `npm install`
2. Create a file named `.env` and put all environment variables and their values found in .env.example
3. Run `npm start`. Project will be started at port 3000

# Testing
We have done some e2e tests for `login`, `registration`, and `Dashboard` pages. We used cypress for e2e testing,
1. Run `npx cypress open` to run all the tests. You may need to run `npx cypress install` if you dont have cypress installed already.


# Deployment
We have deployed the app to vercel : https://years-of-experience.vercel.app/


# User Flows
1. You need to open a account with unique Email, name and password.
2. After successful registration you can login to the dashboard with the email and password.
3. You can update your profile add work experience make it public with a URL.
4. You can copy your profile url by clicking on header button. We are providing the  profile page from server side. You can decide which part of your profile you want to display publicly. Rest of will be kept hide.

# Making profile edit available for offline
1. I have done some rnd to implement this feature. I found amazing library : https://replicache.dev/. I have spent some time with it. It seems i need to change my backend architecture to adapt with it. So i did not go forward with it. But later i will explore it more.
2. Bottom line is i did have not completed this features as its already took some time. But i have created a branch called `offline-support`. I will push my changes their if i have finished this feature.
3. As i did not do this kind of work this feature new to me and thats why i am getting excited to do this. I have decided to this with `redux-persistence`.  

# Improvements
1. First priority will be make the ui mobile responsive which is not now.
