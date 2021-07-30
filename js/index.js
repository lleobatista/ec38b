var nav = document.getElementById("nav");
var nav2 = document.getElementById("nav2");
var y = nav.offsetTop;
var container = document.getElementById("aquiviu");
var url = '';
var firstName = document.getElementById("name-person");
var emailName = document.getElementById("email-person");
let save = document.getElementById("logar-bottom");


function show() {
    document.getElementById("name-person").style.display = localStorage.key(0);
    document.getElementById("email-person").style.display = localStorage.key(0);
    document.getElementById("logar-bottom").style.display = localStorage.key(0);
    document.getElementById("show-name-screen").innerHTML = localStorage.getItem(localStorage.key(0));
    document.getElementById("exit-bottom").style.display = localStorage.key(1);
}

function scrollFunction(){                                      //Para aparecer e desaparecer o botão quando o usuário descer a página.
    if(window.pageYOffset <= y + 150){                          //O botão referido é o PEÇA SEU CARTÃO.
        nav.classList.add("btn","btn-pink")
        nav.style.display = "flex"
        nav2.style.display = "none"
    } else {
          nav.style.display = "none"
          nav2.style.display = "block";
    }
}

function backClick(){
    document.getElementById("name-person").style.display = "flex";
    document.getElementById("email-person").style.display = "flex";
    document.getElementById("logar-bottom").style.display = "flex";
    document.getElementById("show-name-screen").innerHTML = "";
    document.getElementById("exit-bottom").style.display = "none";
    localStorage.clear();
}



function changeClick(){                                         //Para logar no perfil.
    data = {                                                    //Fazer o teste com e-mail: eve.holt@reqres.in e senha: cityslicka
        email: emailName.value,
        password: firstName.value
    }
    if(emailName.value == "" || firstName.value == ""){
        document.getElementById("show-name-screen").innerHTML = "Espaços em branco! Por favor digitar as informações";
    }
    else{
        xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("POST", "https://reqres.in/api/login", true);
        xhr.onload = function(){
            if(this.readyState == 4 && this.status == 200){
              var input1 = "none";
              var input2 = "Seja bem vindo(a) Eve";
              var input3 = "flex";
              localStorage.setItem(input1,input2);
              localStorage.setItem(input3, null);
              show();
            }
            else{
                document.getElementById("show-name-screen").innerHTML = "E-mail ou senha inválido";
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }
}


async function findStock(){                                       //Para encontrar uma ação, nesse caso estou utilizando axious.
    var equity = document.getElementById("stock-symbol");   //Para teste pode digitar os simbolos: IBM, gold, FB e entre outros.
    let res = await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ equity.value + '&apikey=XJIGDK89Z0MYT77D')
    var now = new Date();
    var monthToday = now.getMonth() + 1;
        if(monthToday < 10){
            monthToday = "0" + monthToday;
        }
        var today = now.getFullYear() + "-" + monthToday + "-" + now.getDate() ; //Pega o dia da consulta, as vezes pode não ter sido atualido.
        console.log(res.data);                                                   //Caso não estar atualizado, pegar uma data anterior.
        if(!res.data["Time Series (Daily)"]){                                    //A data precisa ser ANO-MÊS-DIA.
            document.getElementById("open-stock").innerHTML = "Ação não registrada."
            document.getElementById("high-stock").innerHTML = "";
            document.getElementById("low-stock").innerHTML = "";
            document.getElementById("close-stock").innerHTML = "";
            document.getElementById("symbol-stock").innerHTML = "";
        }else if (!res.data["Time Series (Daily)"][today]){
            document.getElementById("open-stock").innerHTML = "Dados não atualizados para a data de hoje."
            document.getElementById("high-stock").innerHTML = "";
            document.getElementById("low-stock").innerHTML = "";
            document.getElementById("close-stock").innerHTML = "";
            document.getElementById("symbol-stock").innerHTML = "";
        }else{
            var dataStock = res.data["Time Series (Daily)"][today];
            document.getElementById("stock-symbol").value = "";
            document.getElementById("symbol-stock").innerHTML = res.data["Meta Data"]["2. Symbol"];
            document.getElementById("open-stock").innerHTML = "Open: " + dataStock["1. open"];
            document.getElementById("high-stock").innerHTML = "High: " + dataStock["2. high"];
            document.getElementById("low-stock").innerHTML = "Low: " + dataStock["3. low"];
            document.getElementById("close-stock").innerHTML = "Close: " + dataStock["4. close"];
        }
}

show()
