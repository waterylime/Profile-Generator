
const fs = require('fs');
var createHTML = require('create-html');
const axios = require('axios');
const inquirer = require('inquirer');

inquirer
	.prompt({
		message: 'Enter your GitHub username:',
		name: 'username'
	})
	.then(function({ username }) {
		const queryUrl = `https://api.github.com/users/${username}`;

		axios.get(queryUrl).then(function(res) {
			// console.log(res);

			let location = res.data.location;
      let name = res.data.name;
      
      let company = res.data.company
      let blog = res.data.blog
      let web = res.data.html_url
      let bio = res.data.bio
      let repos = res.data.public_repos
      let followers = res.data.followers
      let stars = res.data.stars
      let following = res.data.following
			var html = createHTML({
        title: 'example',
        script: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        body: `<div class="wrapper">
        <div class="photo-header">
          
           <h1>Hi!</h1>
           <h2>
           My name is ${name}!</h1>
           <h5>${company ? `Currently @ ${company}` : ""}</h5>
           <nav class="links-nav">
              ${
               location
                  ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/${
                    location
                    }"><i class="fas fa-location-arrow"></i> ${
                     location
                    }</a>`
                  : ""
              }
              <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
                web
              }"><i class="fab fa-github-alt"></i> GitHub</a>
              ${
                blog
                  ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
                      blog
                    }"><i class="fas fa-rss"></i> Blog</a>`
                  : ""
              }
           </nav>
        </div>
        <main>
           <div class="container">
           <div class="row">
              <div class="col">
                 <h3>${bio ? `${bio}` : ""}</h3>
              </div>
              </div>
              <div class="row">
              <div class="col">
                 <div class="card">
                   <h3>Public Repositories</h3>
                   <h4>${repos}</h4>
                 </div>
              </div>
               <div class="col">
               <div class="card">
                 <h3>Followers</h3>
                 <h4>${followers}</h4>
               </div>
              </div>
              </div>
              <div class="row">
              <div class="col">
              <div class="card">
                 <h3>GitHub Stars</h3>
                 <h4>${stars}</h4>
                 </div>
              </div>
               <div class="col">
               <div class="card">
                 <h3>Following</h3>
                 <h4>${following}</h4>
                 </div>
              </div>
              </div>
           </div>
        </main>
     </div>`
			});

			fs.writeFile('res.html', html, function(err) {
				if (err) console.log(err);
			});
			console.log(name, location);
		});
	});

