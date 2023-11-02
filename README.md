# Resume Saver

## Overview
Preparing difference resume for difference purpose is troublesome when you just want to change a specific content or style. Formating with Microsoft Word is annoying as you need to manually type in every spacing

Resume Maker is a webapp allow users to keep track and manipulate their resume's content, styling, layout easily, and to export brand new resume in desired format. They will be able to editing text or upload existed materials for convenience, and the web app can automatically decide the content for specific space.

## Data Model

The application will **Resume, User, Workspace, Experience, Duration, Education, SkillSlot**

* users can have multiple workspaces
* Each workspace can have at most three resumes uploaded
* each resume can have multiple experiences
* for more details, see the example class below

**User:**

```javascript
{
  username: "employeeFoo",
  hash: // a password hash,
  workspaces: // an array of references to List documents
}
```
**Workspace:**
```javascript
{
  name: // name of workspace
  uploadedResumes: // an array of resume obj
  outputResume: // a single resume obj that will be exported
}
```
**Duration:**
```javascript
{
  startDate: 
  endDate:
}
```
**Education:**
```javascript
{
  institution: // string for institution
  duration: // a duration obj
  gpa: // gpa
  major: // major
  minor: // minor
  duration: // a duration obj
}

```
**Experience:**
```javascript
{
  title: // string for the name of experience, e.g. Software Enginnering Intern
  type: // working/research/volunteer
  organization: 
  location: // string for location
  duration: // a duration obj
  descriptions: // an array of string of description
}

```
**SkillSlot:**
```javascript
{
  name: // type of skill, e.g. Coding Language/Software
  list: // array of this skill
}

```
**Resume:**
```javascript
{
  name: "employeeFoo",
  phone: "123-4567-8910"
  email: // email
  links: // an array of links(personal website)
  educations: // an array of Education
  experiences: // an array of Experience
  skills: // an array of skill
}
```

**An Example User:**

```javascript
{
  username: "employeeFoo",
  hash: // a password hash,
  workspaces: 
  [
    {
      name: // name of workspace
      uploadedResumes: 
      [
        {...}, // uploaded resume#1
        {...}, // uploaded resume#2
        {...} // uploaded resume#3
      ]
      outputResume: {
          name: "employeeFoo",
          phone: "123-4567-8910",
          links: ["123@github.com"],
          email: "123@nyu.edu"
          experiences: 
          [
            {
              title: "Software Engineering Intern",
              type: "working",
              organization: "Amazon",
              location: "US",
              duration: 
              {
                startDate: "May 2021",
                endDate: "Sep 2021"
              }
            },
            {...},
            {...}
          ]
          skills: 
          [
            { name: "Coding Language", list: ["C++", "Python", "Javascript"]},
            { name: "Software", list: ["VSCode", "Photoshop", "Sourcetree"]}
          ]
          
      }
    },
    {...}, // workspace#2
    ...
  ]
    
  
}
```


## [Link to Commented First Draft Schema](./backend/src/models/) 


## Wireframes

[wireframe pdf](./documentation/467resume%20saver.pdf)

## Site map

[sitemap](./documentation/sitemap.png)

## User Stories or Use Cases


1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new workspace
4. as a user, I can either 1. upload existed resume into workspace for content extraction, or 2. directly add content to workspace
5. as a user, I can export resume in desired format and style after finishing

## Research Topics

* (6 points) React.js
  * use React.js as the frontend framework
  * use it to create dynamic frontend interaction
  * 6 points as indicated in the handout
* (2 points) Material UI
  * use Material UI as the CSS framework
  * instead of Bootstrap, I am willing to learn MUI for the finest look as it has more freedom for customization compared to Bootstrap
  * 2 points as indicated in the handout
  * it will include the front-end form validation
* (3 points) dotenv
  * for Configuration Management
  * so that the DB URL won't be exposed
* (1 points) React-Router-DOM
  * for frontend routing
  * in order to cooperate with the react component
  * 1 point as it is easy to learn
* (5 points) NLP.js
  * for natural language processing
  * external lib that is used to recognize content and fit them into schema class(since I am not good at AI or ML stuff, this might be challenging for me)
  * e.g. after the user uploads a PDF resume, I will extract its content and use NLP to fit them inside different sections
* (3 points) PDF.js
  * library for pdf content extraction
  * external lib that is used to extract the content of PDF, which should not be very hard to use
  * so 3 points assigned



20 points total out of 10 required points (addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](./backend/src/app.mjs) 
[backend](./backend/src/app.mjs)
[frontend](./frontend/src/App.js)

## Annotations / References Used

1. [Resume Guide & Samples from NYU](https://docs.google.com/document/d/1XTGT4QmCwtRcgVhbKvQVajm_YA3MMo5uGsR_PqRAZqo/edit#heading=h.u8r00mk3z5ab)
2. [Material UI Wiki](https://mui.com/material-ui/getting-started/)
3. [PDF.js](https://stackoverflow.com/questions/1554280/how-to-extract-text-from-a-pdf-in-javascript)
4. [React Wiki](https://react.dev/learn)
5. [NLP.js](https://github.com/axa-group/nlp.js/blob/master/docs/v3/README.md)


