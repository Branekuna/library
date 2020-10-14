This is a simple app developed as part of learning React/Nodejs. This readme concerns backend installation and startup. I didn't want to waste anymore time on this app (mostly it works, but it has minimal usability), since I wasn't going to learn any newer technologies, just rewrite code I already know how to write: so you'll find throws in async (which doesn't end up in express error middleware), or try-catch blocks (which I phased out for await.catch() syntax that is much more readable), etc.
Honestly, it's not meant to be started up. But, if you do want to run it, here's how:

1. You will need to populate the sample env fileS (one in root, one for backend and frontend), and rename it to just .env.
2. The docker-compose can be started up with 'docker-compose up -d'; docker-compose.yml is located above the root folders for backend || frontend.
3. The hard part is organizing the databases: you must use the schemas provided for SQL, since I can't be bothered to use knex to do migrations for this project.
4. MySQL also has an annoying pattern, where you need to create a new user with proper authorizations in order for the app to be able to connect; after you backward engineer the tables, just make a new user with your non-root creds and allow him access from all machines. Make sure to slot him into .env appropriately.
5. I never really got around to using mongo, since I had plenty of practice at work, and am not a big fan of NoSQL dbs. But with it, at least, you shouldn't have any concerns.
