1. sarvat pahile apn db.js file database sobat connection kela

2. nantr apn user-models.js madhe models i.e. user schema banawla jo asto form cha 
   ex. name email phone password isAdmin etc

3. after model we build logic in auth-controller.js file
   ex. if mail exist return mail already exist so cant register again
   then hashing of password using bcrypt done
   json web token done using instance method