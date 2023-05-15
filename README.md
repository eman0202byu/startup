# Space Salary

## Description deliverable

### Elevator pitch

Have you ever felt cramped? Ever felt like you needed more space? Well now you can, with our new and improved game, Space Salary. This nifty game lets you space out and push your worries away. You can click on the Space Bar and gain space bucks to spend on your space core's new space spunk. This novel interaction will be both relaxing and calming but be careful. If you gain too many space bucks too fast, you will be arrested by the space cops and put in space jail for being in space. Happy spacing out!

### Design

#### Space Bar
![SpaceBar](https://github.com/eman0202byu/startup/blob/main/SpaceBarConcept.PNG)

#### Store
![Store](https://github.com/eman0202byu/startup/blob/main/StoreConcept.PNG)

#### Space Scanner
![Score_Board](https://github.com/eman0202byu/startup/blob/main/ScoreBoardConcept.PNG)

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
- **Application text content** - Fonts are consistent with their uses, the Retro font (ready player 2) is for all links, the blocky font (20XX) is for major headers over sections, the more simple font (protype20XX) is for the items below major headers, and the more flowing font (BableStoneHan) is used for descriptive text. All fonts have a backup font of Times New Roman, and Times if fonts fail to be pulled from server, or are in non english characters.
- **Application images** - The images scale with the size of the screen. The image in the SpaceBar spins (Weee). The images in the tables are centered and have a will always have a white background to ensure clear viewing.

# Important Links

## [Notes](https://github.com/eman0202byu/startup/blob/main/notes.md)
