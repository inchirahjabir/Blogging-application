
# Blogging application - ECE Webtech project

### Introduction
This is a travel blog website with a home page, about us page, contact us page and login/logout option. After they login the user can view their profile directly after logging in or by clicking on the icon in the header. They can also create a new post that will be saved in the SUpabase database. For now, the user can only login by creating a username and password as Github Oauth only worked once in my project. I had to choose between implementing Github and accessing the Supabase database for my website because of some problems with ports that I couldn't solve. The website also offers a dark/light theme. 

### Installation and Usage

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

### Usage

- The website is accessible on : http://localhost:3000

- The Supabase database is accessible on : http://localhost:54323

## Deliverables 

- Vercel URL: *place your URL*
- Supabase project URL: *place your URL*

## Authors

- Inchirah Jabir, MSc DMIA (SI gr02)

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
  * Task feedback: It was okay, I tried my best to respect the conventianal commits
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
  * Grade: 1
  * Comments: Github worked once but i had to change the supabase url to access the database and i lost the Github Oauth. The problem is that I couldn't figureout what urls to use with my new supabase url. 
  * Task feedback: I tried so hard to do this task but I couldn't. The rest of my project was tested using a regular sign up
* **Post creation and display**
  * Grade: 6
  * Comments: I created a new class to create posts and I modified the display in the articles page based on the creation date. I also used React for pagination.
  * Task feedback: It was time consuming and I was not familiar with React pagination so I had to install and do some research on it.
* **Comment creation and display**
  * Grade: 4
  * Comments: I created a new database comments that i linked to the articles database. I then linked the databases through a foreign key and was able to fetch datab and insert data.
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
  * Grade: 2
  * Comments: I tried to use RLS of Supabase to prevent access to some data depending on the user but it wouldn't allow me to access/insert the data at all so I disabled RLS for some tables. I ensured that users won't be able to access it in my code though by implementing restrictions to check if the user is authenticated or if the user is the same as the author to remove/edit posts. 
  * Task feedback: It was hard, I tried for a long time to make the RLS policies work but even though the user was authenticated, the tables couldn't be accessed/modified even though I allowed it in my policy.
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

## Miscellaneous

SInce I couldn't figure out what url address to use for the callback what env variables to change, I couldn't successfully implement both Github Oauth and access to the Supabase database. At first, I used http://localhost:8000 for the supabase url and http://localhost:8000/v1/auth/callback for the redirect url and Github Oauth worked fine. However, I couldn't access the database so I had to change my supabase url to http://localhost:54321 to access thedatabase and I tried to use http://localhost:54321/v1/auth/callback to implement Oauth but it kep giving me error messages. 

### Course Feedback

I enjoyed the course, I learned a lot especially because I was not used to developing a website using these specific technologies. It was a little hard because I had some problems with my computer and I found the tasks for the final project a little harder then what we've done in the labs. This project was hard for me because there was no communication with my group. I also lost all my labs and commits because my group delete all the branches along with the commits so it was hard for me to create this new repository with my final project. As there was no communication with my group, we had to split and I am submitting my final project alone. 

### Project Reuse

- [x] We authorize the professors to use our project as an example for the next year students (facultative).