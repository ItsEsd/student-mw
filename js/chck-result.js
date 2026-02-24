chresult.addEventListener("submit", (event) => {
  var exid = $("#checkexamid").val();
  var enid = JSON.stringify($("#chechenid").val());
  var url1 = "https://script.google.com/macros/s/";
  var url2 =
    "AKfycbyjZr_GlLG5IEBabVp79cQHSwIDovEoZc5KHEBFI2vpI5cb2H14qkqkdPI-quXuIKtn";
  var url = url1 + url2 + "/exec" + "?action=gentestrd";
  document.getElementById("falsebacktwo").style.display = "block";
  var exmprevstr = document.getElementsByClassName("exmiddsh");
  var nsvexm = 0;
  for (var exl = 0; exl < exmprevstr.length; exl++) {
    var exprvid = exmprevstr[exl].innerText.split("Exam ID: ")[1];
    if (exid === exprvid) {
      nsvexm = 1;
    }
  }
  if (nsvexm === 1) {
    $("#saveexperstu").attr("disabled", true);
  } else {
    $("#saveexperstu").attr("disabled", false);
  }

  $.getJSON(
    "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    function (json) {
      for (var i = 0; i < json.records.length - 1; i++) {
        if (exid === json.records[i].ExamID) {
          var stustring = JSON.parse(
            JSON.stringify(json.records[i].EnrolledStuFinal),
          );
          var sstring = stustring.split(",");
          var lenstrk = sstring.length;
          var restr = JSON.parse(JSON.stringify(json.records[i].StuAnsFinal));
          var sprestr = restr.split("{anst},");
          var lenstr = sprestr.length;
          var ansk = JSON.parse(JSON.stringify(json.records[i].AnsSTfinal));
          var anskey = ansk.split('{qfin}",');
          var lenstrkey = anskey.length;
          for (var k = 0; k < lenstr; k += 2) {
            if (enid == sprestr[k]) {
              var res = sprestr[k + 1];
              var resone = JSON.parse(res);
              var count = 0;
              for (var j = 0; j < lenstrkey - 1; j++) {
                if (resone.qnst[j] === anskey[j].substring(1)) {
                  count = count + 1;
                } else {
                  count = count;
                }
              }
              document.getElementById("extakepost").style.display = "none";
              document.getElementById("extakepre").style.display = "none";
              document.getElementById("scrbrd").style.display = "block";
              document.getElementById("crtans").style.display = "block";
              document.getElementById("crtans").innerHTML =
                "<div><p style='text-align:left;'><i>Educator:</i> " +
                json.records[i].EducatorName +
                "<br><i>Exam Title:</i> " +
                json.records[i].ExamTitle +
                "<br><i>Description:</i> " +
                json.records[i].ExamDescp +
                "<br><i>Duration:</i> " +
                json.records[i].TDuration +
                "</p></div>" +
                "<p style='font-size:20px;color:green;'>Correct Answer: " +
                count +
                "</p>";
            }
          }
          for (var h = 0; h < lenstrk; h++) {
            if (enid == sstring[h]) {
              document.getElementById("stunamek").style.display = "block";
              document.getElementById("stunamek").innerHTML =
                "<p style='color:black;font-size:20px;'>Name: <span style='color:blue;font-style:italic;'>" +
                JSON.parse(sstring[h - 2]) +
                "</span></p>";
            }
          }
        }
      }
      $("#experformance").slideDown("fast");
      document.getElementById("falsebacktwo").style.display = "none";
    },
  );
});

document.getElementById("saveexperstu").addEventListener("click", saveexaminfo);

function saveexaminfo() {
  $("#falsebacktwo").slideDown("fast");
  var stemid = $("#email").val();
  var examidst = $("#checkexamid").val();
  var enridst1 = $("#chechenid").val();
  var examdtls = document.getElementById("crtans").innerHTML;
  var enridst = enridst1 + "{ex}," + examdtls + "{ex}";
  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycby7jTn-KV6hWBF6cANbWbatwFXimHJ_5RzwGSOkQU4WkamYCIZGOdLACix8qLEJ4N85JQ";
  var url =
    ur1 +
    ur2 +
    "/exec" +
    "?callback=ctrlqsvex&email=" +
    stemid +
    "&checkexamid=" +
    examidst +
    "&chechenid=" +
    enridst +
    "&action=upsvexam";
  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });
}

function ctrlqsvex() {
  $("#falsebacktwo").slideUp("fast");
  readsaveexm();
  $("#scrbrd").hide();
  $("#extakepre").slideDown("fast");
  $("#extakepost").slideDown("fast");
}

function readsaveexm() {
  var email1 = $("#email").val();
  var pass = $("#pcodeStu").val();

  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbwUXXLNfbjlRQxPPe2sT2MIqZUyLnVO26YSa9GM9DDiQGQiqtsoDRLz5NMkyYso1xkKFA";
  var url =
    ur1 +
    ur2 +
    "/exec?action=ftchst&callback=gtallemxms" +
    "&edmail=" +
    email1 +
    "&edps=" +
    pass;

  jQuery.ajax({
    crossDomain: true,
    url:
      "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    method: "GET",
    dataType: "jsonp",
  });
}

function gtallemxms(e) {
  console.log(e.records);
  if (e.records != "ID not found!") {
    const allExamData = e.records[0].AllExam;
    if (allExamData != 0) {
      $("#extakepost").empty();
      var singlessvexm = allExamData.split("{ex},");
      var srno = 1;

      for (var st = 0; st < singlessvexm.length - 1; st += 3) {
        $("#extakepost").append(
          '<div align="left" class="savevexmdiv">' +
            '<div style="text-align:left">' +
            '<span style="float:left"><b>No. ' +
            srno +
            "</b></span>" +
            '<span style="float:right;">' +
            '<button class="btn btn-primary svshowexres" onclick="shoeprevexresult(this);">Show Result</button>' +
            '<button class="btn btn-danger dltsvdexdt" onclick="deletelistrslt(this);">Delete</button>' +
            "</span></div><br>" +
            '<p style="font-size:14px;"><span style="float:left;" class="exmiddsh">Exam ID: <span class="emxidsvdbrd">' +
            singlessvexm[st] +
            '</span></span><br><span style="float:left;">Enrollment ID: ' +
            singlessvexm[st + 1] +
            '</span></p><div class="exdtlsst">' +
            singlessvexm[st + 2] +
            "</div>" +
            '<input class="exidsv" style="display:none;" value="' +
            singlessvexm[st] +
            '">' +
            '<input class="enidsv" value="' +
            singlessvexm[st + 1] +
            '" style="display:none;"><hr>',
        );
        srno++;
      }
    }
  }
}

function shoeprevexresult(label) {
  document.getElementById("falsebacktwo").style.display = "block";
  var list = document.getElementsByClassName("svshowexres");
  list = [].slice.call(list);
  $("#saveexperstu").attr("disabled", true);
  var posofinput = list.indexOf(label);

  var x = document.getElementsByClassName("exidsv");
  var y = document.getElementsByClassName("enidsv");
  var examid = x[posofinput].value;
  var enrid = JSON.stringify(y[posofinput].value);
  var url1 = "https://script.google.com/macros/s/";
  var url2 =
    "AKfycbyjZr_GlLG5IEBabVp79cQHSwIDovEoZc5KHEBFI2vpI5cb2H14qkqkdPI-quXuIKtn";
  var url = url1 + url2 + "/exec" + "?action=gentestrd";
  document.getElementById("falsebacktwo").style.display = "block";
  $.getJSON(
    "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    function (json) {
      for (var i = 0; i < json.records.length - 1; i++) {
        if (examid === json.records[i].ExamID) {
          var stustring = JSON.parse(
            JSON.stringify(json.records[i].EnrolledStuFinal),
          );
          var sstring = stustring.split(",");
          var lenstrk = sstring.length;
          var restr = JSON.parse(JSON.stringify(json.records[i].StuAnsFinal));
          var sprestr = restr.split("{anst},");
          var lenstr = sprestr.length;
          var ansk = JSON.parse(JSON.stringify(json.records[i].AnsSTfinal));
          var anskey = ansk.split('{qfin}",');
          var lenstrkey = anskey.length;
          for (var k = 0; k < lenstr; k += 2) {
            if (enrid == sprestr[k]) {
              var res = sprestr[k + 1];
              var resone = JSON.parse(res);
              var count = 0;
              for (var j = 0; j < lenstrkey - 1; j++) {
                if (resone.qnst[j] === anskey[j].substring(1)) {
                  count = count + 1;
                } else {
                  count = count;
                }
              }
              document.getElementById("extakepost").style.display = "none";
              document.getElementById("extakepre").style.display = "none";
              document.getElementById("scrbrd").style.display = "block";
              document.getElementById("crtans").style.display = "block";
              document.getElementById("crtans").innerHTML =
                "<div><p style='text-align:left;'><i>Educator:</i> " +
                json.records[i].EducatorName +
                "<br><i>Exam Title:</i> " +
                json.records[i].ExamTitle +
                "<br><i>Description:</i> " +
                json.records[i].ExamDescp +
                "<br><i>Duration:</i> " +
                json.records[i].TDuration +
                "</p></div>" +
                "<p style='font-size:20px;color:green;'>Correct Answer: " +
                count +
                "</p>";
            }
          }
          for (var h = 0; h < lenstrk; h++) {
            if (enrid == sstring[h]) {
              document.getElementById("stunamek").style.display = "block";
              document.getElementById("stunamek").innerHTML =
                "<p style='color:black;font-size:20px;'>Name: <span style='color:blue;font-style:italic;'>" +
                JSON.parse(sstring[h - 2]) +
                "</span></p>";
            }
          }
        }
      }

      document.getElementById("falsebacktwo").style.display = "none";
    },
  );
}

function deletelistrslt(label) {
  if (!confirm("Are you sure you want to delete this saved exam? ")) {
    return;
  }
  var list = document.getElementsByClassName("dltsvdexdt");
  list = [].slice.call(list);
  var posofinput = list.indexOf(label);

  var x = document.getElementsByClassName("emxidsvdbrd");
  var examid = x[posofinput].textContent;

  document.getElementById("falsebacktwo").style.display = "block";
  var eid = $("#email").val();
  const srpturl =
    "https://script.google.com/macros/s/AKfycbzn36BI7hLV1wYljOfGQQyHxmPbQ2KY7aI7vP2hBHH6Vz3yd4pIIajk9_GMgk5ZD_yF/exec";
  const url = `${srpturl}?action=delsvexm&eid=${eid}&emid=${examid}&callback=ctrlqsvdexms`;

  console.log("Fetching:", url);

  jQuery.ajax({
    crossDomain: true,
    url:
      "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    method: "GET",
    dataType: "jsonp",
  });
}

function ctrlqsvdexms(e) {
  console.log(e.result);
  readsaveexm();
  $("#extakepost").empty();
  $("#extakepost")
    .html(` <svg xmlns="http://www.w3.org/2000/svg" style="color:#8a8a8b;" width="60" height="60" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
               </svg>
               <br> <br>
               <p>Loading saved exams...</p>`);

  document.getElementById("falsebacktwo").style.display = "none";
}
