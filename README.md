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

- **HTML** - Uses correct HTML structure for application. 3 HTML pages. One for login, one for the Space Bar, one for the Score Board/daily space core. Hyperlinks to and from Score Board and Space Bar artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, Space Core's costumes, switching between HTML pages, display other users space bucks, speed limit check, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving pushes
  - submitting current §
  - retrieving Score Board status
- **DB** - Store users, number of pushes per user, user's space core identifier, each space core with an associated identifier.
- **Login** - Register and login users. Credentials securely stored in database. Can't play unless authenticated.
- **WebSocket** - As each user's § increases update values on scoreboard (if in top 10), the top 10 user's scores are shown to all users.
- **React** - Application ported to use the React web framework.

# Important Links

## [Notes](https://github.com/eman0202byu/startup/blob/main/notes.md)
