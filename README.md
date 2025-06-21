# Harmonize Calendar 📅🔱

![Harmonize Logo](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/logo-tridente2.png)

Welcome to **Harmonize Calendar**, an application designed to help you **organize tasks, manage habits, and stay productive** while maintaining balance. Inspired by the concept of **harmony**, Harmonize allows you to plan, prioritize, and visualize your workload efficiently.

---

## 📌 Table of Contents

1. [Features](#features)
2. [Agile Workflow](#agile-workflow)
3. [User Stories](#user-stories)
4. [Design Process](#design-process)
5. [Key Sections](#key-sections)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Media](#media)
9. [Credits and Acknowledgments](#credits-and-acknowledgments)

---

## 🚀 Features

- **Navigation Bar**: Clean layout with links to tasks, calendar, login, logout, and user profiles.
- **Task Management**: Create, categorize, and prioritize tasks with deadlines and status.
- **Interactive Calendar**: View tasks in a drag-and-drop calendar.
- **User Authentication**: Secure login, registration, and profile editing.
- **Motivational Quotes**: Displayed on load to enhance user experience.
- **Responsive Design**: Works on mobile, tablet, and desktop.
- **Validation**: Prevents creation of invalid tasks (past dates, missing titles, etc.)

---

## 🧠 Agile Development

This project followed an agile methodology, using **GitHub Projects** to manage tasks and development progress. The board was organized into columns such as:  
📌 To Do, 🛠 In Progress, ✅ Done

Tasks were broken into **epics** and **user stories**, providing a clear structure for development and prioritization. This helped in maintaining focus and achieving consistent delivery throughout the project timeline.

### 🔍 Tools Used

- ✅ GitHub Projects for visual task management
- ✅ Git + GitHub for version control and collaboration
- ✅ Regular commits with descriptive messages to track progress clearly
- ✅ Markdown-based documentation for planning and delivery tracking

## 🧑‍💼 User Stories

1. As a user, I want to register and log in to access my personalized tasks.
2. As a user, I want to create, update, and delete tasks in a simple way.
3. As a user, I want to see a calendar that helps me visualize my daily workload.
4. As a user, I want task priorities to appear with different colors.
5. As a user, I want motivational quotes to help me start the day.
6. As a user, I want to be prevented from creating tasks in the past or with invalid times.
7. As a user, I want a clear and minimal UI that’s easy to navigate.
8. As a user, I want to avoid submitting the same form multiple times rapidly to prevent duplicated data.
9. As a user, I want the date picker to block past dates so I don’t accidentally create outdated tasks.
10. As a user, I want to set a task at 00:00 without the system treating it as invalid.

---

## 🎨 Design Process

### 📌 Wireframes

![Wireframe](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/WireframeDefinitive.png)

### 🧭 Diagram Flow

![Diagram](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/Diagram-Flow.webp)

### 🎨 Mockups

![Mockup](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/land-page.png)

---

## 🏗️ Key Sections

### 🔝 Header

- Logged-out view:  
  ![Header Logout](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/HeaderJS.png)

- Logged-in view:  
  ![Header Login](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/HeaderAuthJS.png)

### 🔐 Auth Pages

- Sign In:  
  ![Login](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/loginForm.png)

- Sign Up:  
  ![Register](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/RegisterForm.png)

### ✅ Task Management

![Task Manager](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/task-manager.png)

### 📆 Interactive Calendar

![Calendar](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/interactivecalender.png)

### ➕ CRUD Operations

- Create Task:  
  ![Create](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/CreateTask.png)

- Update/Delete Task:  
  ![CRUD](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/CRUD-form.png)

### 📎 Footer

![Footer](https://raw.githubusercontent.com/LionelWise77/harmonize-frontend/main/src/assets/images/footer.png)

---

## 🧪 Testing

### 🔍 Manual Testing Table

| Feature                                  | Action                  | Expected Result            | Status               |
| ---------------------------------------- | ----------------------- | -------------------------- | -------------------- |
| Login                                    | Enter valid credentials | Redirect to calendar       | ✅                   |
| Register                                 | Create new user         | Success + Login            | ✅                   |
| Add Task                                 | Submit form             | Task added to list         | ✅                   |
| Add task in the past                     | Submit                  | Rejected                   | ✅                   |
| Add task with end time before start time | Submit                  | Rejected                   | ✅                   |
| Click "Add Task" twice fast              | Submit twice            | Only one task created      | ❌ (fix in progress) |
| Click on date in calendar                | Open modal              | Prefill with selected date | ✅                   |

---

### Validator Testing

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fharmonize-frontend-658a78db4f9b.herokuapp.com%2Ftasks)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Flionelwise77.github.io%2FPP1-The-Alchemist-Cave%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

📌 [Project Board (if public)](https://github.com/LionelWise77/harmonize-frontend/projects)

---

### 📱 **Responsiveness**

The application was tested across various devices for compatibility.

### 📊 **Performance Metrics**

- **Performance**: 98%
- **Accessibility**: 100%
- **Best Practices**: 100%
- **SEO**: 95%

![Lighthouse Testing]()

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

📌 **Live Application**: [Harmonize Calendar](https://harmonize-frontend-658a78db4f9b.herokuapp.com/)  
📌 **GitHub Repository**: [Harmonize on GitHub](https://github.com/LionelWise77/harmonize-frontend)

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
