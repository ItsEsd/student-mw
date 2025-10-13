function deltopictod(label) {
  $("#showdelnote").show();
  var click = 1;
  document.getElementById("varvrdigit").value = click;
  var stuid = $("#stuid").val();
  var list = document.getElementsByClassName("delsttod");
  list = [].slice.call(list);
  var posofinput = list.indexOf(label);
  var x = document.getElementsByClassName("tdcid");
  var todid = JSON.stringify(x[posofinput].value);
  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbxjI-rjdMxIvuOCMAtHLDWSbUEQxXPk2TX-rzwaY3M2_LmJ4Zn55Rv4AZwV3tUR5OnB9g";
  var urlrmv =
    ur1 +
    ur2 +
    "/exec" +
    "?callback=removefrmlst&tdid=" +
    todid +
    "&stuid=" +
    stuid +
    "&action=rmvtod";
  document.getElementById("varvrdigit").value = urlrmv;
}

$("#deletetodst").click(function (click) {
  document.getElementById("deletetodst").disabled = true;
  var url = $("#varvrdigit").val();
  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });
  document.getElementById("varvrdigit").value = 0;
});
$("#hidedelnote").click(function () {
  $("#showdelnote").hide();
});

function removefrmlst(e) {
  document.getElementById("deletetodst").disabled = false;
  storedtods();
  $("#showdelnote").hide();
}

strtodstu.addEventListener("submit", (event) => {
  $("#renotitod").slideDown("fast");
  $("#renotitod").empty();
  document.getElementById("storetdbtnfin").disabled = true;
  var tdid = JSON.stringify($("#todid").val());
  var tdpass = JSON.stringify($("#todpass").val());
  var tdcomnt = encodeURIComponent(JSON.stringify($("#todcmnt").val()));
  var allsttd = document.getElementsByClassName("tdcid");
  var stuid = $("#stuid").val();
  var flag = 0;
  for (var ln = 0; ln < allsttd.length; ln++) {
    if (tdid === JSON.stringify(allsttd[ln].value)) {
      flag = 1;
    }
  }
  if (flag === 0) {
    var ur1 = "https://script.google.com/macros/s/";
    var ur3 =
      "AKfycbwUJdpY-B16X7HFEL9GQvyL435ik8Pi-DTo1G1oErQY7TSVKVJVUivVmocge2jqC5bhnA";
    var url =
      ur1 +
      ur3 +
      "/exec" +
      "?callback=ctrlqsttd&todid=" +
      tdid +
      "&todpass=" +
      tdpass +
      "&todcmnt=" +
      tdcomnt +
      "&stuid=" +
      stuid +
      "&action=rdtod";
    var request = jQuery.ajax({
      crossDomain: true,
      url: url,
      method: "GET",
      dataType: "jsonp",
    });
  } else {
    const div = document.createElement("div");
    div.id = "notfycl";
    div.innerHTML = "TOD already stored!";
    document.body.appendChild(div);
    setTimeout(function () {
      $(div).slideUp();
    }, 2000);
    $("#storetdbtnfin").attr("disabled", false);
  }
});

function ctrlqsttd(e) {
  document.getElementById("storetdbtnfin").disabled = false;
  storedtods();
  strtodstu.reset();
  document.getElementById("storetodpost").scrollTop = 0;
  if (e.result == "TOD not found!") {
    document.getElementById("renotitod").innerHTML = "TOD not found!";
  } else if (e.result == "TOD Found!") {
    document.getElementById("renotitod").innerHTML = "TOD stored!";
  }
  setTimeout(function () {
    jQuery("#renotitod").fadeOut("fast");
  }, 6000);
}

function storedtods() {
  var email1 = $("#email").val();
  var pass = $("#pcodeStu").val();

  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbwUXXLNfbjlRQxPPe2sT2MIqZUyLnVO26YSa9GM9DDiQGQiqtsoDRLz5NMkyYso1xkKFA";
  var url =
    ur1 +
    ur2 +
    "/exec?action=ftchst&callback=getalltds" +
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

function getalltds(e) {
  if (e.records != "ID not found!") {
    const allsttod = e.records[0].AllTOD;
    var singlesttod = allsttod.split("{td},");
    var lenstr = singlesttod.length;
    var st = 0;
    var srno = 1;
    for (st; st < lenstr - 1; st += 3) {
      document.getElementById("storetodpost").innerHTML +=
        '<div class="storedtd"><div class="sharebiton" title="Copy Link" onclick="crcpbitlink(this)"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"> <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/> <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg></div><p>TOD No. ' +
        srno +
        '</p><p><span class="todcommnt">' +
        JSON.parse(singlesttod[st + 2]) +
        '</span><br><span class="todidstyl">ID: ' +
        JSON.parse(singlesttod[st]) +
        " Key: " +
        JSON.parse(singlesttod[st + 1]) +
        "</span></p>" +
        '<div align="right"><button class="btn btn-warning showsttod" onclick="showtopictod(this);">View</button>' +
        '<button class="btn btn-dark delsttod" onclick="deltopictod(this);">Delete</button>' +
        '<input class="tdcid" style="display: none;" value="' +
        JSON.parse(singlesttod[st]) +
        '"/><input class="tdkeyid" style="display:none;" value="' +
        JSON.parse(singlesttod[st + 1]) +
        '"/></div></div>' +
        "<hr>";
      srno = srno + 1;
    }
  } else {
    document.getElementById(
      "storetodpost"
    ).innerHTML = `<div style="padding:20px;padding-top:30px;"> <svg xmlns="http://www.w3.org/2000/svg" style="color:#8a8a8b;" width="60" height="60" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
  <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg> 
  <br> <br><p>No stored TOD</p></div>`;
  }
}

function showtopictod(label) {
  var list = document.getElementsByClassName("showsttod");
  list = [].slice.call(list);
  var posofinput = list.indexOf(label);
  var x = document.getElementsByClassName("tdcid");
  var y = document.getElementsByClassName("tdkeyid");
  document.getElementsByClassName("showsttod")[posofinput].disabled = true;
  var todid = JSON.stringify(x[posofinput].value);
  var todkey = JSON.stringify(y[posofinput].value);
  var tdur1 = "https://script.google.com/macros/s/";
  var tdur2 =
    "AKfycbzhBiB9M1ujqIqODdpuO6rBx4mQoR_niZMxJndRdY-A0OgbUi0gszQraZ4x__EnhwMq";
  var tdur = tdur1 + tdur2 + "/exec";
  var url =
    tdur +
    "?callback=rdreslt&tdid=" +
    todid +
    "&tdkey=" +
    todkey +
    "&action=rdgentd";
  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });
}

function rdreslt(e) {
  var reslt = e.records;
  if (reslt != "ID not found!") {
    document.getElementById("preview").style.display = "block";
    var prepostpre = JSON.parse(JSON.parse(reslt[0].TODhtm));
    var inHTML = atob(prepostpre.TODContent);
    document.getElementById("previewPost").innerHTML = decodeURIComponent(
      unescape(inHTML)
    );
    document.getElementById("previewPostTime").innerHTML = reslt[0].TimeStamp;
    document.getElementById("previewPostId").innerHTML =
      "ID: " + JSON.parse(reslt[0].TODidd);
    document.getElementById("previewPostCreator").innerHTML = JSON.parse(
      reslt[0].TODAddmin
    );
    document.getElementById("avthumb").innerHTML =
      '<img width="60px" src="' + prepostpre.AVPic + '" style="padding:4px;">';
    document.getElementById("previewPostTitle").innerHTML = prepostpre.TODTitle;
    document.getElementById("preview").scrollTop = 0;
    $(".showsttod").attr("disabled", false);
  }
}

function getId(url) {
  var regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "error";
  }
}
$("#backtotdbrd").click(function () {
  $("#preview").slideUp("fast");
});

$("#avthumb").click(function () {
  $("#preview").slideUp("fast");
});

function crcpbitlink(label) {
  var list = document.getElementsByClassName("sharebiton");
  list = [].slice.call(list);
  var posofinput = list.indexOf(label);
  var x = document.getElementsByClassName("tdcid");
  var y = document.getElementsByClassName("tdkeyid");
  var tdid = window.btoa(x[posofinput].value);
  var tdkid = window.btoa(y[posofinput].value);
  var newlk =
    "https://tods.mastrowall.com?topictd=" +
    tdid +
    "&tdkey=" +
    tdkid +
    "&td=valid";
  copytodlink(newlk);
}
function copytodlink(newlk) {
  var textA = document.createElement("input");
  textA.value = newlk;
  textA.select();
  textA.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(textA.value);
  $("#lkcopied").slideDown("fast");
  setTimeout(function () {
    $("#lkcopied").slideUp("fast");
  }, 2000);
}
