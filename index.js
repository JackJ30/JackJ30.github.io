import content from "./content.json" assert {type: 'json'};
var shownArticles = [];

showArticles();

function showArticles()
{
    for (let i = 0; i < content["active-pages"].length; i++)
    {
        let obj = content["active-pages"][i];

        let clone = document.getElementById("template-article").cloneNode( true );
        switch (obj.type) {
            case "programming":
                document.getElementById("programming-articles").appendChild(clone);

                break;
            case "graphics":
                document.getElementById("graphics-articles").appendChild(clone);

                break;
        }

        clone.style.display = "block";
        clone.id = "article" + i.toString();

        clone.childNodes[1].childNodes[1].textContent = obj.date;
        clone.childNodes[1].childNodes[3].textContent = obj.title;
        clone.childNodes[5].textContent = obj.description;
        console.log(clone.childNodes[3].);
    }
}