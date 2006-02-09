function search(obj, event, retired, delay) {
	searchBoxChange("patientTableBody", obj, event, retired, delay);
	return false;
}

var getId		= function(p) {
		if (typeof p == 'string') {
			var td = document.createElement("td");
			td.colspan = 0;
			td.innerHTML = "<div style='float: left;'>" + p + "</div>";
			return td;
		}
		div = document.createElement("div");
		var obj = document.createElement("a");
		//obj.href = "#" + searchIndex;
		//obj.className = "searchHit";
		//obj.onclick = function() { return selectObject(parseInt(this.href.substring(this.href.indexOf('#')+1, this.href.length))); };
		obj.appendChild(document.createTextNode(p.identifier + " "));
		div.appendChild(obj);
		if (p.identifierCheckDigit)
		if (typeof isValidCheckDigit != 'undefined' && isValidCheckDigit(p.identifier)==false) {
			div.appendChild(getProblemImage());
		}
		if (p.voided) {
			div.className = "retired";
		}
		return div;
	};
var getGiven	= function(p) { return p.givenName == null ? "" : p.givenName;  };
var getMiddle	= function(p) { return p.middleName == null ? "" : p.middleName; };
var getFamily	= function(p) { return p.familyName == null ? "" : p.familyName; };
var getTribe	= function(p) { return p.tribe == null ? "" : p.tribe; };
var getGender	= function(p) {
		if (typeof p == 'string') return "";
		
		var td = document.createElement("td");
		td.className = "patientGender";
		var src = "/@WEBAPP.NAME@/images/";
		if (p.gender.toUpperCase() == "F")
			src += "female.gif";
		else
			src += "male.gif";
		var img = document.createElement("img");
		td.innerHTML = "<img src='" + src + "'>";
		return td;
	};
var getBirthdayEstimated = function(p) {
		if (typeof p == 'string') return "";
		if (p.birthdateEstimated)
			return "&asymp;";
		else
			return "";
	};
var getBirthday	= function(p) { 
		if (typeof p == 'string') return "";
		str = getDateString(p.birthdate);
		return str;
	};
var getAge = function(p) { 
		if (p == null || p.age == null) return '';
		var td = document.createElement("td");
		td.className = 'patientAge';
		var age = p.age;
		if (age < 1)
			age = "<1";
		td.innerHTML = age;
		return td;
}

var getMother  = function(p) { return p.mothersName == null ? "" : p.mothersName;  };

var customCellFunctions = [getNumber, getId, getGiven, getMiddle, getFamily, getAge, getGender, getTribe, getBirthdayEstimated, getBirthday];

function getProblemImage() {
	var img = document.createElement("img");
	img.src = "/@WEBAPP.NAME@/images/problem.gif";
	if (typeof invalidCheckDigit != 'undefined') img.onclick=invalidCheckDigit;
	img.title="The check digit on this identifier is invalid.  Please double check this patient";
	return img;
}

function customGetRowHeight() {
	return 23;
}

function allowAutoListWithNumber() {
	return true;
}
