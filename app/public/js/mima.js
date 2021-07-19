function pwd2() {
    document.getElementById("pw").innerHTML = "请填写6-12位的密码"
    document.getElementById("pw").style.color = "#999";

}
function pwd1() {
    p = document.getElementById("npsw").value;
    var numasc = 0;
    var charasc = 0;
    var otherasc = 0;
    if (p.length < 6 || p.length > 20) {
        document.getElementById("pw").innerHTML = "格式错误,请输入6-20位"
        document.getElementById("pw").style.color = "red";
    } else {
        for (var i = 0; i < p.length; i++) {
            var asciiNumber = p.substr(i, 1).charCodeAt();
            if (asciiNumber >= 48 && asciiNumber <= 57) {
                numasc += 1;
            }
            if ((asciiNumber >= 65 && asciiNumber <= 90) || (asciiNumber >= 97 && asciiNumber <= 122)) {
                charasc += 1;
            }
            if ((asciiNumber >= 33 && asciiNumber <= 47) || (asciiNumber >= 58 && asciiNumber <= 64) || (asciiNumber >= 91 && asciiNumber <= 96) || (asciiNumber >= 123 && asciiNumber <= 126)) {
                otherasc += 1;
            }
        }
        if (0 == numasc) {
            document.getElementById("pw").innerHTML = "密码必须含有数字"
            document.getElementById("pw").style.color = "red";
            return;
        } else if (0 == charasc) {
            document.getElementById("pw").innerHTML = "密码必须含有字母"
            document.getElementById("pw").style.color = "red";
            return;
        } else if (0 == otherasc) {
            document.getElementById("pw").innerHTML = "密码必须含有特殊字符"
            document.getElementById("pw").style.color = "red";
            return;
        } else {
            document.getElementById("pw").innerHTML = "√"
            document.getElementById("pw").style.color = "green";
            return;
        }
    }
}

function validate() {
    var qpw = document.getElementById("npsw").value;
    var qpw2 = document.getElementById("rpsw").value;
    console.log(qpw)
    if (qpw == qpw2 ) {
        document.getElementById("qpwtx").innerHTML = "<font color='green'>√</font>";
        //document.getElementById("button").disabled = false;
    }
    else {
        document.getElementById("qpwtx").innerHTML = "<font color='red'>两次密码不相同或者格式错误</font>";
        //document.getElementById("button").disabled = true;
    }
}