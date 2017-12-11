# Passport login

Contains much of the boilerplate involved in setting up passport login for the the following.

* Facebook
* Google
* Github
* Twiiter


Users details will be added to mongodb so make sure you have it [installed](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/). Handlebars is used as the template engine.

Clone this repo and run ```npm install```. 

Then put your API keys in ```config/keys_demo.js``` and rename the file to ```keys.js```. Make sure that the callback urls match those in ```config/passport-setup.js```.

After start the app with ```nodemon app.js```. # dog-site
