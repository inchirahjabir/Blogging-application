
# Blogging application - ECE Webtech project

### Introduction

This ECE Webtech project is a travel blog that combines functionality and immersive storytelling. Within this blog, I've designed a home page as the portal to an "Articles" sections where users can find posts related to travel, an "About Us" section where the user can learn more about me, a "Contact Us" feature, and a user-friendly login/logout option that uses Github OAuth or email sign up/sign in. Post-login, users transition to their profiles. After they login the user can view their profile directly after logging in or by clicking on the icon in the header. They can also create a new post that will be saved in the SUpabase database.

This application's purpose lies in the ability for users to effortlessly create and share their travel stories, tips, guides that will be stored in the Supabase database. Beyond articles, users can choose between a visually soothing dark or light theme, ensuring a personalized browsing experience.

### Local Installation and Usage

- Clone this repository and go to the directory:
 ```bash
https://github.com/inchirahjabir/ece-webtech-2023-fall-Jabir.git
```

```bash
cd ece-webtech-2023-fall-Jabir/app
```

- Install dependencies:
```bash
npm install
```

- Start the application:
```bash
npm run build
npm start
```

### Local Usage

- The website is accessible on : http://localhost:3000
 
- The Supabase local database is accessible at : http://localhost:54321

## Deliverables 

- Vercel URL: https://vercel.com/inchirahs-projects/ece-webtech-2023-fall-jabir-grp02
- Supabase project URL: https://supabase.com/dashboard/project/sswzjvzqjynlywxjbplh

## Authors

- Inchirah Jabir, MSc DMIA (ING4 SI gr02)

## Evaluation

### Mandatory Tasks

* **Naming convention**
  * Grade: 2
  * Comments: I followed the naming convention
  * Task feedback: Easy
* **Project structure**
  * Grade: 2
  * Comments: I divided the project into folders and did my best to organize it well
  * Task feedback: Easy
* **Git usage**
  * Grade: 2
  * Comments: I lost all my previsous commits because I just created this repository and I am doing my project solo so I only have the commits for my project files
  * Task feedback: It was okay, I tried my best to respect the conventional commits
* **Code quality**
  * Grade: 4
  * Comments: I added comments to explain my code and tried my best to make it straightforward.
  * Task feedback: It was okay
* **Design, UX, and content**
  * Grade: 4
  * Comments: I added some pictures for certain pages and followed a specific color plalette for the website
  * Task feedback: I think the website's design is cohesive and looks pretty goodbut it was long and time consuming
* **Home page**
  * Grade: 2
  * Comments: I created a home page that displays all the information and has links to all the pages
  * Task feedback: It was easy
* **Navigation**
  * Grade: 2
  * Comments: I created a header component that I used for all the pages.
  * Task feedback: It was easy
* **Login and profile page**
  * Grade: 4
  * Comments: Github Oauth works fine on Vercel and it shows the user's information by fetching data from the Users Authentication table.
  * Task feedback: I tried with a lot of links to make it work on Vercel and there were some things that I couldn't understand but it works well now.
* **Post creation and display**
  * Grade: 4
  * Comments: I created a new class to create posts and I modified the display in the articles page based on the creation date. I also used React for pagination. The class worked fine using npm run dev but I can't create posts on Vercel. Whenever, I hit the submit button, nothing is submitted. The same thing happened for the pagination, it showed regular number using npm run dev but it has a different input on Vercel.
  * Task feedback: It was time consuming because I kept trying to understand why the results were so different uwhen i used npm run dev but I couldn't understand why.
* **Comment creation and display**
  * Grade: 4
  * Comments: I created a new database comments that I linked to the articles database. I then linked the databases through a foreign key and was able to fetch datab and insert data.
  * Task feedback: It wasn't really hard, I just forgot to add RLS polocies so I couldn't see or insert comments at first
* **Post modification and removal**
  * Grade: 4
  * Comments: I created functions for editing and removal
  * Task feedback: This was harder than expected. I had to write a lot of code and I put everything in one file because I had a lot of bugs.
* **Search**
  * Grade: 6
  * Comments: I used the Supabase database search function and filtered the results
  * Task feedback: It took me some time to display the articles and to have a fully functional search
* **Use an external API**
  * Grade: 2
  * Comments: I implemented Unsplash API in the [slug].js file to generate random images for each article
  * Task feedback: I am not familiar with this type of API so it took me some time to understand it but it wasn't really hard.
* **Resource access control**
  * Grade: 4
  * Comments: I used RLS of Supabase to prevent access to some data depending on the user. I also ensured that users won't be able to access some information in my code  by implementing restrictions to check if the user is authenticated or if the user is the same as the author to remove/edit posts. 
  * Task feedback: It was hard, I tried for a long time to make the RLS policies work but sometimes even though the user was authenticated, the tables couldn't be accessed/modified even though I allowed it in my policy.
* **Account settings**
  * Grade: 2
  * Comments: The account settings are accessible from the user's profile page. Since the user's data is in authentication, the profile page only displays the user's email. I created a form where the user could modify their information but I am not directly allowed to madify authentication related information.
  * Task feedback: This task was hard because I couldn't add columns to the authentication or modify them.
* **WYSIWYG integration**
  * Grade: 0
  * Comments: I tried to use React quill but I kept getting errors even when I imported it
  * Task feedback: This task kept giving errors so I couldn't do it
* **Gravatar integration**
  * Grade: 2
  * Comments: I imported the package and implemented Gravatar next to the comment section
  * Task feedback: It wasn't really hard, I just needed to understand how Gravatar works
* **Light/dark mode**
  * Grade: 2
  * Comments: I switched between light and dark themes using Tailwind CSS and adjusted the colors wccording to the theme.
  * Task feedback: I though this task was easy but it required modifying a few files since i didn't necessaraly want to change the background

### Bonus Tasks

* ***Add Likes***   
  * Grade: 2
  * Comments: I added a likes colums for posts and imported the FontAwesome library to add the like icon to make the feature look better.  

### Course Feedback

I enjoyed the course, I learned a lot especially because I was not used to developing a website using these specific technologies. It was a little hard because I had some problems with my computer and I found the tasks for the final project a little harder then what we've done in the labs. This project was hard for me because there was no communication with my group. I also lost all my labs and commits because my group delete all the branches along with the commits so it was hard for me to create this new repository with my final project. As there was no communication with my group, we had to split and I am submitting my final project alone. 

### Project Reuse

- [x] We authorize the professors to use our project as an example for the next year students (facultative).
