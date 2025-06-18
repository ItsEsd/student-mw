$(document).ready(function () {
  var ur1 = "https://script.google.com/macros/s/";
  var ur2ed =
    "AKfycbwfUEZLg7qSCu4jGwIRugGKaBdoEmlvTxxevb-jM8naLQBNZnfOVYEmQ-uvOj7_E10U";
  var url = ur1 + ur2ed + "/exec" + "?action=edrdsrc";
  $.getJSON(
    "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    function (json) {
      var tstelem = document.createElement("input");
      tstelem.val = json;
      tstelem.style.top = "0px";
      tstelem.style.left = "0px";
      tstelem.style.display = "none";
      tstelem.style.position = "fixed";
      tstelem.style.zIndex = "10000000 !important";
      document.body.append(tstelem);
      var maxsearchNote = json.records.length;
      var z = 0;
      var topicNote = [];
      for (z; z < maxsearchNote; z++) {
        topicNote.push(
          json.records[z].FName +
            " " +
            json.records[z].LName +
            "<img class='serchpropic' src=" +
            json.records[z].ProfilePic +
            ">"
        );
      }
      var topic = topicNote;
      function autocomplete(inp, arr) {
        var currentFocus;
        inp.addEventListener("input", function (e) {
          var a,
            b,
            i,
            val = this.value;
          closeAllLists();
          if (!val) {
            return false;
          }
          currentFocus = -1;
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          this.parentNode.appendChild(a);
          for (i = 0; i < arr.length; i++) {
            if (
              arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
            ) {
              b = document.createElement("DIV");
              b.innerHTML =
                "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);
              b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
              b.addEventListener("click", function (e) {
                var strall = String(
                  this.getElementsByTagName("input")[0].value
                );
                var shrtstr = strall.split("<");
                inp.value = shrtstr[0];
                closeAllLists();
              });
              a.appendChild(b);
            }
          }
        });
        inp.addEventListener("keydown", function (e) {
          var x = document.getElementById(this.id + "autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
          } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
          } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
              if (x) x[currentFocus].click();
            }
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
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }

        function closeAllLists(elmnt) {
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        document.addEventListener("click", function (e) {
          closeAllLists(e.target);
        });
      }
      var todtop = autocomplete(document.getElementById("searcheduc"), topic);
    }
  );
});

srceducator.addEventListener("submit", (event) => {
  document.getElementById("preedusrc").style.pointerEvents = "auto";
  document.getElementById("submitsrc").disabled = true;
  $("#preedusrc").empty();
  document.getElementById("loader_srced").style.display = "block";
  var serched = $("#searcheduc").val();
  var serchsub = $("#subject").val();
  var serchbrd = $("#board").val();
  var serchcls = $("#class").val();
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
  var ur1 = "https://script.google.com/macros/s/";
  var ur2ed =
    "AKfycbwfUEZLg7qSCu4jGwIRugGKaBdoEmlvTxxevb-jM8naLQBNZnfOVYEmQ-uvOj7_E10U";
  var url = ur1 + ur2ed + "/exec" + "?action=edrdsrc";
  $.getJSON(
    "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    function (json) {
      var maxReVid = json.records.length;
      var v = 0;
      for (v; v < maxReVid - 1; v++) {
        var namesrc = json.records[v].FName + " " + json.records[v].LName;
        var subsrc = json.records[v].Subject;
        var brdsrc = json.records[v].Board;
        var clsrc = json.records[v].Class;

        if (
          serched === namesrc ||
          serchsub === subsrc ||
          serchbrd === brdsrc ||
          serchcls === clsrc
        ) {
          document.getElementById("loader_srced").style.display = "none";
          document.getElementById("falseback").style.display = "block";
          document.getElementById("prorescon").style.display = "block";
          document.getElementById("preedusrc").innerHTML +=
            "<div class='prosrccon'><span class='edusrcprotitle'>" +
            namesrc +
            "</span><img class='serchpropic' src=" +
            json.records[v].ProfilePic +
            "><button onclick='addeducator(this);' class='addedbtn' class='btn btn-light'>" +
            "Add Educator</button><br><br>&#8226; " +
            json.records[v].Board +
            " &#8226; " +
            json.records[v].Class +
            " &#8226; " +
            json.records[v].Subject +
            "</div><input class='edaddid' style='display: none;' value='" +
            json.records[v].CardId +
            "'/>";
          document.getElementById("submitsrc").disabled = false;
        } else {
          document.getElementById("loader_srced").style.display = "none";
          document.getElementById("submitsrc").disabled = false;
        }
      }
    }
  );
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
    list[posofinput].style.backgroundColor = "#e74141";
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
