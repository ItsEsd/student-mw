function eduwaiting() {
  $("#myeduc-wait").empty();
  document.getElementsByClassName("refreshlist")[0].disabled = true;
  document.getElementsByClassName("refreshlist")[0].style.opacity = "0.5";
  document.getElementsByClassName("refreshlist")[0].style.pointerEvents =
    "none";
  document.getElementById("myeduc-wait").style.backgroundImage =
    "url('images/frameloader.gif')";
  var email1 = $("#email").val();
  var pass = $("#pcodeStu").val();
  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbwUXXLNfbjlRQxPPe2sT2MIqZUyLnVO26YSa9GM9DDiQGQiqtsoDRLz5NMkyYso1xkKFA";
  var url =
    ur1 +
    ur2 +
    "/exec?action=ftchst&callback=alledwait" +
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

function alledwait(e) {
  if (e.records[0].EduWait != 0) {
    document.getElementById("assignededu").style.display = "none";
    document.getElementById("meducatordiv").style.display = "block";
    var allst = e.records[0].EduWait;
    var singlest = allst.split(",");
    var edidArrayW = [];

    for (var str = 0; str < singlest.length; str++) {
      var edidsrcw = singlest[str].trim();
      if (edidsrcw) edidArrayW.push(edidsrcw);
    }
    srcedidwait(edidArrayW);
  } else {
    document.getElementById("myeduc-wait").innerHTML =
      '<div class="nocontentalled"><svg xmlns="http://www.w3.org/2000/svg" style="color:#8a8a8b;" width="60" height="60" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">' +
      '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />' +
      '<path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>' +
      '<br><h5 style="color:#474749;">Empty</h5></div>';
    document.getElementById("myeduc-wait").style.backgroundImage = "none";
  }
}

function srcedidwait(edidsrc) {
  if (!Array.isArray(edidsrc) || edidsrc.length === 0) return;

  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbwfUEZLg7qSCu4jGwIRugGKaBdoEmlvTxxevb-jM8naLQBNZnfOVYEmQ-uvOj7_E10U";
  var url =
    ur1 +
    ur2 +
    "/exec?action=edsrclist&edidArray=" +
    encodeURIComponent(edidsrc.join(","));

  $.getJSON(
    "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    function (json) {
      if (!json.records || json.records.length === 0) return;
      document.getElementById("myeduc-wait").innerHTML = "";
      json.records.forEach(function (record) {
        if (edidsrc.includes(record.CardId)) {
          document.getElementById("myeduc-wait").innerHTML +=
            "<div class='edproclroom'>" +
            "<span class='ednametitle'>" +
            record.FName +
            " " +
            record.LName +
            "</span>" +
            "<img class='edpropic' src='" +
            record.ProfilePic +
            "'>" +
            "<button onclick='rmvedwait(this);' class='btn btn-light rmvstbtn'>" +
            "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>" +
            "<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>" +
            "<path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>" +
            "</svg></button><br> &#8226; " +
            record.Subject +
            " &#8226; " +
            record.Class +
            " &#8226; " +
            record.Board +
            "<br> &#8226; <a href='mailto:" +
            record.Email +
            "'>" +
            record.Email +
            "</a>" +
            " &#8226; <a href=tel:" +
            record.CountryCode +
            record.PhoneNo +
            ">+" +
            record.CountryCode +
            " " +
            record.PhoneNo +
            "</a>" +
            "</div>" +
            "<input class='strmvid' style='display:none;' value='" +
            record.CardId +
            "'/>";
        }
      });

      var container = document.getElementById("myeduc-wait");
      container.style.backgroundImage = "none";

      var refreshBtn = document.getElementsByClassName("refreshlist")[0];
      if (refreshBtn) {
        refreshBtn.disabled = false;
        refreshBtn.style.opacity = "1";
        refreshBtn.style.pointerEvents = "auto";
      }
    },
  );
}

function rmvedwait(label) {
  var list = document.getElementsByClassName("rmvstbtn");
  list = [].slice.call(list);
  var posofinput = list.indexOf(label);
  var x = document.getElementsByClassName("strmvid");
  var stadid = x[posofinput].value;
  document.getElementById("myeduc-wait").style.pointerEvents = "none";
  document.getElementById("eduidst").value = stadid;
  document.getElementById("posofst").value = posofinput;
  list[posofinput].disabled = true;
  list[posofinput].innerHTML = "Removing..";
  var eduid = $("#eduidst").val();
  var studid = $("#stuidst").val();
  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbwhx0nnENgY5_8zy6XQVbf27I3a8pOE9uPBFWf7L61GAvDcOIy-I_h8Hojl3LiZwOsU";
  var urlrmvedw =
    ur1 +
    ur2 +
    "/exec" +
    "?callback=ctrlqrmvw&eduidst=" +
    eduid +
    "&stuidst=" +
    studid +
    "&action=rmvedw";
  var request = jQuery.ajax({
    crossDomain: true,
    url: urlrmvedw,
    method: "GET",
    dataType: "jsonp",
  });
}

function ctrlqrmvw() {
  var p = $("#posofst").val();
  var z = document.getElementsByClassName("rmvstbtn");
  z[p].innerHTML = "Removed";
  z[p].style.backgroundColor = "black";
  document.getElementById("myeduc-wait").style.pointerEvents = "auto";
  eduwaiting();
}

function eduapprv() {
  document.getElementsByClassName("refreshlist")[1].disabled = true;
  document.getElementsByClassName("refreshlist")[1].style.opacity = "0.5";
  document.getElementsByClassName("refreshlist")[1].style.pointerEvents =
    "none";
  $("#myeduc-appr").empty();
  document.getElementById("myeduc-appr").style.backgroundImage =
    "url('images/frameloader.gif')";

  var email1 = $("#email").val();
  var pass = $("#pcodeStu").val();

  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbwUXXLNfbjlRQxPPe2sT2MIqZUyLnVO26YSa9GM9DDiQGQiqtsoDRLz5NMkyYso1xkKFA";
  var url =
    ur1 +
    ur2 +
    "/exec?action=ftchst&callback=gtedapprdlst" +
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

function gtedapprdlst(e) {
  if (e.records[0].EduAppr != 0) {
    document.getElementById("assignededu").style.display = "none";
    document.getElementById("meducatordiv").style.display = "block";
    var allstap = e.records[0].EduAppr;
    var singlestap = allstap.split(",");
    var edidArrayAp = [];

    for (var str = 0; str < singlestap.length; str++) {
      var edidsrcap = singlestap[str].trim();
      if (edidsrcap) edidArrayAp.push(edidsrcap);
    }
    srcedidapprv(edidArrayAp);
  } else {
    document.getElementById("myeduc-appr").innerHTML =
      '<div class="nocontentalled"><svg xmlns="http://www.w3.org/2000/svg" style="color:#8a8a8b;" width="60" height="60" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">' +
      '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />' +
      '<path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>' +
      '<br><h5 style="color:#474749;">Empty</h5></div>';
    document.getElementById("myeduc-appr").style.backgroundImage = "none";
  }
  if (e.records[0].EduWait != 0) {
    document.getElementById("assignededu").style.display = "none";
    document.getElementById("meducatordiv").style.display = "block";
    var allst = e.records[0].EduWait;
    var singlest = allst.split(",");
    var edidArrayW = [];

    for (var str = 0; str < singlest.length; str++) {
      var edidsrcw = singlest[str].trim();
      if (edidsrcw) edidArrayW.push(edidsrcw);
    }
    srcedidwait(edidArrayW);
  } else {
    document.getElementById("myeduc-wait").innerHTML =
      '<div class="nocontentalled"><svg xmlns="http://www.w3.org/2000/svg" style="color:#8a8a8b;" width="60" height="60" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">' +
      '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />' +
      '<path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>' +
      '<br><h5 style="color:#474749;">Empty</h5></div>';
    document.getElementById("myeduc-wait").style.backgroundImage = "none";
  }
}

function srcedidapprv(edidsrcap) {
  if (!Array.isArray(edidsrcap) || edidsrcap.length === 0) return;

  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbwfUEZLg7qSCu4jGwIRugGKaBdoEmlvTxxevb-jM8naLQBNZnfOVYEmQ-uvOj7_E10U";
  var url =
    ur1 +
    ur2 +
    "/exec?action=edsrclist&edidArray=" +
    encodeURIComponent(edidsrcap.join(","));

  $.getJSON(
    "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    function (json) {
      if (!json.records || json.records.length === 0) return;
      document.getElementById("myeduc-appr").innerHTML = "";

      json.records.forEach(function (record) {
        if (edidsrcap.includes(record.CardId)) {
          document.getElementById("myeduc-appr").innerHTML +=
            "<div onclick='showeduin(this);' class='edproclroomfin'>" +
            "<span class='ednametitle'>" +
            record.FName +
            " " +
            record.LName +
            "</span>" +
            "<img class='edpropic' src='" +
            record.ProfilePic +
            "'><br> &#8226; " +
            record.Subject +
            " &#8226; " +
            record.Class +
            " &#8226; " +
            record.Board +
            "<br> &#8226; <a href='mailto:" +
            record.Email +
            "'>" +
            record.Email +
            "</a>" +
            " &#8226; <a href='tel:" +
            record.CountryCode +
            record.PhoneNo +
            "'>+" +
            record.CountryCode +
            " " +
            record.PhoneNo +
            "</a></div>" +
            "<input class='eduprewid' style='display:none;' value='" +
            record.CardId +
            "'/>";
        }
      });

      document.getElementById("myeduc-appr").style.backgroundImage = "none";
      var refreshBtn = document.getElementsByClassName("refreshlist")[1];
      if (refreshBtn) {
        refreshBtn.disabled = false;
        refreshBtn.style.opacity = "1";
        refreshBtn.style.pointerEvents = "auto";
      }
    },
  );
}

function showeduin(label) {
  const edulincn = document.getElementById("edulivwn");
  edulincn.style.display = "none !important";
  $("#showedpro,#showedprotod,#edtdstrfulsr").empty();
  $("#connected1").empty();
  $("#connected2").empty();
  $("#edunlink").empty();
  $("#edullink").empty();
  $(".srvcdived").html("");
  $(".srvcdived").css({
    background: "linear-gradient(-75deg, #e2e2e2ef,#c2c2c2,#e2e2e2)",
    animation: "gradient 2s ease infinite",
    backgroundSize: "400% 400%",
    borderRadius: "10px",
  });
  $("#showedpro,#showedprotod").css({
    background: "linear-gradient(-75deg, #e2e2e2c7,#c2c2c2c7,#e2e2e2c7)",
    animation: "gradient 2s ease infinite",
    backgroundSize: "400% 400%",
    borderRadius: "10px",
  });
  document.getElementById("eduproste").style.display = "block";
  document.getElementById("rc-widget").style.display = "block";
  var list = document.getElementsByClassName("edproclroomfin");
  list = [].slice.call(list);
  var posofinput = list.indexOf(label);
  var x = document.getElementsByClassName("eduprewid");
  var eduprid = x[posofinput].value;
  document.getElementById("eduidst").value = eduprid;
  document.getElementById("posofst").value = posofinput;

  var eduid = $("#eduidst").val();
  var studid = $("#stuidst").val();

  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbwfUEZLg7qSCu4jGwIRugGKaBdoEmlvTxxevb-jM8naLQBNZnfOVYEmQ-uvOj7_E10U";
  var url =
    ur1 +
    ur2 +
    "/exec" +
    "?action=edrdindv&edid=" +
    eduid +
    "&callback=myedctr";
  jQuery.ajax({
    crossDomain: true,
    url:
      "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    method: "GET",
    dataType: "jsonp",
  });
}

function myedctr(e) {
  const edulincn = document.getElementById("edulivwn");
  if (e.records != "ID not found!") {
    const res = e.records;
    document.getElementById("showedpro").innerHTML =
      "<div class='edproindv'><span id='alstds'></span><span class='ednametitle' id='mednam'>" +
      res.FName +
      " " +
      res.LName +
      "</span><img class='edpropic' src='" +
      res.ProfilePic +
      "'><br> &#8226; " +
      res.Subject +
      " &#8226; " +
      res.Class +
      " &#8226; " +
      res.Board +
      "<br> &#8226; <a href='mailto:" +
      res.Email +
      "'>" +
      res.Email +
      "</a>" +
      " &#8226; <a href=tel:" +
      res.CountryCode +
      res.PhoneNo +
      ">+" +
      res.CountryCode +
      " " +
      res.PhoneNo +
      "</a></div><input class='eduprewid' style='display: none;' value='" +
      res.CardId +
      "'/>";
    edulincn.style.display = "inline-block !important";
    edulincn.addEventListener("click", (event) => {
      var edrmcht = btoa(document.getElementById("eduidst").value);
      var stnnmm = document.querySelector("#avtrbrdname").innerText;
      var webchtst =
        "https://webchat.amrit-corp.com/room.html?room=" +
        edrmcht +
        "&user=" +
        stnnmm;
      var edwebcht =
        "https://live.mastrowall.com/webchat.amrit/?mlive=" +
        window.btoa(webchtst);

      window.open(
        edwebcht,
        "_blank",
        "location=center,height=670,width=1600,left=0,top=100,scrollbars=yes,status=yes",
      );
    });

    if (res.Connectivity != "") {
      var Go = JSON.parse(res.Connectivity);
      var totalConnect = Go.idConnect.length;
      var j = 0;
      for (var prop in Go.idConnect) {
        document.getElementById("connected1").innerHTML =
          '<a href="tel:' +
          Go.idConnect[0] +
          '"><img class="connectIcon" src="' +
          Go.Connect[0] +
          '"></a><a href="mailto:' +
          Go.idConnect[1] +
          '"><img class="connectIcon" src="' +
          Go.Connect[1] +
          '"></a>';
      }
      for (j = 2; j < totalConnect; j++) {
        document.getElementById("connected2").innerHTML +=
          '<a target="_blank" href="' +
          Go.idConnect[j] +
          '"><img class="connectIcon" src="' +
          Go.Connect[j] +
          '"></a>';
      }
    } else {
      document.getElementById("connected1").innerHTML =
        '<p class="noconempty">Live Connectivity not updated!</p>';
    }
    if (res.TOD != "") {
      var TOD = decodeURIComponent(res.TOD);
      var singlest = TOD.split("{td},");
      var lenstr = singlest.length;
      for (var w = 0; w < lenstr - 1; w++) {
        document.getElementById("showedprotod").innerHTML +=
          '<div class="wrapTOD"><div class="card">' +
          '<img class="card-img-top" onerror="this.style.display=`none`" src="' +
          singlest[w + 4] +
          '"><div class="card-body"><h4>' +
          singlest[w + 1] +
          '</h4></div> <div class="card-footer" style="text-align:left;"><p>' +
          singlest[w + 2] +
          '</p></div> </div></div><input class="topictdid" style="display: none;" value="' +
          singlest[w] +
          '"><br><hr class="edprevtodhr">';
        document.getElementById("edtdstrfulsr").innerHTML +=
          '<div class="wrapTODfl"><div class="card">' +
          '<img class="card-img-top" src="' +
          singlest[w + 3] +
          '"><div class="card-body"><h4>' +
          singlest[w + 1] +
          '</h4></div> <div class="card-footer" style="text-align:left;"><p>' +
          singlest[w + 2] +
          '</p></div> </div></div><input class="topictdid" style="display: none;" value="' +
          singlest[w] +
          '"><br><hr class="edprevtodhr">';
        w = w + 3;
      }
    } else {
      document.getElementById("showedprotod").innerHTML =
        '<div class="nocontenttod"><svg xmlns="http://www.w3.org/2000/svg" style="color:#8a8a8b;" width="60" height="60" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">' +
        '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
        '<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>' +
        '<br><h5 style="color:#474749;font-size:16px;">No Recent Topic Updated</h5></div>';
      document.getElementById("edtdstrfulsr").innerHTML =
        '<div class="nocontenttod"style="max-width:1000px;"><svg xmlns="http://www.w3.org/2000/svg" style="color:#8a8a8b;" width="60" height="60" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">' +
        '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
        '<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>' +
        '<br><h5 style="color:#474749;font-size:16px;">No Recent Topic Updated</h5></div>';
    }
    var closeButtonflsrcn = document.createElement("button");
    closeButtonflsrcn.innerHTML = "&times;";
    closeButtonflsrcn.id = "closeButtonflsrcn";
    closeButtonflsrcn.addEventListener("click", function () {
      document.getElementById("edtdstrfulsr").style.display = "none";
    });

    document.getElementById("edtdstrfulsr").appendChild(closeButtonflsrcn);

    if (res.ExternalNoteId != 0) {
      document.getElementById("showedulink").style.display = "block";
      document.getElementById("edunlink").innerHTML =
        '<a class="edulink" target="_blank" href="' +
        res.ExternalNoteId +
        '">Notes</a>';
    } else {
      document.getElementById("showedulink").style.display = "block";
      document.getElementById("edunlink").innerHTML =
        '<button class="edulinkempt" disabled>Empty</button>';
    }
    if (res.ExternalLecId != 0) {
      document.getElementById("showedulink").style.display = "block";
      document.getElementById("edullink").innerHTML =
        '<a class="edulink" target="_blank" href="' +
        res.ExternalLecId +
        '">Lectures</a>';
    } else {
      document.getElementById("showedulink").style.display = "block";
      document.getElementById("edullink").innerHTML =
        '<button class="edulinkempt" disabled>Empty</button>';
    }
    rfshcmnt();
    var allstudnt = res.StuAppr.split(",");
    var nofallstd = allstudnt.length - 1;
    var alltds = res.AllTOD.split("{td},");
    var nofaltd = (alltds.length - 1) / 3;
    var allotexm = res.AllExam.split("{ex},");
    var nofotexm = (allotexm.length - 1) / 3;
    var allcmnt = res.Comments.split("{-/},");
    var nofedcmnt = (allcmnt.length - 1) / 6;
    document.getElementById("showedsrvc").innerHTML = `
  <div class="srvcdived">
  <img src="images/edsrvc/linkins.png">
  <p id="allnks">LinkIns</p>
  </div>
  <div class="srvcdived">
  <img src="images/edsrvc/tods.png">
  <p id="altds">TOD Store</p>
  </div>
  <div class="srvcdived">
  <img src="images/edsrvc/ontest.png">
  <p id="svdontst">Saved Test</p>
  </div>
  <div class="srvcdived">
  <img src="images/edsrvc/cmnts.png">
  <p id="allcmnts">Comments</p>
  </div>`;
    document.getElementById("alstds").innerHTML =
      "Approved Students " + "(" + nofallstd + ")";
    document.getElementById("allnks").innerHTML = "LinkIns";
    document.getElementById("altds").innerHTML =
      "TOD Store " + "(" + nofaltd + ")";
    document.getElementById("svdontst").innerHTML =
      "Saved Test " + "(" + nofotexm + ")";
    totlcmnt(nofedcmnt);
    var elemed = document.createElement("div");
    elemed.class = "crtelem";
    elemed.id = "crtelem";
    $("body").append(elemed);

    document
      .getElementsByClassName("srvcdived")[1]
      .addEventListener("click", function () {
        if (nofaltd == 0) {
          return false;
        } else {
          $("#crtelem").empty();
          $("#crtelem").slideDown();
          document.getElementById("crtelem").innerHTML =
            '<center><span class="clssrvccon" onclick="document.getElementById(`crtelem`).style.display=`none`;">&times;</span></center>';
          var srno = 1;
          for (var k = 0; k < alltds.length - 1; k += 3) {
            var elemtds = document.createElement("div");
            elemtds.innerHTML +=
              '<center><div class="srvcconone">' +
              '<div style="padding:8px;"><p style="text-align:right;color:#555;border-bottom:1px solid #555;padding-bottom:4px;"><b>TOD No. ' +
              srno +
              '</b></p><div><p><span><i>Remarks: </i></span><span class="edtdcmnt">' +
              JSON.parse(alltds[k + 2]) +
              '</span></p><font size="2"><p>ID: ' +
              JSON.parse(alltds[k]) +
              " Key: " +
              JSON.parse(alltds[k + 1]) +
              "</p></font></div></div>" +
              '<input class="tdstdcid" style="display:none;" value="' +
              JSON.parse(alltds[k]) +
              '"/><input class="tdstdkeyid" style="display:none;" value="' +
              JSON.parse(alltds[k + 1]) +
              '"/>' +
              '<button class="btn btn-primary viewtds" onclick="viewstods(this)">View</button>' +
              '<button class="btn btn-warning stortds" onclick="storstods(this)">Store</button></div><center>';
            srno = srno + 1;
            $("#crtelem").append(elemtds);
          }
        }
      });

    document
      .getElementsByClassName("srvcdived")[2]
      .addEventListener("click", function () {
        if (nofotexm == 0) {
          return false;
        } else {
          $("#crtelem").empty();
          $("#crtelem").slideDown();
          document.getElementById("crtelem").innerHTML =
            '<center><span class="clssrvccon" onclick="document.getElementById(`crtelem`).style.display=`none`;">&times;</span></center>';
          var srno = 1;
          for (var k = 0; k < allotexm.length - 1; k += 3) {
            var examId = allotexm[k];
            var examPass = allotexm[k + 1];
            var elemtds = document.createElement("div");

            var isEnrolled = false;
            document
              .querySelectorAll(".exam-card .enrldexmid")
              .forEach((input) => {
                if (input.value === examId) {
                  isEnrolled = true;
                }
              });

            elemtds.innerHTML +=
              '<center><div class="srvcconone">' +
              '<div style="padding:8px;"><p style="text-align:right;color:#555;border-bottom:1px solid #555;padding-bottom:4px;"><b>Exam No. ' +
              srno +
              "</b></p><div><p>" +
              allotexm[k + 2] +
              '</p><font size="2"><p>Exam ID: ' +
              allotexm[k] +
              " Pass: " +
              allotexm[k + 1] +
              "</p></font></div></div><p class='btnassgnst'><button class='btn btn-warning' onclick='enrollassignst(`" +
              allotexm[k] +
              "`,`" +
              allotexm[k + 1] +
              "`,this)'" +
              (isEnrolled ? "disabled" : "") +
              ">Enroll / Assign</button></p>" +
              "</div><center>";
            srno = srno + 1;
            $("#crtelem").append(elemtds);
          }
        }
      });

    document
      .getElementsByClassName("srvcdived")[0]
      .addEventListener("click", function () {
        var edtc = $("#eduidst").val();
        var tdkid = window.btoa(edtc);
        var newlk = "https://mastrowall.com/linkins/?srvc=true&ed=" + tdkid;
        $("#crtelem").empty();
        $("#crtelem").slideDown();
        document.getElementById("crtelem").innerHTML =
          '<center><span class="clssrvccon" onclick="document.getElementById(`crtelem`).style.display=`none`;">&times;</span></center>';
        var elemtds = document.createElement("div");
        elemtds.innerHTML =
          '<center><div class="srvcconone"><iframe frameborder="0" style="width:100%;height:100%;overflow-y:auto;background:#555;" src="' +
          newlk +
          '"></iframe></div></center>';
        $("#crtelem").append(elemtds);
      });
    document
      .getElementsByClassName("srvcdived")[3]
      .addEventListener("click", function () {
        $("#crtelem").empty();
        $("#crtelem").hide();
        $("#clsrmcmntbox").slideDown("fast");
      });
    document.getElementById("showedpro").style.background = "transparent";
    document.getElementById("showedprotod").style.background = "transparent";
    $(".srvcdived").css("background", "white");
  }
}
$("#clscmntbx").click(function () {
  $("#clsrmcmntbox").slideUp("fast");
});
$("#rfshcmntbx").click(function () {
  rfshcmnt();
});

clsrmcmntfm.addEventListener("submit", (event) => {
  $("#subcmntbx").attr("disabled", true);
  var nmF = document.getElementById("mednamst").innerText;
  var primg = document.getElementById("ppicstu").src;
  var cmcon = encodeURIComponent(JSON.stringify($("#medcmmnt").val()));
  var edid = window.btoa($("#eduidst").val());
  var d = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var cTime =
    days[d.getDay()] +
    ", " +
    months[d.getMonth()] +
    " " +
    d.getDate() +
    " - " +
    d.getFullYear();
  var cmnd =
    Math.random().toString(26).substring(2, 6) +
    Math.random().toString(26).substring(2, 6);
  var strlen = cmcon.length;
  if (strlen < 400) {
    var ur1 = "https://script.google.com/macros/s/";
    var ur2 =
      "AKfycbz0Okd0T9pMS-Q4nLUstxONTlswNXbKu4qUud4tfge6_ToM0uQZQxda5SrpcRPNUsCKrA";
    var url =
      ur1 +
      ur2 +
      "/exec" +
      "?callback=ctrlqcmnt&cmid=" +
      cmnd +
      "&cdid=" +
      edid +
      "&cttm=" +
      cTime +
      "&ccon=" +
      cmcon +
      "&cnam=" +
      nmF +
      "&cpic=" +
      primg +
      "&action=mcmnt";
    var request = $.ajax({
      crossDomain: true,
      url: url,
      method: "GET",
      dataType: "jsonp",
    });
  } else {
    $("#subcmntbx").attr("disabled", false);
    return false;
  }
  $("#subcmntbx").attr("disabled", false);
  clsrmcmntfm.reset();
});
document.getElementById("medcmmnt").addEventListener("input", checkchlimit);
function checkchlimit() {
  var subcmntbx = document.getElementById("subcmntbx");
  var strmn = encodeURIComponent(JSON.stringify($("#medcmmnt").val()));
  var length = strmn.length;
  if (length > 400) {
    subcmntbx.value = "Character limit exceeded!";
    subcmntbx.disabled = true;
  } else {
    subcmntbx.value = "Submit";
    subcmntbx.disabled = false;
  }
}
function ctrlqcmnt(e) {
  document.getElementById("rfrshcmtsv").style.animation = "none";
  $("#rfshcmntbx").prop("disabled", false);
  $("#rfshcmntbx").css("pointer-events", "auto").css("opacity", "1");
  var cmelm = e.result.split("{-/},");
  var cmntlen = cmelm.length;
  var comlem = document.getElementById("divcmntbx");
  totlcmnt((cmntlen - 1) / 6);
  var nmF = document.getElementById("mednam").innerText;
  if (cmntlen > 6) {
    $("#divcmntbx").empty();
    for (var k = 0; k <= cmntlen - 1; k += 6) {
      comlem.innerHTML +=
        '<center><div class="edcmnt"><span class="delcmnted" onclick="deletecmnted(this)">Delete</span><input class="cmntidval" style="display:none;"value="' +
        cmelm[k] +
        '"><div class="cmntinfo"><p class="cmmntor"><span class="cmntrimg"><img src="' +
        cmelm[k + 4] +
        '"></span><span class="cmnttrnm">' +
        cmelm[k + 3] +
        '</span></p><p class="cmnttim">' +
        cmelm[k + 2] +
        "</p></div>" +
        '<div class="cmntcon">' +
        JSON.parse(cmelm[k + 5]) +
        "</div>" +
        "</div><hr><center>";
      if (cmelm[k + 3] == nmF) {
        document
          .getElementsByClassName("edcmnt")
          [k / 6].classList.add("stcmnt");
      }
      document
        .getElementsByClassName("delcmnted")
        [k / 6].classList.add("cntdlt");
    }
  } else {
    comlem.innerHTML =
      '<center><div class="nocmntedc"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">' +
      '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
      '<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>' +
      "<br><h5>Empty</h5></div></center>";
  }
}

function deletecmnted(label) {
  var list = document.getElementsByClassName("delcmnted");
  list = [].slice.call(list);
  var posof = list.indexOf(label);
  var x = document.getElementsByClassName("cmntidval");
  document.getElementsByClassName("edcmnt")[posof].classList.add("loading");
  var cmid = x[posof].value;
  var edid = window.btoa($("#eduidst").val());
  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbz0Okd0T9pMS-Q4nLUstxONTlswNXbKu4qUud4tfge6_ToM0uQZQxda5SrpcRPNUsCKrA";
  var url =
    ur1 +
    ur2 +
    "/exec" +
    "?callback=ctrlqcmnt&cmid=" +
    cmid +
    "&cdid=" +
    edid +
    "&action=dcmnt";
  var request = $.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });
}

function rfshcmnt() {
  document.getElementById("rfrshcmtsv").style.animation = "spin 2s infinite";
  $("#rfshcmntbx").prop("disabled", true);
  $("#rfshcmntbx").css("pointer-events", "none").css("opacity", "0.5");
  var edid = window.btoa($("#eduidst").val());
  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbz0Okd0T9pMS-Q4nLUstxONTlswNXbKu4qUud4tfge6_ToM0uQZQxda5SrpcRPNUsCKrA";
  var url =
    ur1 + ur2 + "/exec" + "?callback=ctrlqcmnt&cdid=" + edid + "&action=rcmnt";
  var request = $.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });
}

function totlcmnt(nof) {
  document.getElementById("allcmnts").innerHTML = "Comments " + "(" + nof + ")";
}

function viewstods(label) {
  var list = document.getElementsByClassName("viewtds");
  list = [].slice.call(list);
  var posofinput = list.indexOf(label);
  var x = document.getElementsByClassName("tdstdcid");
  var y = document.getElementsByClassName("tdstdkeyid");
  var tdid = window.btoa(x[posofinput].value);
  var tdkid = window.btoa(y[posofinput].value);
  var newlk =
    "https://tods.mastrowall.com?topictd=" +
    tdid +
    "&tdkey=" +
    tdkid +
    "&td=valid";
  window.open(
    newlk,
    "_blank",
    "location=center,height=670,width=1600,left=0,top=100,scrollbars=yes,status=yes",
  );
}

function storstods(label) {
  var list = document.getElementsByClassName("stortds");
  $(".stortds").attr("disabled", true);
  list = [].slice.call(list);
  var allsttd = document.getElementsByClassName("tdcid");
  var posofinput = list.indexOf(label);
  var x = document.getElementsByClassName("tdstdcid");
  var y = document.getElementsByClassName("tdstdkeyid");
  var z = document.getElementsByClassName("edtdcmnt");
  var tdid = JSON.stringify(x[posofinput].value);
  var tdkid = JSON.stringify(y[posofinput].value);
  var tdcmnt = JSON.stringify(z[posofinput].innerHTML);
  var studid = $("#stuidst").val();
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
      "?callback=edtdstrd&todid=" +
      tdid +
      "&todpass=" +
      tdkid +
      "&todcmnt=" +
      tdcmnt +
      "&stuid=" +
      studid +
      "&action=rdtod";
    var request = jQuery.ajax({
      crossDomain: true,
      url: url,
      method: "GET",
      dataType: "jsonp",
    });
  } else if (flag === 1) {
    const div = document.createElement("div");
    div.id = "notfycl";
    div.innerHTML = "TOD already stored!";
    document.body.appendChild(div);
    setTimeout(function () {
      $(div).slideUp();
    }, 2000);
    $(".stortds").attr("disabled", false);
  }
}

function edtdstrd(e) {
  $(".stortds").attr("disabled", false);
  var nwelm = document.createElement("div");
  nwelm.id = "edtdstrds";
  nwelm.class = "edtdstrds";
  nwelm.innerHTML = "TOD Stored";
  $("body").append(nwelm);
  $("#edtdstrds").slideDown();
  setTimeout(function () {
    $("#edtdstrds").slideUp();
  }, 4000);
  storedtods();
}
$(".clssrvccon").click(function () {
  $("#crtelem").slideUp();
});

$("#fullscrntod").click(function () {
  $("#edtdstrfulsr").slideDown("fast");
});

let sketchLoaded = false;
let sciclcLoaded = false;
$("#opnsktch,#sketchdrw").click(function () {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    window.open(
      "https://sketch.mastrowall.com",
      "_blank",
      "width=400,height=700,scrollbars=yes,status=yes",
    );
    return;
  }

  if ($("#sketchContainer").length === 0) {
    const container = $(`
      <div id="sketchContainer" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:999999; background:#fff;">
        <button id="closeSketch" style="position:absolute; top:0px; right:10px; z-index:10000; padding:3px 10px; background:#f44336; color:white; border:none; border-bottom-right-radius:5px; border-bottom-left-radius:5px; cursor:pointer; font-size:16px; outline:none;">✕</button>
        <iframe id="sketchFrame" style="width:100%; height:100%; border:none;"></iframe>
      </div>
    `);
    $("body").append(container);

    $(document).on("click", "#closeSketch", function () {
      $("#sketchContainer").hide();
    });
  }

  $("#sketchContainer").show();

  if (!sketchLoaded) {
    $("#sketchFrame").attr("src", "https://sketch.mastrowall.com");
    sketchLoaded = true;
  }
});

$("#sciclc,#clsrmcal").click(function () {
  if ($("#sciclcContainer").length === 0) {
    const container = $(`
      <div id="sciclcContainer" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:999999; background:#fff;">
        <button id="closeSciclc" style="position:absolute; top:0px; right:10px; z-index:10000; padding:3px 10px; background:#f44336; color:white; border:none; border-bottom-right-radius:5px; border-bottom-left-radius:5px; cursor:pointer; font-size:16px; outline:none;">✕</button>
        <iframe id="sciclcFrame" style="width:100%; height:100%; border:none;"></iframe>
      </div>
    `);
    $("body").append(container);

    $(document).on("click", "#closeSciclc", function () {
      $("#sciclcContainer").hide();
    });
  }

  $("#sciclcContainer").show();

  if (!sciclcLoaded) {
    $("#sciclcFrame").attr("src", "https://scicalc.mastrowall.com");
    sciclcLoaded = true;
  }
});

/////////////////Calender////////////////
var isRequestInProgress = false;
function getcalendar() {
  var calendarEl = document.getElementById("calendar");
  var preevent = $("#allsvevnt").val();
  var elemev = preevent.split("{e},");
  var eventsup = [];
  for (var i = 0; i < elemev.length - 1; i += 3) {
    var entry = {};
    entry.title = JSON.parse(decodeURIComponent(elemev[i]));
    entry.start = JSON.parse(elemev[i + 1]);
    entry.end = JSON.parse(elemev[i + 2]);
    eventsup.push(entry);
  }
  var date = new Date();
  var tois = date.toISOString();
  var flcaldate = tois.substring(0, 10);
  var calendar = new FullCalendar.Calendar(calendarEl, {
    aspectRatio: 1,
    initialView: "listYear",
    headerToolbar: {
      center: "title",
      right: "dayGridYear,dayGridMonth,timeGridDay,timeGridWeek,listYear",
      left: "prev,next",
    },
    views: {
      listYear: { buttonText: "📃" },
      dayGridYear: { buttonText: "YY" },
      dayGridMonth: { buttonText: "MM" },
      timeGridDay: { buttonText: "DD" },
      timeGridWeek: { buttonText: "W" },
    },
    initialDate: flcaldate,
    navLinks: true,
    weekNumbers: true,
    weekNumberCalculation: "ISO",
    selectable: true,
    selectMirror: true,
    select: function (arg) {
      var title = prompt("Event Title:");
      var checkstr = function (title) {
        var fl1 = title.split('"');
        var fl2 = title.split("e}");
        if (fl1[1] != null || fl2[1] != null) {
          return true;
        }
      };
      if (title != "" && checkstr(title) != true) {
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        });
        var t = JSON.stringify(encodeURIComponent(title));
        var s = JSON.stringify(arg.start.toISOString());
        var e = JSON.stringify(arg.end.toISOString());
        var k = "{e},";
        var evnt = t + k + s + k + e + k;
        var email1 = $("#email").val();
        var pass = $("#pcodeStu").val();
        var ur1 = "https://script.google.com/macros/s/";
        var ur2 =
          "AKfycbxJ4c20CgHr73ZIARWQfeXU5qSxHApmiE0rJBBaQ4nswWQYW-m4wfP24741to6l3qbQ";
        var url =
          ur1 +
          ur2 +
          "/exec" +
          "?callback=ctrlqevsv&usem=" +
          email1 +
          "&usid=" +
          pass +
          "&event=" +
          evnt +
          "&action=upevnt";
        var request = jQuery.ajax({
          crossDomain: true,
          url: url,
          method: "GET",
          dataType: "jsonp",
        });
      }
      calendar.unselect();
    },
    eventClick: function (arg) {
      if (isRequestInProgress) {
        alert("Please wait, a request is already in progress.");
        return;
      }

      if (confirm("Are you sure you want to delete this event?")) {
        isRequestInProgress = true;
        var waitingDiv = $(
          '<div id="waitingMessageCL">Please wait, processing...</div>',
        );
        $("#calendar").append(waitingDiv);
        arg.event.remove();
        var tt = JSON.stringify(encodeURIComponent(arg.event.title));
        var st = JSON.stringify(arg.event.start.toISOString());
        var et = JSON.stringify(arg.event.end.toISOString());
        var kt = "{e},";
        var delitm = tt + kt + st + kt + et + kt;
        var email1 = $("#email").val();
        var pass = $("#pcodeStu").val();
        var ur1 = "https://script.google.com/macros/s/";
        var ur2 =
          "AKfycbxJ4c20CgHr73ZIARWQfeXU5qSxHApmiE0rJBBaQ4nswWQYW-m4wfP24741to6l3qbQ";
        var url =
          ur1 +
          ur2 +
          "/exec" +
          "?callback=ctrlqevrmv&usem=" +
          email1 +
          "&usid=" +
          pass +
          "&event=" +
          delitm +
          "&action=rmvevnt";
        var request = jQuery.ajax({
          crossDomain: true,
          url: url,
          method: "GET",
          dataType: "jsonp",
          complete: function () {
            isRequestInProgress = false;
            $("#waitingMessageCL").remove();
          },
        });
      }
    },
    // editable: true,
    dayMaxEvents: true,
    events: eventsup,
  });
  calendar.render();
}
function ctrlqevsv(e) {
  inwallStu();
}
function ctrlqevrmv(e) {
  isRequestInProgress = false;
  $("#waitingMessageCL").remove();
  inwallStu();
}
$("#sdmntwo").click(function () {
  $("#calcontain").slideDown();
});
$("#clscal").click(function () {
  $("#calcontain").slideUp();
});

function genenrollid() {
  var k =
    Math.random().toString(26).substring(2, 7) +
    Math.random().toString(26).substring(2, 7);
  document.getElementById("enrollid").value = k;
}

function enrollassignst(examid, epass, btn) {
  // btn is the button element that was clicked
  if (!btn) return;

  // Confirm dialog
  const confirmEnroll = confirm(
    "Are you sure you want to enroll/assign this exam?",
  );
  if (!confirmEnroll) return; // Stop if user cancels

  // Disable the button immediately
  btn.disabled = true;
  btn.textContent = "Enrolling...";
  btn.classList.add("btn-enrolling");

  // Collect student info
  var stuid = encodeURIComponent($("#stuid").val());
  var namestu = encodeURIComponent(
    JSON.stringify(document.getElementById("avtrbrdname").textContent),
  );
  var eid = encodeURIComponent(JSON.stringify($("#email").val()));
  var enid = encodeURIComponent(
    JSON.stringify(
      Math.random().toString(26).substring(2, 7) +
        Math.random().toString(26).substring(2, 7),
    ),
  );

  // Build URL
  var url1 = "https://script.google.com/macros/s/";
  var url2 =
    "AKfycbwTJipEONSrXhEI3X0Mg-OkPoR8MR7rPooXOTSfnspXTijEdz9hP0gTVQPISy8cPAFr";
  var url =
    url1 +
    url2 +
    "/exec" +
    "?callback=ctrlq&exid=" +
    examid +
    "&expass=" +
    JSON.stringify(epass) +
    "&stuname=" +
    namestu +
    "&stueid=" +
    eid +
    "&enrollid=" +
    enid +
    "&stuid=" +
    stuid +
    "&action=gentestenroll";

  // AJAX request
  $.ajax({
    crossDomain: true,
    url:
      "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    method: "GET",
    dataType: "jsonp",
    jsonp: "callback",
  });
}

// Simple JS notification function
function showNotification(message, type) {
  const notif = document.createElement("div");
  notif.textContent = message;
  notif.style.position = "fixed";
  notif.style.top = "20px";
  notif.style.right = "20px";
  notif.style.padding = "12px 20px";
  notif.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336";
  notif.style.color = "#fff";
  notif.style.borderRadius = "0px";
  notif.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  notif.style.zIndex = 100000;
  notif.style.fontFamily = "sans-serif";
  notif.style.fontSize = "16px";
  notif.style.opacity = 0;
  notif.style.transition = "opacity 0.3s ease";

  document.body.appendChild(notif);

  // Fade in
  setTimeout(() => (notif.style.opacity = 1), 10);
  // Auto remove after 3 seconds
  setTimeout(() => {
    notif.style.opacity = 0;
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

function ctrlq(e) {
  const btn = document.querySelector(".btn-enrolling");
  if (e.result === "Value updated successfully!") {
    getenrolledexm();
    showNotification("Enrollment successful!", "success");
    if (btn) btn.textContent = "Enroll/ Assign";
  } else {
    showNotification("Enrollment failed. Try again.", "error");
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Enroll / Assign";
    }
  }
}
function getenrolledexm() {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbzn36BI7hLV1wYljOfGQQyHxmPbQ2KY7aI7vP2hBHH6Vz3yd4pIIajk9_GMgk5ZD_yF/exec";
  const email = $("#email").val().trim();

  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  const url = `${scriptUrl}?action=getenrolled&email=${encodeURIComponent(
    email,
  )}&callback=ctrlqenrldt`;

  jQuery.ajax({
    crossDomain: true,
    url:
      "https://api.amrit-corp.com/_header/gate/mastrowall/?target_url=" +
      encodeURIComponent(url),
    method: "GET",
    dataType: "jsonp",
  });
}
let exams = [];
function ctrlqenrldt(e) {
  if (e.status === "success" && e.enrolled_exams) {
    try {
      exams = JSON.parse(e.enrolled_exams);
    } catch (err) {
      console.error("Invalid JSON format:", err);
      return;
    }

    showEnrolledExams(exams);
  } else {
    document.getElementById("exam-list").innerHTML =
      `<p class='nenrlexm'><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="#76767674"><path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>No enrolled exams found.</p>`;
    document.querySelectorAll(".ttlenrexms").forEach((el) => {
      el.textContent = "(0)";
    });
  }
}

function showEnrolledExams(data) {
  const container = document.getElementById("exam-list");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No enrolled exams found.</p>";
    document.querySelectorAll(".ttlenrexms").forEach((el) => {
      el.textContent = "(0)";
    });
    return;
  }

  function trimText(text) {
    const maxLen = window.innerWidth < 768 ? 35 : 70;
    return text.length > maxLen ? text.substring(0, maxLen) + "..." : text;
  }
  document.querySelectorAll(".ttlenrexms").forEach((el) => {
    el.textContent = "(" + data.length + ")";
  });
  data.forEach((exam) => {
    let enrollId = exam.f;
    try {
      enrollId = JSON.parse(exam.f);
    } catch (err) {
      enrollId = exam.f.replace(/['"]+/g, "");
    }
    var isListed = false;
    document.querySelectorAll(".savevexmdiv .emxidsvdbrd").forEach((el) => {
      if (el.textContent.trim() === exam.a) {
        isListed = true;
      }
    });
    const card = document.createElement("div");
    card.className = "exam-card";

    card.innerHTML = `
      <h3>
        <span class="title-text" data-full="${exam.b}">${trimText(
          exam.b,
        )}</span>
        <span>${exam.s === "NA" ? "Not Completed ⛔" : "Completed ✅"}</span>
      </h3><input type="hidden" readonly class="enrldexmid" value="${exam.a}">
      <p><b>Description:</b> ${exam.c}</p>
      <p><b>Duration:</b> ${exam.d}</p>
      <p><b>Instructor:</b> ${exam.e}</p>
      <p><b>Enrolled ID:</b> ${enrollId}</p>
      <p><b>Exam Pass:</b> ${JSON.parse(exam.p)}</p>
      <p><b>Enrolled on:</b> ${new Date(exam.g).toLocaleString()}</p>

      <div class="enrlexmbtngrp">
        <button class="go-btn" 
          onclick="goToTest('${exam.a}', '${enrollId}', '${JSON.parse(
            exam.p,
          )}')" 
          ${exam.s !== "NA" ? "disabled" : ""}>
          Go to Test
        </button>

        <button class="chekex-btn" 
         onclick="checkresltst('${exam.a}', '${enrollId}')" 
          ${exam.s === "NA" ? "disabled" : ""}>
          Check Result
        </button>

    

        <button class="addtobrd" 
          ${isListed || exam.s === "NA" ? "disabled" : ""}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg> 
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

//  <button class="chekpr-btn"
//          onclick="checkperformnc('${exam.a}', '${JSON.parse(exam.p)}')"
//           ${exam.s === "NA" ? "disabled" : ""}>
//           Performance
//         </button>

// Resize handler
window.addEventListener("resize", () => {
  document.querySelectorAll(".title-text").forEach((el) => {
    const fullText = el.dataset.full || el.textContent;
    const maxLen = window.innerWidth < 768 ? 35 : 70;
    el.textContent =
      fullText.length > maxLen
        ? fullText.substring(0, maxLen) + "..."
        : fullText;
  });
});

// Handle "Go to Test" button click
function goToTest(examId, enrollId, pass) {
  alert(`Opening test for Exam ID: ${examId} | Enroll ID: ${enrollId}`);
  // Example redirect:
  window.open(
    `https://mastrowall.com/online-test/?id=${btoa(examId)}&enroll=${btoa(
      enrollId,
    )}&pass=${btoa(pass)}&valid=true`,
    "_blank",
  );
}

function checkresltst(exmid, enrid) {
  $(".exmenrlddv").hide();
  document.getElementById("checkexamid").value = exmid;
  document.getElementById("chechenid").value = enrid;
  $(".experformsubmit").click();
}
