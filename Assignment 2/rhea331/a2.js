function getNews() {
	var xhr= new XMLHttpRequest();
	var uri= "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/news";
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json; charset=UTF-8")
	xhr.onload= function() {
		var resp = JSON.parse(xhr.responseText)
		articleFormat(resp, "show_news")
	}
	xhr.send(null);
}

function getNotices(){
	var xhr= new XMLHttpRequest();
	var uri= "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/notices";
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json; charset=UTF-8")
	xhr.onload= function() {
		var resp = JSON.parse(xhr.responseText)
		articleFormat(resp, "show_notices")
	}
	xhr.send(null);
}

function getCourses(){
	var xhr= new XMLHttpRequest();
	var uri= "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses";
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json; charset=UTF-8")
	xhr.onload= function() {
		var resp = JSON.parse(xhr.responseText)
		courseFormat(resp.courses.coursePaperSection)
	}
	xhr.send(null);
}

function getPeople(){
	var xhr= new XMLHttpRequest();
	var uri= "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people";
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json; charset=UTF-8")
	xhr.onload= function(){
		var resp = JSON.parse(xhr.responseText)	
		peopleFormat(resp.list)
	}
	xhr.send(null);
}


function courseFormat(coursedata){
	var content = "";
	var version_d = document.getElementById("show_courses");
	for (var i=0;i<coursedata.length; i++){
		var course = coursedata[i];	
		content += "<div id='course'><h3>"+course.subject.courseA+": "+course.title+"</h3>";
		content += "<p>"+course.subject.points+"</p>";
		content += "<p>"+course.description+"</p>";
		if (course.hasOwnProperty("prerequisite")){
			contentPreString=""
			if (Array.isArray(course.prerequisite)){
				for (var j=0; j<course.prerequisite.length;++j){
					contentPreString+=course.prerequisite[j]+"<br>";
				}
			}else{
				contentPreString = course.prerequisite
			}
			content += "<p>"+contentPreString+"</p>";
		}
	content+="</div><br>"
	}
	version_d.innerHTML = content;
}

function peopleFormat(jsondata){
	var tableContent = "";
	for (var i = 0; i<jsondata.length; i++){
		var person = jsondata[i];
		var imageURL = "<img src = 'https://unidirectory.auckland.ac.nz/people/imageraw/no-person/0/small'>"
		if (person.hasOwnProperty("imageId")){
			imageURL = "<img src='https://unidirectory.auckland.ac.nz/people/imageraw/"+person.profileUrl[1]+"/"+person.imageId+"/small'>"
		}
		var personName = person.legalFirstName+" "+person.legalLastName;
		var jobTitle=""
		for (var j = 0; j<person.jobtitles.length; ++j){
			jobTitle += person.jobtitles[j]+"<br>";
		}

		//tableContent += "<tr><td>" + imageURL +"</td><td>"+personName+"</td><td>"+jobTitle+"</td>";
		//contacts
		var email = "<a href = 'mailto:"+person.emailAddresses+"'> &#9993</a>";
		var phoneNo = "";
		if (person.hasOwnProperty("extn")){
			var phoneNoLink = "+64992"+person.extn;
			var phoneNo = "<a href= 'tel:" + phoneNoLink+ "'> &#128379 </a>";
		}
		var UID = person.profileUrl[1];
		var vcard = "<a href = 'http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/vcard?u="+UID+"'>&#127201</a>"
		tableContent+= "<div id='people'>"+imageURL;
		tableContent+= "<p>"+email+" "+phoneNo+ " "+vcard+"</p>";
		tableContent+="<h3>"+personName+"</h3>";
		tableContent+= "<p>"+jobTitle+"</p>";
		tableContent+= "</div><br>"
		//tableContent += "<td>"+email+" "+phoneNo+" "+vcard+"</td>";
		//tableContent+="</tr>\n";
	}
	document.getElementById("show_people").innerHTML = tableContent;
}
function articleFormat(newsjson, elementID){
	var newsContent = "";
	var version_d = document.getElementById(elementID);
	for (var i = 0; i<newsjson.length; i++){
		var news = newsjson[i];
		newsContent += "<div id=article><a id='linktitle' href="+newsjson[i].linkField+">" + newsjson[i].titleField + "</a>";
		newsContent += "<h6>" + (newsjson[i].pubDateField).slice(5,-9) + "</h6>";
		newsContent += "<p>" + newsjson[i].descriptionField + "</p></div><br>"
	}
	version_d.innerHTML= newsContent;
}


//guestbook send
function sendComment(){
	var name = document.getElementById("Name").value
	var comment = document.getElementById("Comment").value
	var xhr= new XMLHttpRequest();
	var uri= "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name="+name;
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")
	xhr.send("\""+comment+"\"")
}





//tab functions
var currentTab = "";
function showTabHome(){
	if(currentTab != "TabHome"){
		currentTab = "TabHome";
		showNoTabs();
		document.getElementById("TabHome").style.backgroundColor = "LightSkyBlue";
		document.getElementById("SectionHome").style.display = "inline";
	}
}
function showTabPeople(){
	if(currentTab != "TabPeople"){
		currentTab = "TabPeople";
		showNoTabs();
		getPeople();
		document.getElementById("TabPeople").style.backgroundColor = "LightSkyBlue";
		document.getElementById("SectionPeople").style.display = "inline";
	}
}
function showTabNews(){
	if(currentTab != "TabNews"){
		currentTab = "TabNews";	
		showNoTabs();
		getNews();
		document.getElementById("TabNews").style.backgroundColor = "LightSkyBlue";
		document.getElementById("SectionNews").style.display = "inline";
	}
}

function showTabNotices(){
		if(currentTab != "TabNotices"){
		currentTab = "TabNotices";	
		showNoTabs();
		getNotices();
		document.getElementById("TabNotices").style.backgroundColor = "LightSkyBlue";
		document.getElementById("SectionNotices").style.display = "inline";
	}
}

function showTabCourses(){
		if(currentTab != "TabCourses"){
		currentTab = "TabCourses";	
		showNoTabs();
		getCourses();
		document.getElementById("TabCourses").style.backgroundColor = "LightSkyBlue";
		document.getElementById("SectionCourses").style.display = "inline";
	}
}

function showTabGuestbook(){
		if(currentTab != "TabGuestbook"){
		currentTab = "TabGuestbook";	
		showNoTabs();
		document.getElementById("TabGuestbook").style.backgroundColor = "LightSkyBlue";
		document.getElementById("SectionGuestbook").style.display = "inline";
	}
}

function showNoTabs(){
	document.getElementById("TabHome").style.backgroundColor = "Lavender";
	document.getElementById("TabNews").style.backgroundColor = "Lavender";
	document.getElementById("TabNotices").style.backgroundColor = "Lavender";
	document.getElementById("TabPeople").style.backgroundColor = "Lavender";
	document.getElementById("TabCourses").style.backgroundColor = "Lavender";
	document.getElementById("TabGuestbook").style.backgroundColor = "Lavender";
	document.getElementById("SectionHome").style.display = "none";
	document.getElementById("SectionNews").style.display = "none";
	document.getElementById("SectionNotices").style.display = "none";
	document.getElementById("SectionPeople").style.display = "none";
	document.getElementById("SectionCourses").style.display = "none";
	document.getElementById("SectionGuestbook").style.display = "none";
}

