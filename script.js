
let topic = document.createElement("h1");
topic.setAttribute("id","topic");
topic.innerText="Nationality Search";
document.body.append(topic);


let formcontainer = document.createElement("form");
formcontainer.setAttribute('id',"main-container");
document.body.append(formcontainer);

let formgrpdiv = document.createElement("div");
formgrpdiv.setAttribute('class',"form-group row");
formcontainer.append(formgrpdiv);

let col1 = document.createElement("div");
col1.setAttribute('class',"col-sm-3");
formgrpdiv.append(col1);

let label = document.createElement("label");
label.setAttribute('for',"namefield");
label.setAttribute('id',"namelabel");
label.setAttribute('class',"col-form-label");
label.innerHTML ="Name:";
col1.append(label);



let col2 = document.createElement("div");
col2.setAttribute('class',"col-sm");
formgrpdiv.append(col2);

let inputfield = document.createElement("input");
inputfield.setAttribute("type","text");
inputfield.setAttribute("id","namefield");
inputfield.setAttribute('class',"form-control");
inputfield.setAttribute("placeholder","Enter the Name");
inputfield.required = true;
col2.append(inputfield);

let buttonrow = document.createElement("div");
buttonrow.setAttribute('class',"row justify-content-center");
formcontainer.append(buttonrow);

let buttoncolmn = document.createElement("div");
buttoncolmn.setAttribute('class',"col-sm-offset-6 col-sm-6");
buttonrow.append(buttoncolmn);

let button = document.createElement("button");
button.innerText ="search";
button.setAttribute("onclick","search()");
button.setAttribute("class","btn btn-info");
button.setAttribute('type',"button");
buttoncolmn.append(button);

let divelement = document.createElement("div");
divelement.setAttribute("id","result-container")
document.body.append(divelement);

async function search ()
{   
    button.disabled=true;
    button.style.color="grey";
    //divelement.innerHTML="<i class='fas fa-spinner'></i>";
    divelement.innerHTML="<i class='fas fa-expand'></i>";
    let initialdeg=0;
    let content='';
    let loadingimage=setInterval( () => { initialdeg+=45;document.querySelector("i").style.transform = 'rotate('+initialdeg%360 +'deg)'},100);
    
    let name = document.getElementById("namefield").value;

    if(name==='')
    {
        window.alert("please fill the name to search for the nationality");
    }
    else if (name.match(/^[A-Za-z]+$/))
    {
    let match= await FindNationality(name.toLowerCase());
    if (match === null)
        {
            console.log("...............issue occured.........");
            content="<h3>Issue occurred..Please try again!</h3>";
        }
    else
        { 
            console.log(match.country);
            if ( match.country.length ==0)
                {
                    content="<h1>No results for the provided name "+name+"</h1>";
                }
             else if ( match.country.length < 2)
                {   
                    content = `<h3>${name}is a citizen of only one country</h3><table>
                                           <tr><th>country</th><th>Probability</th></tr>
                                            <tr>
                                            <td>${match.country[0]["country_id"]}</td>
                                            <td>${match.country[0]["probability"]}</td>
                                            </tr></table>`;
                }
            else
            {
                content = `<h3>Top 2 search countries to which ${name} is a citizen!</h3><table><tr><th>country</th><th>Probability</th></tr>`;
                for ( let i =0;i<2;i++)
                {
                    content +=`<tr>
                <td>${match.country[i]["country_id"]}</td>
                <td>${match.country[i]["probability"]}</td>
                </tr>`;
                }
                content +="</table>";
            }

        }
    }
    else
    {   document.getElementById("namefield").value='';
        alert("Please type a valid name!");
        
    }
    divelement.innerHTML =content;
    button.disabled=false;
    button.style.color= "black";
    clearInterval(loadingimage);
    document.querySelector("#namefield").value='';
}
async function FindNationality(name)
{   try{
    let responseData = await fetch("https://api.nationalize.io/?name="+name);
    let dataInJSON =await responseData.json();
    console.log(dataInJSON);
    return dataInJSON;
}   
    catch(error)
    {
        console.log(error);
        return null;
    }
}
