/*
Authors: 
	Jaime Convery / 991393680
	Nikola Petrovski / 991466135
	Wassim Shamass / shamass 991446742
File Name: myscript.js
Date: 2018-04-17
Professor: Ann Cadger
*/

var slist = new Array(); 
var student; 
var rowid; 

function Student(sname, slogin, snumber, simage,sicon) {
	this.sname = sname; 
	this.slogin = slogin; 
	this.snumber = snumber; 
	this.simage =  simage; 
	this.sicon = sicon; 
}
$(document).on("pagecreate", "#main", function() {
	
	$.ajax({
		type:"POST",
		url:"dataFiles/projectData.xml",
		dataType:"xml",
		success:function(xml){
			buildmenu(xml)
		},
		error: function(e) {
			alert(e.status + " - " + e.statusText);
		}
	});
	
	$.getJSON("ProjectData-07.json", function(json) {
		
		$("h3").html(
			json.type 
		);

		
		/* JSON page */
		start = json.setinfo;
		for (x = 0; x < start.length; x++) {
			if(x % 2 != 0) {
				grid = "ui-block-b";
			} else {
				grid="ui-block-a";
			}
			
			$("#jsonContentDiv").append(
				"<section data-role='collapsible' class='" + grid + "'>" +
				"<h2 class='ui-btn ui-icon-" + start[x].nameid + " ui-btn-icon-left'>" +
						"<span>" + start[x].nameid + "</span>" +
				"</h2>" +
				"<p><b>Full Name:</b> " + start[x].contactPoint["fn"] + "</p>" +
				"<p><b>Email:</b> " + start[x].contactPoint["hasEmail"] + "</p>" +
				"<p><b>Description:</b> " + start[x]["description"] + "</p>" +
				"<p><b>Media Type:</b> " + start[x].distribution[0]["mediaType"] + "</p>" + 
				"<p><b>Download URL:</b> " + start[x].distribution[0].downloadURL + "</p>" + 
				"<p><b>Modified Date:</b> " + start[x]["modified"] + "</p>" +
				"<p><b>Access Level:</b> " + start[x]["accessLevel"] + "</p>"
			);
		}
		
		/* members json page */
		$.getJSON("projMembers.json", function(data) {
			$("#nav1").html("<ul id='navhome'></ul>");
			$("#nav2").html("<ul id='navjson'></ul>");
			$("#nav3").html("<ul id='navxml'></ul>");
					
			start = data.students.studentRec; 
			for (x=0; x< start.length; x++) {
				student = new Student(
					start[x].name,
					start[x].login,
					start[x]["student-number"],
					start[x].image, 
					start[x].icon
				);
				slist.push(student);		
				/* home nav */
				$("#navhome").append(
					"<li li-id='" + x + "'>" +
						"<a href='#studentInfo' data-rel='dialog' class='ui-btn ui-icon-" + slist[x].sicon + " ui-btn-icon-top'>" +
							slist[x].sname +
					"</li>" 
				);
				/* json nav */
				$("#navjson").append(
					"<li li-id='" + x + "'>" +
						"<a href='#studentInfo' data-rel='dialog' class='ui-btn ui-icon-" + slist[x].sicon + " ui-btn-icon-top'>" +
							slist[x].sname +
					"</li>" 
				);
				/* xml nav */
				$("#navxml").append(
					"<li li-id='" + x + "'>" +
						"<a href='#studentInfo' data-rel='dialog' class='ui-btn ui-icon-" + slist[x].sicon + " ui-btn-icon-top'>" +
							slist[x].sname +
					"</li>" 
				);
			} // END for loop
		
			$("#nav1").navbar("destroy");
			$("#nav1").navbar();
			$("#nav2").navbar("destroy");
			$("#nav2").navbar();
			$("#nav3").navbar("destroy");
			$("#nav3").navbar();
		}); // END members .getJSON 
	}); // END 07 .getJSON
}); // END doc.on

/* click events for nav for 3 pages */

$(document).on("click", "#navhome >li", function() {
	rowid = $(this).closest("li").attr("li-id");
	console.log("p " + rowid);
});

$(document).on("click", "#navjson >li", function() {
	rowid = $(this).closest("li").attr("li-id");
	console.log("p " + rowid);
});

$(document).on("click", "#navxml >li", function() {
	rowid = $(this).closest("li").attr("li-id");
	console.log("p " + rowid);
});

$(document).on("pageshow", "#studentInfo", function() {
	$("#popup").html(""); 

	$("#popup").append(
	   "<h2 style=text-align:center;>" +
			slist[rowid].sname + 
	   "</h2>" +
	   
		"<img id='image' src='images/" + slist[rowid].simage + "' width='150'>" +
		
		"<div style='float:right'>" +
		"<p><strong>Student Number: </strong>" +
			slist[rowid].snumber +
			"</p>" + 
			"<p>" +
		"<strong>Login: </strong>" +
			slist[rowid].slogin +
			"</p>" +
		"</div>" +				 
		"<a href='#main' data-rel='back' class='ui-btn ui-icon-back ui-btn-icon-left'>Back to Main</a>"
	); // END popup
});

/* XML page */
$(document).on("pagecreate", "#XML", function() {
	$.ajax({
		type:"POST",
		url:"dataFiles/projectData.xml",
		dataType:"xml",
		success:function(xml){
			buildmenu(xml)
		},
		error: function(e) {
			alert(e.status + " - " + e.statusText);
		}
	});
});

function buildmenu(xml) {
	console.log(xml);
	$("h1").html($(xml).find("foodGroup").find("name:nth(0)").text());
	
	$("#xmlContent").html("");
	$(xml).find("food").each(function() {
		$("#xmlContent").append(
			"<section data-role='collapsible'>" +
				"<h2 class='ui-btn ui-icon-" + $(this).find("pic").text() + " ui-btn-icon-left'>" +
						"<span>" + $(this).find("name").text() + "</span>" +
				"</h2>" +
				"<img src='images/" + $(this).find("pic").text() + ".jpg' width='150'>" +
				"<p><b>Calories per 1 cup:</b> " + $(this).find("calories").text() + "</p>" +
				"<p><b>Vitamins:</b> " + $(this).find("nutrition").find("vitamins").text() + "</p>" +
				"<p><b>Sodium:</b> " + $(this).find("nutrition").find("sodium").text() + " mg</p>" +
				"<p><b>Fat:</b> " + $(this).find("nutrition").find("fat").text() + " g</p>" +
			"</section>"
		);
	}); // END .each div
	$("#xmlContent").collapsibleset("refresh");
}