# Resume Saver

## Overview
Preparing a different resume for different purposes is troublesome when you just want to change a specific content or style. Formatting with Microsoft Word is annoying as you need to manually type in every spacing

Resume Maker is a web app that allows users to keep track of and manipulate their resume's content, styling, and layout easily, and to export brand-new resumes in the desired format. They will be able to edit text or upload existing materials for convenience, and the web app can automatically decide the content for a specific space.

## Data Model

The application will have schemas: **Resume, User, Workspace, Experience, Duration, Education, SkillSlot**

* users can have multiple workspaces
* Each workspace have a format, a resume, etc
* each resume can have multiple experiences, education, one header, and multiple skillslots
* for more details, see the example class below

**User:**

```javascript
{
  _id
  username: "employeeFoo",
  salt:
  hash: // a password hash,
  workspaces: // an array of references to List documents
  recentWorkspaceId: // the most recent workspace ID
}
```
**Workspace:**
```javascript
{
  _id
  name: // name of workspace
  description:
  dateOfCreation: //
  materials: // array of material for copyboard
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
  description: // an array of string of description
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
  header: // an array of header(for it an array just ez for implementing)
  educations: // an array of Education
  experiences: // an array of Experience
  skills: // an array of skillslot
}
```

**An Example User:**

```javascript
{
  username: "employeeFoo",
  hash: // a password hash,
  workspaces: 
  [
    0:{
      name: // name of workspace
      materials: 
      [
        "NYU School of Engineering",
        "Computer Science",
        "B.S.",
        ...
      ]
      outputResume: {
          header:[
            0:{
              name: "employeeFoo",
              phone: "123-4567-8910",
              links: ["123@github.com"],
              email: "123@nyu.edu"
            }
          ]
          experiences: 
          [
            0:{
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
            1:{...},
            2:{...}
          ]
          skills: 
          [
            0：{ name: "Coding Language", list: ["C++", "Python", "Javascript"]},
            1：{ name: "Software", list: ["VSCode", "Photoshop", "Sourcetree"]}
          ]
          
      }
    },
    1:{...}, // workspace#2
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
4. as a user, I can either 1. upload existed resume into workspace for content extraction, or 2. directly add content to resume editor
5. as a user, I can preview the resume pdf in the preview tab in almost realtime
6. as a user, I can edit resume format in the Inspector panel
7. as a user, I can export resume in desired format and style after finishing

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
  * for Configuration Management including: 
    1. URL config(host+port) for both ends in either production or development,
    2. Database URL in either production or development,
    3. Authentication Secret 
  * so that the DB URL won't be exposed
* (1 points) React-Router-DOM
  * for frontend SPA routing, state passing, and etc
  * in order to cooperate with the react component
  * 1 point as it is easy to learn
* (1 point) axios (new added)
  * for frontend AJAX handling
  * easy to use, 1 point 
* (5 points) NLP.js
  * for natural language processing
  * external lib that is used to recognize content and fit them into schema class(since I am not good at AI or ML stuff, this might be challenging for me)
  * e.g. after the user uploads a PDF resume, I will extract its content and use NLP to fit them inside different sections
* (3 points) PDF.js
  * library for pdf content extraction
  * external lib that is used to extract the content of PDF, which should not be very hard to use
  * so 3 points assigned
* (3 points) PDFkit (new added)
  * library for pdf forming
  * external lib that is used to form a pdf file from the backend with info resume data, which should not be very hard to use
  * so 3 points assigned



24 points total out of 10 required points (addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](./backend/src/app.mjs) 
[backend](./backend/src/app.mjs)
[frontend](./frontend/src/App.js)

## Annotations / References Used

1. [Resume Guide & Samples from NYU](https://docs.google.com/document/d/1XTGT4QmCwtRcgVhbKvQVajm_YA3MMo5uGsR_PqRAZqo/edit#heading=h.u8r00mk3z5ab)
2. [Material UI Wiki](https://mui.com/material-ui/getting-started/)
3. [PDF.js](https://stackoverflow.com/questions/1554280/how-to-extract-text-from-a-pdf-in-javascript)
4. [React Wiki](https://react.dev/learn)
5. [NLP.js](https://github.com/axa-group/nlp.js/blob/master/docs/v3/README.md)
6. [PDFkit](https://pdfkit.org/docs/getting_started.html)


