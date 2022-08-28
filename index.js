import content from "./content.json" assert {type: 'json'};
var shownArticles = [];

addEventListeners();

// Interests --------------------------------------------------
var programmingInterest = false;
var graphicsInterest = false;

function addEventListeners()
{
    document.getElementById("next-button").addEventListener("click", showSelectInterests);
    document.getElementById("programming-interest").addEventListener('change', function() {
        programmingInterest = !programmingInterest;
        onChangeInterests();
    });
    document.getElementById("graphics-interest").addEventListener('change', function() {
        graphicsInterest = !graphicsInterest;
        onChangeInterests();
    });
    document.getElementById("continue-button").addEventListener('click', showContent);
}

function showSelectInterests()
{
    var landingPage = document.getElementById("landing-page");
    landingPage.style = "opacity: 0;";
    document.getElementById("next-button").removeEventListener("click", showSelectInterests);
    landingPage.addEventListener("transitionend", function(e) {
        landingPage.style = "display: none;";

        var selectInterestsPage = document.getElementById("select-interests");
        selectInterestsPage.setAttribute('class', "shown")
    })
}

function onChangeInterests()
{
    document.getElementById("continue-button").setAttribute('class', programmingInterest || graphicsInterest ? "" : "disabled");
}

function showContent()
{
    document.body.style = "overflow-y: scroll";
    document.getElementById("content").style = "display: block";

    document.getElementById("programming-column").style = "display: " + (programmingInterest ? "flex" : "none").toString();
    document.getElementById("graphics-column").style = "display: " + (graphicsInterest ? "flex" : "none").toString();

    showArticles();
}

function showArticles()
{
    for (let i = 0; i < shownArticles.length; i++)
    {
        shownArticles[i].remove();
    }

    for (let i = 0; i < content["active-pages"].length; i++)
    {
        let obj = content["active-pages"][i];
        if(obj.type == "programming" && !programmingInterest) continue;
        if(obj.type == "graphics" && !graphicsInterest) continue;

        var parent;
        switch (obj.type) {
            case "programming":
                parent = document.getElementById("programming-column");
                break;
            case "graphics":
                parent = document.getElementById("graphics-column");
                break;
        }

        var newArticle = document.createElement("article");
        newArticle.className = "post";
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

        shownArticles.push(newArticle);
    }
}