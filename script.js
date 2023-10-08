const main = document.getElementById("main");
const input = document.getElementById("busqueda");
const API = "https://api.github.com/users/";

const getGithubUser = async (username) => {
  const githubResponse = await fetch(API + username);
  const userData = await githubResponse.json();
  console.log(userData);
  const card = `
    <div class="card">
        <div class="user-info-aside">
            <div class="avatar">
                <img src="${userData.avatar_url}" alt="image" class="avatar">
            </div>
            <div class="user-info">
                <h2>${userData.name}</h2>
                <p class="italic-username">${userData.login}</p>
                <p class="user-bio">${userData.bio ? userData.bio : "No bio"}</p>

                <ul class="info">
                    <li>${userData.followers}<strong>Seguidores</strong></li>
                    <li>${userData.following}<strong>Siguiendo</strong></li>
                </ul>
            </div>
        </div>
       
       <div id="repos"></div>
    </div>
`;
  main.innerHTML = card;
  getRepos(username);
  console.log(userData);
};

getGithubUser("C4lumny");

const formSubmit = (e) => {
  if (input.value != "") {
    getGithubUser(input.value);
  }
  return false;
};

const getRepos = async (username) => {
  const repos = document.getElementById("repos");
  const response = await fetch(API + username + "/repos");
  const data = await response.json();
  console.log(data);
  data.map((item) => {
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = "_blank";
    repos.appendChild(elem);

    if (item.description) {
      const descElem = document.createElement("p");
      descElem.classList.add("repo-desc");
      descElem.innerText = item.description;
      elem.appendChild(descElem);
    }
  });
};

