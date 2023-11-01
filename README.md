# Resume Saver

## Overview
Preparing difference resume for difference purpose is troublesome when you just want to change a specific content or style. Formating with Microsoft Word is annoying as you need to manually type in every spacing

Resume Maker is a webapp allow users to keep track and manipulate their resume's content, styling, layout easily, and to export brand new resume in desired format. They will be able to editing text or upload existed materials for convenience, and the web app can automatically decide the content for specific space.

## Data Model

The application will **Resume, User, Workspace, Experience, Duration, Education, SkillSlot**

* users can have multiple workspace
* each workspace can have at most three resume uploaded
* each resume can have multiple experience
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
* (2 points) Material UI
  * instead of bootstrap, I am willing to learn MUI for the finest look(tho it might be low performanced)
  * I heard it has a steeper learning curve than bootstrap. So, 4 points for it
  * it will include the front-end form validation
* (3 points) dotenv
  * for Configuration Management

* (1 points) React-Router-DOM
  * for frontend routing
* (5 points) NLP.js
  * external lib that used to recognizing content and fit them into schema class(since I am not good at AI or ML stuff, this might be challenging for me)
* (3 points) PDF.js
  * external lib that used to extract the content of PDF, which should be very hard to use



20 points total out of 10 required points (addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](./backend/src/app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [Resume Guide & Samples from NYU](https://docs.google.com/document/d/1XTGT4QmCwtRcgVhbKvQVajm_YA3MMo5uGsR_PqRAZqo/edit#heading=h.u8r00mk3z5ab)
2. [Material UI Wiki](https://mui.com/material-ui/getting-started/)
3. [PDF.js](https://stackoverflow.com/questions/1554280/how-to-extract-text-from-a-pdf-in-javascript)
4. [React Wiki](https://react.dev/learn)
5. [NLP.js](https://github.com/axa-group/nlp.js/blob/master/docs/v3/README.md)


