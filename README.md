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
  format: // a format json to store format
  outputResume: // a single resume obj that will be exported
}
```
**Format**
```javascript
{
  // general
  font: 'Times-Roman',
  margin: 1,
  lineSpacing: 1.15,
  hasDivider: true,
  headingFontSize: 14,
  headingAlignment: 'left',
  subheadingFontSize: 12,
  subheadingAlignment: 'left',
  bodyFontSize: 10,
  bodyAlignment: 'left',
  // header
  nameFontSize: 18,
  nameAlignment: 'center',
  infoFontSize: 12,
  infoAlignment: 'center',
  infoDivider: ' • ',
  // education
  institutionFontStyle: 'bold',
  educationBulletPoint: ' • ',
  // experience
  titleFontStyle: 'italic',
  organizationFontStyle: 'bold',
  experienceBulletPoint: ' • ',
  // skill
  skillTitleStyle: 'bold'
};
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
  location:
  degree:
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
  description: // a string separated by /n
}

```
**SkillSlot:**
```javascript
{
  name: // type of skill, e.g. Coding Language/Software
  list: // array of this skill
}

```
**Header:**
```javascript
{
    name:  
    phone:
    email:
    link:
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
  "workspaces": [
    {
      "$oid": "6559621f2aac7b2763fd45e1"
    }
  ],
  "username": "",
  "salt": "",
  "hash": "",
  "__v": 31,
  "recentWorkspaceId": {
    "$oid": "a workspace id"
  }
}
```

**An Example Workspace:**
```javascript
{
  "name": "Cheng Pan",
  "description": "123123",
  "dateOfCreation": {
    "$date": "2023-11-19T01:17:19.689Z"
  },
  "materials": [],
  "format": {
    "font": "Times-Roman",
    "margin": 1,
    "lineSpacing": 1.15,
    "hasDivider": true,
    "headingFontSize": 14,
    "headingAlignment": "left",
    "subheadingFontSize": 12,
    "subheadingAlignment": "left",
    "bodyFontSize": 10,
    "bodyAlignment": "left",
    "nameFontSize": 18,
    "nameAlignment": "left",
    "infoFontSize": 12,
    "infoAlignment": "left",
    "infoDivider": " • ",
    "institutionFontStyle": "bold",
    "educationBulletPoint": " • ",
    "titleFontStyle": "italic",
    "organizationFontStyle": "bold",
    "experienceBulletPoint": " - ",
    "skillTitleStyle": "bold",
    "_id": {
      "$oid": "6559621f2aac7b2763fd45e2"
    }
  },
  "outputResume": {
    "$oid": "6559621f2aac7b2763fd45e0"
  },
  "__v": 0
}
```

**An Example Resume:**
```javascript
{
  "header": [
    {
      "name": "Cheng Pan",
      "phone": "9178033848",
      "email": "p1067838263@gmail.com",
      "link": "github.com/DrPeachy",
      "_id": {
        "$oid": "65596b10933182f8d193d7fa"
      }
    }
  ],
  "educations": [
    {
      "institution": "New York University",
      "location": "New York, NY",
      "degree": "Bachelor",
      "major": "Computer Science",
      "minor": "dd",
      "gpa": "3.783",
      "duration": {
        "startDate": {
          "$date": "2023-12-31T00:00:00.000Z"
        },
        "endDate": {
          "$date": "2023-12-31T00:00:00.000Z"
        },
        "_id": {
          "$oid": "65597d456aeb2eaa72f95442"
        }
      },
      "_id": {
        "$oid": "65597d456aeb2eaa72f95441"
      }
    }
  ],
  "experiences": [
    {
      "title": "Client Development Intern",
      "type": "Working",
      "organization": "Yorha",
      "location": "Shanghai",
      "duration": {
        "startDate": {
          "$date": "2023-11-24T00:00:00.000Z"
        },
        "endDate": {
          "$date": "2023-12-31T00:00:00.000Z"
        },
        "_id": {
          "$oid": "6559647a2aac7b2763fd4731"
        }
      },
      "description": "1. a\n2. b\n3. cf\n4. d",
      "_id": {
        "$oid": "6559647a2aac7b2763fd4730"
      }
    },
    {
      "title": "Client Development Intern",
      "type": "Working",
      "organization": "aaaaa",
      "location": "New York, NY",
      "duration": {
        "startDate": null,
        "endDate": null,
        "_id": {
          "$oid": "65599a547c7015d75522e94a"
        }
      },
      "description": "",
      "_id": {
        "$oid": "65599a547c7015d75522e949"
      }
    }
  ],
  "skills": [
    {
      "name": "Software",
      "list": "Maya, Photoshop, Zbrush, VSCode, Unity3D",
      "_id": {
        "$oid": "65597c356aeb2eaa72f95351"
      }
    },
    {
      "name": "Coding Languate",
      "list": "C/C#/C++, Python, Lua, Javascript, HTML, CSS",
      "_id": {
        "$oid": "65597c356aeb2eaa72f95352"
      }
    }
  ],
  "__v": 46
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


