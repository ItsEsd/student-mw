$(document).ready(function () {
  var ur1 = "https://script.google.com/macros/s/";
  var ur2ed =
    "AKfycbwfUEZLg7qSCu4jGwIRugGKaBdoEmlvTxxevb-jM8naLQBNZnfOVYEmQ-uvOj7_E10U";
  var url = ur1 + ur2ed + "/exec" + "?action=edrdsrc";

  let allEducators = [];

  $.getJSON(
    "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    function (json) {
      allEducators = json.records;

      let topicNote = allEducators.map(
        (r) =>
          `${r.FName} ${r.LName}<img class='serchpropic' src='${r.ProfilePic}'>`,
      );

      autocomplete(document.getElementById("searcheduc"), topicNote);
    },
  );

  function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function (e) {
      let a,
        b,
        i,
        val = this.value;
      closeAllLists();
      if (!val) return false;
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);

      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
          b.addEventListener("click", function (e) {
            let strall = String(this.getElementsByTagName("input")[0].value);
            let shrtstr = strall.split("<");
            inp.value = shrtstr[0];
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });

    inp.addEventListener("keydown", function (e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1 && x) x[currentFocus].click();
      }
    });

    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      for (let i = 0; i < x.length; i++)
        x[i].classList.remove("autocomplete-active");
    }

    function closeAllLists(elmnt) {
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  srceducator.addEventListener("submit", (event) => {
    event.preventDefault();

    $("#preedusrc").empty();
    document.getElementById("loader_srced").style.display = "block";
    document.getElementById("submitsrc").disabled = true;

    let serched = $("#searcheduc").val();
    let serchsub = $("#subject").val();
    let serchbrd = $("#board").val();
    let serchcls = $("#class").val();

    if (
      serched == 0 &&
      serchsub == "Subject-" &&
      serchbrd == "Board-" &&
      serchcls == "Class-"
    ) {
      document.getElementById("loader_srced").style.display = "none";
      document.getElementById("submitsrc").disabled = false;
      return false;
    }

    let matched = allEducators.filter(
      (r) =>
        serched === `${r.FName} ${r.LName}` ||
        serchsub === r.Subject ||
        serchbrd === r.Board ||
        serchcls === r.Class,
    );

    document.getElementById("loader_srced").style.display = "none";
    document.getElementById("submitsrc").disabled = false;

    if (matched.length === 0) {
      $("#preedusrc").html("<p>No matching educator found.</p>");
      return;
    }

    document.getElementById("falseback").style.display = "block";
    document.getElementById("prorescon").style.display = "block";

    matched.forEach((r) => {
      $("#preedusrc").append(
        `<div class='prosrccon'>
            <span class='edusrcprotitle'>${r.FName} ${r.LName}</span>
            <img class='serchpropic' src='${r.ProfilePic}'>
            <button onclick='addeducator(this);' class='addedbtn btn'>Add Educator</button>
            <br><br>
            &#8226; ${r.Board} &#8226; ${r.Class} &#8226; ${r.Subject}
          </div>
          <input class='edaddid' style='display:none;' value='${r.CardId}'/>`,
      );
    });
  });
});

function addeducator(label) {
  var list = document.getElementsByClassName("addedbtn");
  var listaped = document.getElementsByClassName("eduprewid");
  var qsapedap = document.querySelectorAll(".eduprewid");
  var listapedap = document.getElementsByClassName("strmvid");
  var qsaped = document.querySelectorAll(".strmvid");
  list = [].slice.call(list);
  var posofinput = list.indexOf(label);
  var x = document.getElementsByClassName("edaddid");
  var edadid = x[posofinput].value;
  document.getElementById("preedusrc").style.pointerEvents = "none";
  document.getElementById("eduid").value = edadid;
  document.getElementById("posof").value = posofinput;
  list[posofinput].disabled = true;
  var flag = 0;
  for (var v = 0; v < qsapedap.length; v++) {
    if (edadid == listaped[v].value) {
      flag = 1;
    }
  }
  for (var x = 0; x < qsaped.length; x++) {
    if (edadid == listapedap[x].value) {
      flag = 2;
    }
  }
  if (flag == 0) {
    list[posofinput].innerHTML = "Sending Request..";
    var addeduid = $("#eduid").val();
    var studid = $("#stuid").val();
    var ur1 = "https://script.google.com/macros/s/";
    var ur2 =
      "AKfycbyF2ru_7oBEtZ-XXql6a1OSXA9F1aDT_AEI30gJPR7uL96DKcBPtac_n4kPuEqzSFru";
    var ur3 =
      "AKfycbwgG73YMyqYuShYfskdaDg196gf7JXwFvgblx6k5HoUPnHQyfeZEZ_CeGvUu1udyiKj";
    var urledside =
      ur1 +
      ur2 +
      "/exec" +
      "?callback=ctrlqaddst&eduid=" +
      addeduid +
      "&stuid=" +
      studid +
      "&action=alstup";
    var request = jQuery.ajax({
      crossDomain: true,
      url: urledside,
      method: "GET",
      dataType: "jsonp",
    });
  } else {
    list[posofinput].style.backgroundColor = "#e74141 !important";
    list[posofinput].innerHTML = "In Classroom/ Waiting";
    document.getElementById("preedusrc").style.pointerEvents = "auto";
  }
}

function ctrlqaddst() {
  var p = $("#posof").val();
  var z = document.getElementsByClassName("addedbtn");
  var addeduid = $("#eduid").val();
  var studid = $("#stuid").val();
  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbyF2ru_7oBEtZ-XXql6a1OSXA9F1aDT_AEI30gJPR7uL96DKcBPtac_n4kPuEqzSFru";
  var ur3 =
    "AKfycbwgG73YMyqYuShYfskdaDg196gf7JXwFvgblx6k5HoUPnHQyfeZEZ_CeGvUu1udyiKj";
  var urlstside =
    ur1 +
    ur3 +
    "/exec" +
    "?callback=ctrlqadded&eduid=" +
    addeduid +
    "&stuid=" +
    studid +
    "&action=upedust";
  var request = jQuery.ajax({
    crossDomain: true,
    url: urlstside,
    method: "GET",
    dataType: "jsonp",
  });
}
function ctrlqadded() {
  var p = $("#posof").val();
  var z = document.getElementsByClassName("addedbtn");
  z[p].innerHTML = "Waiting Approval";
  z[p].style.backgroundColor = "#0ba705";
  setTimeout(function () {
    $("#falseback").slideUp("fast");
    $("#prorescon").slideUp("fast");
    document.getElementById("preedusrc").style.pointerEvents = "auto";
  }, 1000);
  eduwaiting();
}
