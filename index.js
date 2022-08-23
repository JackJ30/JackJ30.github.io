import content from "./content.json" assert {type: 'json'};
var shownArticles = [];

addEventListeners();

function addEventListeners()
{
    document.getElementById("next-button").addEventListener("click", selectInterests);
}

function selectInterests()
{
    var landingPage = document.getElementById("landing-page");
    landingPage.style = "opacity: 0;";
    document.getElementById("next-button").removeEventListener("click", selectInterests);
    landingPage.addEventListener("transitionend", function(e) {
        landingPage.style = "display: none;";

        var selectInterestsPage = document.getElementById("select-interests");
        selectInterestsPage.setAttribute('class', "shown")
    })
}

function showArticles()
{
    for (let i = 0; i < content["active-pages"].length; i++)
    {
        let obj = content["active-pages"][i];

        var parent;
        switch (obj.type) {
            case "programming":
                parent = document.getElementById("programming-articles");
                break;
            case "graphics":
                parent = document.getElementById("graphics-articles");
                break;
        }

        var newArticle = document.createElement("article");
        parent.appendChild(newArticle);

        var header = newArticle.appendChild(document.createElement("header"));
        var span = header.appendChild(document.createElement("span"));
        span.className = "date";
        span.textContent = obj.date;
        var titleh2 = header.appendChild(document.createElement("h2"));
        var titleLink = titleh2.appendChild(document.createElement("a"));
        titleLink.href = obj.link;
        titleLink.textContent = obj.title;

        var imageLink = newArticle.appendChild(document.createElement("a"));
        imageLink.href = obj.link;
        imageLink.className = "image fit";
        var image = imageLink.appendChild(document.createElement("img"));
        image.src = obj.image;
        image.alt = "";

        var description = newArticle.appendChild(document.createElement("p"));
        description.textContent = obj.description;

        var specialActions = newArticle.appendChild(document.createElement("ul"));
        specialActions.className = "actions special";
        var viewPageLink = specialActions.appendChild(document.createElement("li")).appendChild(document.createElement("a"));
        viewPageLink.href = obj.link;
        viewPageLink.className = "button";
        viewPageLink.textContent = "View Page";
    }
}