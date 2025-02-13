# **Harmonize Calendar** 📅🔱

# <img src="../harmonize-frontend/src/assets/images/logo-tridente2.png" alt="Harmonize Logo" width="100px"/>

Welcome to **Harmonize Calendar**, an application designed to help you **organize tasks, manage habits, and stay productive** while maintaining balance. Inspired by the concept of **harmony**, Harmonize allows you to plan, prioritize, and visualize your workload efficiently.

---

## 📌 **Table of Contents**

1. [Features](#features)
2. [Design Process](#design-process)
   - [Wireframes](#wireframes)
   - [Diagram](#diagram)
   - [Mockups](#mockups)
3. [Key Sections](#key-sections)
   - [Header](#header)
   - [Task Management](#task-management)
   - [Interactive Calendar](#interactive-calendar)
   - [Footer](#footer)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Credits and Acknowledgments](#credits-and-acknowledgments)

---

## 🚀 **Features**

- **Navigation Bar**: Clean layout with links to tasks, calendar, user profiles, login, and logout.
- **Task Management**: Create, categorize, and prioritize tasks with deadlines and status updates.
- **Interactive Calendar**: View tasks, deadlines, and events in an easy-to-navigate calendar.
- **User Authentication**: Secure login, registration, and profile management.
- **Progress Tracking**: Mark completed tasks and analyze productivity trends.

---

## 🎨 **Design Process**

### 📌 **Wireframes**

Wireframes were created to define the application’s layout and structure.

#### Home Page

![Wireframe Harmonize Calender](../harmonize-frontend/src/assets/images/WireframeDefinitive.png)

### 🎨 **Diagram **

![Diagram Harmonize Calender](../harmonize-frontend/src/assets/images/Diagram-Flow.webp)

### 🎨 **Mockups**

High-fidelity mockups visualize the final design:  
![Harmonize Mockup](../harmonize-frontend/src/assets/images/WireframeDefinitive.png)

---

## 🏗️ **Key Sections**

### 🔝 **Header**

The **Harmonize Calendar** header includes easy navigation links and a **dynamic welcome message**.

- **Logged-Out View**:  
  ![Header Logout](../harmonize-frontend/src/assets/images/HeaderJS.png)

- **Logged-In View**:  
  ![Header Login](../harmonize-frontend/src/assets/images/HeaderAuthJS.png)

---

### ✅ **Land Page (Home)**

![Land Page](../harmonize-frontend/src/assets/images/land-page.png)

---

### ✅ **Sign in**

Login Side.  
![Task Manager](../harmonize-frontend/src/assets/images/loginForm.png)

---

### ✅ **Sign Up**

Register Side.  
![Task Manager](../harmonize-frontend/src/assets/images/RegisterForm.png)

---

### ✅ **Task Management**

Organize and prioritize tasks efficiently.  
![Task Manager](../harmonize-frontend/src/assets/images/task-manager.png)

---

### 📆 **Interactive Calendar**

View and manage tasks with a **drag-and-drop** calendar.  
![Calendar](../harmonize-frontend/src/assets/images/interactivecalender.png)

---

### ✅ **Crud**

Create Task Button
![Create](../harmonize-frontend/src/assets/images/CreateTask.png)

Here Users are allow to Delete or Update Task
![Delete,Update](../harmonize-frontend/src/assets/images/CRUD-form.png)

---

### 📌 **Footer**

The footer includes **social media links and developer credits**.  
![Footer](../harmonize-frontend/src/assets/images/footer.png)

---

## 🧪 **Testing**

### 📱 **Responsiveness**

The application was tested across various devices for compatibility.

### 📊 **Performance Metrics**

- **Performance**: 98%
- **Accessibility**: 100%
- **Best Practices**: 100%
- **SEO**: 95%

![Lighthouse Testing]()

### ✅ **Validator Testing**

- **HTML**: Passed W3C validation.
- No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fyutorispa-4e43a431e62f.herokuapp.com%2F)
- **CSS**: Passed Jigsaw validation.
- No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fyutorispa-4e43a431e62f.herokuapp.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
- **JavaScript**: Passed JSHint validation (minor warnings addressed).
- No errors were found when passing through the official [Jshint validator](https://jshint.com/)
  **Metrics** - The following metrics were returned: - There are 2 functions in this file. - Function with the largest signature take 1 arguments, while the median is 1. - Largest function has 2 statements in it, while the median is 1.5. - The most complex function has a cyclomatic complexity value of 1 while the median is 1.
  - **One warning**
    - 'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').

---

## 🛠️ **Performance Improvements**

### Diagnostics

- **Largest Contentful Paint element**: 4,930 ms
- **Minimize main-thread work**: 3.5 s
- **Preconnect to required origins**: Potential savings of 380 ms
- **Minify JavaScript**: Potential savings of 240 KiB
- **Reduce unused JavaScript**: Potential savings of 312 KiB
- **Page prevented back/forward cache restoration**: 1 failure reason
- **Image elements do not have explicit width and height**
- **Minify CSS**: Potential savings of 11 KiB
- **Serve images in next-gen formats**: Potential savings of 11 KiB
- **Serve static assets with an efficient cache policy**: 3 resources found
- **Eliminate render-blocking resources**: Potential savings of 0 ms
- **Properly size images**: Potential savings of 10 KiB
- **Remove duplicate modules in JavaScript bundles**: Potential savings of 11 KiB
- **Avoid serving legacy JavaScript to modern browsers**: Potential savings of 8 KiB
- **Reduce unused CSS**: Potential savings of 38 KiB
- **Avoid enormous network payloads**: Total size was 4,147 KiB

### Improvements Implemented

- **Minimized main-thread work** by optimizing JavaScript code.
- **Preconnected to required origins** to reduce latency.
- **Minified JavaScript** to reduce file size.
- **Reduced unused JavaScript** to improve load times.
- **Added explicit width and height** to image elements.
- **Minified CSS** to reduce file size.
- **Served images in next-gen formats** like WebP.
- **Configured efficient cache policies** for static assets.
- **Properly sized images** to avoid unnecessary data transfer.
- **Removed duplicate modules** in JavaScript bundles.
- **Avoided serving legacy JavaScript** to modern browsers.
- **Reduced unused CSS** to improve performance.
- **Optimized network payloads** to reduce load times.

---

## 🚀 **Deployment**

Harmonize Calendar is deployed on **Heroku and GitHub**.

### **Deployment Steps**

1. **Create a Heroku Account** at [Heroku](https://www.heroku.com/).
2. **Install Heroku CLI** from [here](https://devcenter.heroku.com/articles/heroku-cli).
3. **Login to Heroku** using `heroku login`.
4. **Create a New Heroku App** using `heroku create harmonize-calendar`.
5. **Set Environment Variables** for `SECRET_KEY` and `DEBUG`.
6. **Deploy the application** using `git push heroku main`.

📌 **Live Application**: [Harmonize Calendar](https://harmonize-calendar.herokuapp.com/)  
📌 **GitHub Repository**: [Harmonize on GitHub](https://github.com/your-repo-link)

---

## 🎨 **Media**

All images used in this project are either **custom-designed** or sourced from [Pexels](https://www.pexels.com/).

- **Productivity Images**: [Pexels](https://www.pexels.com/search/productivity/)
- **Calendar Images**: [Pexels](https://www.pexels.com/search/calendar/)

---

## 🎖 **Credits and Acknowledgments**

- **Developer**: Sebastian Perez B.
- **Frameworks & Tools**: Django, React, Bootstrap, Lighthouse.
- **Inspirations**: Task management systems and productivity methodologies.
- **Special Thanks**: To all contributors and users who provided feedback.

🔱 **Harmonize Calendar – Bringing Balance to Productivity!** 📅
