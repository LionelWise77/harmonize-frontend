## Harmonize Daily Planner - Frontend

### **Project Description**

The frontend of the Harmonize Daily Planner is a React application designed to provide an intuitive user interface for managing daily tasks. It communicates with the backend API for data handling.

---

## Table of Contents

1. [Features](#features)
2. [Visual Overview](#visual-overview)
3. [Technologies Used](#technologies-used)
4. [Contributing](#contributing)
5. [Testing](#testing)
6. [Unfixed Bugs](#unfixed-bugs)
7. [Deployment](#deployment)
8. [Credits](#credits)
9. [Content](#content)
10. [Media](#media)

### **Features**

1. User Authentication:
   - Login, Logout, Registration.
2. Task Management:
   - View tasks.
   - Create, Edit, and Delete tasks.
3. Responsive Design:
   - Optimized for desktop and mobile.

---

## Visual Overview

### Header

![Header](/assets/images/harmonize-header.png)

- The header displays the name of the **Harmonize** task management application, using the primary color scheme for consistency.
- This section enables users to navigate seamlessly between pages across all devices, without relying on the browser's 'back' button.

### Landing Page (Hero Section)

![Hero](/assets/images/harmonize-hero.png)

- The landing page features an inspirational background image with an overlay of motivational text to immediately engage the user.
- This section invites users to take control of their tasks and improve their productivity in a visually appealing way.

---

### Benefits Section

![Benefits](/assets/images/harmonize-benefits.png)

- This section highlights the benefits of using **Harmonize**, such as improved productivity, better task organization, and reduced stress by staying on top of deadlines.
- The benefits are designed to resonate with users looking for a streamlined task management solution.

---

### **Technologies Used**

- **React**: Frontend framework.
- **React Bootstrap**: UI components.
- **Axios**: HTTP client for API communication.
- **React Router**: Routing.

---

### **Setup Instructions**

#### **1. Clone the Repository**

```bash
git clone <repository_url>
cd frontend
```

## Install Dependencies

- npm install

## Configure Axios Base URL

- In src/api/axiosDefaults.js, set the correct backend URL:
  axios.defaults.baseURL = "<backend_url>";
  axios.defaults.withCredentials = true;

  ## Run the development Server

  - npm start

## Available Routes

### Public Routes

- / - Home (Hero Section).
- /signin - Sign In.
- /signup - Sign Up.

### Protected Routes

- /tasks - View Tasks.
- /tasks/create - Create New Task

## Testing

![home](/assets/css/images/lighthouse%20resubmited.png)

- well this webside was my first and take more time, i guest is not a bad puntuation but i can make better next time.

![about](/assets/css/images/about%20screen.png)

- im very satisfied with the result obtein with the others two sides, i was excited and very proud of.

![Sign up](/assets/css/images/signup%20screen%20test.png)

- i have problem and bugs with the media quarie but could solved in the last moment

### Validator Testing

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Flionelwise77.github.io%2FPP1-The-Alchemist-Cave%2F)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Flionelwise77.github.io%2FPP1-The-Alchemist-Cave%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

### Unfixed Bugs

## all bugs were fixed , i have trouble with some CSS bugs but at the end everything is running well.

## Deployment

The live link can be found here - https://github.com/LionelWise77/PP1-The-Alchemist-Cave/deployments

## Credits

i share my Credits , wiht my Mentor Dick, the tutors from Code Institute and some classmates in slack.

### Content

- The text for the Home page was taken from Wikipedia Article Breatwork
- Instructions on how to implement Breathwork techniques [Specific YouTube channel](https://www.youtube.com/@BreatheWithSandy)
- The icons in the footer were taken from [Font Awesome](https://fontawesome.com/)

### Media

- The photos used on the home and sign up page are from [photos source](https://www.pexels.com/search/natural/)
