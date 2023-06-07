# Space Salary

## Description deliverable

### Elevator pitch

Have you ever felt cramped? Ever felt like you needed more space? Well now you can, with our new and improved game, Space Salary. This nifty game lets you space out and push your worries away. You can click on the Space Bar and gain space bucks to spend on your space core's new space spunk. This novel interaction will be both relaxing and calming but be careful. If you gain too many space bucks too fast, you will be arrested by the space cops and put in space jail for being in space. Happy spacing out!

### Design

#### Space Bar
![SpaceBar](https://github.com/eman0202byu/startup/blob/main/public/SpaceBarConcept.PNG)

#### Store
![Store](https://github.com/eman0202byu/startup/blob/main/public/StoreConcept.PNG)

#### Space Scanner
![Score_Board](https://github.com/eman0202byu/startup/blob/main/public/ScoreBoardConcept.PNG)

### Key features

- Secure login over HTTPS
- Ability to save progress
- Display of current space bucks (§)
- Ability to spend space bucks on outfits for space core
- Space bucks ammount from top 10 users on Score Board (Space Scanner is in game name)
- Ability for users to click space core and send them to another player's screen
- Space cops appear if you click above a certin speed, or maintain same interval between presses for 10 sec
- Ability for admin to post "Space core of the day"

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. 4 HTML pages. One for login, one for the Space Bar, one for the Score Board/daily space core. Hyperlinks to and from Score Board and Space Bar artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, Space Core's costumes, switching between HTML pages, display other users space bucks, speed limit check, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving pushes
  - submitting current §
  - retrieving Score Board status
- **DB** - Store users, number of pushes per user, user's space core identifier, user's inventory, each component of the inventory, each space core with an associated identifier.
- **Login** - Register and login users. Credentials securely stored in database. Can't play unless authenticated.
- **WebSocket** - As each user's § increases update values on scoreboard, (if in top 10) the top 10 user's scores are shown to all users.
- **React** - Application ported to use the React web framework.

### HTML deliverable

For this deliverable I added the application structure.

- **HTML pages** - Four HTML pages that represent the ability to login, push the Space in the Space Bar, buy things in a store, and see the Space Scanner and Core of the Day.
- **Links** - The login page automatically links to the SpaceBar. The Space Bark links back to the login, to the Store and to the ScoreBoard. The Store and ScoreBoard link to the SpaceBar. (The SpaceBar will act as the hub.)
- **Text** - The login page has text explaing the Username and Password requierments, and the location to type the Username and Password. Space bar has text displaying the current Space Bucks. Store has text representing costs of goods, missing assets, and the inventory's components. The Space Scanner contains a table of text displaying the place, score and Username of each individual on the 'Score Board'.
- **Images** - Space Bar has a picture of your SpaceCore, Store has two pictures in the items of the day table. The Space Scanner has a picture of the SpaceCore of the day.
- **Login** - Input box and submit button for both Username and Password. Regex implemented for validation of secure Username and Passwords. (Username must be Alphanumeric, and Passwords need minimum of: 8 characters, 1 Uppercase letter, 1 Lowercase letter, 1 number, 1 special character)
- **Database** - The User's space bucks quantity will be pulled from the database. The User's current SpaceCore's identifier will be pulled from the database. The ScoreBoard's top 10 Users, and their space bucks quantity will be pulled from the database. The cost of items in the shops, their associated prices, and whether the user has already bought them will be pulled from the database. The User's inventory will be stored in the database. The User's SpaceCore's Identifier will be pulled from the database.
- **WebSocket** - The User's SpaceBucks values will be updated on the scoreboard, in real time, and notices of players being put in to space jail will appear on the screen in real time.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body** - Implemented, The header is at the top of the page, the footer is at the bottom, and the main content is between them.
- **Navigation elements** - I removed the underlines, changed the font (to a custom font) for anchor elements, and put them with their respective elements.
- **Responsive to window resizing** - My app responds to the alteration of the windows size, the text wraps arround to shrink with the different screen sizes, and the footer is removed if the screen's height is less than 600px. Also, the content will be centered on all screens, so the content will be visibal to all users.
- **Application elements** - Used thematic coloring to reflect the Si-Fi nature of my project. The items in the tables are evenly spaced, and  contrast have clear borders differentiating different elements. There are high contrast colors so that it is easy to read.
- **Application text content** - Fonts are consistent with their uses, the Retro font (Press Start P2) is for all links, the blocky font (20XX) is for major ideas over sections, the more simple font (protype20XX) is for the items below the main ideas, and the more flowing font (BableStoneHan) is used for descriptive text. All fonts have a backup font of Times New Roman, and Times if fonts fail to be pulled from server, or are in non english characters.
- **Application images** - The images scale with the size of the screen. The image in the SpaceBar spins (Weee). The images in the tables are centered and shop items will always have a white background, in the image file itself, to ensure clear viewing.

## JavaScript deliverable

For this deliverable I made my application functional to track and display a user's SpaceBucks, and filled in the .js for the ScoreBoard, Store, and SpaceBar. All important elements are now modified with .js files so that I can more effectivly implement the database interactions. (All elements have dummy filler text that is replaced with .js where pertinent.)

- **Login** - When you press type in a valid Username and Password it is saved to local storage, then checked on each page (if it does not exist you are returned to the login page (index.html)).
- **Database** - Displayed the Images, Scoreboard leaders and values, Store prices and button dynamically so there are no issues when implementing this. Currently all values are stored in local storage, if no value is present dummy data is loaded in (this is done with a Promise to ensure effective padge evaluation).
- **WebSocket** - I used the setInterval function to periodically check if a user is cheating, if they are it is reported to the Admin and their account is blocked. The scoreboard will be updated when the user presses the button, as the data is sent to the server to ensure that it is up to date. I used the setInterval function to periodically update said board after first initialization. The store will push to the Database via websockets what the user has purchaced, see items in local storage, and what their new SpaceCore is. All of these will be replaced with WebSockets later. (Unless there is a better way to implement them, which is why I have multiple things that have the potential of using WebSockets.)
- **Application Logic** - The Space in the SpaceBar actually works!! The user's currency is tracked in local storage, and on a different page, the store, the user can spend their currency on items for their SpaceCore it checks if they have enough currency and refuses to sell if they do not. (These values are subtracted from their currency and this is reflected back in the space bar.) There is also an implementation of a cheat checker, if the user clicks more than 100 times in 5 seconds (Something that is not humanly possible) they will get banned and a flag will keep them from accessing any of the websight. There is also a conversion of all numbers so that commas exist for them in the correct locations, making it easier to read. In the SpaceBar it slowly removes the bars as the number gets larger. The .js files force players back to the login padge if they do not have a userName and userPass. There are also other things I have done on the side that may not count as logic, so I will not be listing them.

## Service deliverable

For this deliverable I created an HTTP service to host my frontend and provide backend endpoints. I also have axed the store functionality after talking to the professor, there is not enough time in this term for me to implement it.

- **Node.js/Express HTTP service** - Node.js is on the AWS server, and Express was added for this project.
- **Static middleware for frontend** - Express now statically serves up index.html.
- **Calls to third party endpoints** - In accordance with the requierments for a grade I have created a function called: ThisIsRequieredForAGrade(). This function uses the fetch command to display a development related Chuck Norise joke from a third party endpoint.
- **Backend service endpoints** - Utelizing Express' router I have added the following endpoints: /api (acts as the api root) (all other domains will use this as their root, and be a branch off of it), /bucks (gets current bucks), /suspensions (gets current suspension status), /scoreboards (gets current scoreboard), /buck (posts current bucks value), /suspend (posts current suspension status), /scoreboard (posts current scoreboard), /register (acts a place holder for registration).
- **Frontend calls service endpoints** - sbar calls /api/suspended and /api/buck, will call api/bucks when DB is added. ScoreBoard calls api/suspensions and api/scoreboards.

## DB deliverable

For this deliverable I stored and retrieved data from MongoDB with it being tied to a specific user.

- **MongoDB Atlas database created** - startup.b62dkqo.mongodb.net
- **Endpoints for data** - I removed all other endpoints, and added (still under /api): /db, /register, /login, /dbs, /scoreboards. scoreboards endpoint queried MongoDB for high scores, and the rest handel passing data.
- **Stores data in MongoDB** - All data nessessary for the app to function (code aside) is now stored on MongoDB in a JSON.

## Login deliverable

For this deliverable I continued to add user functionality to registration and authentication.

- **User registration** - New accounts are registered when the registration button is pressed, passwards are hashed, and cookies are strict (as well as a few other things).
- **existing user** - Login: If user name exist, then password is rehashed and checked for credibility. Registration, if user already exists user is alert()ed that it is taken.
- **Use MongoDB to store credentials** - All user credientials are stored in JSONs on MongoDB.
- **Restricts functionality** - You cannot access the app unless you login. If account is flaged with suspension than the user's scores are removed from the scoreboard, and their account is locked.

# Important Links

## [Notes](https://github.com/eman0202byu/startup/blob/main/notes.md)
