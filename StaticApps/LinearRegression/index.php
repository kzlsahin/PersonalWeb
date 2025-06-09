<!DOCTYPE html>

<html lang="tr">
<head>
    <meta charset="utf-8">
    <title>Mustafa Senturk</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta property="og:image" content="/images/featured-image.jpg">
	<meta property="og:image:type" content="image/jpeg">
	<meta name="description" content=" Mustafa Senturk's Personal Website">
	<meta name="keywords" content="educational, scripting, boat building, draft">
	<meta name="author" content="Mustafa Şentürk">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Licorice&family=Moon+Dance&family=Roboto+Slab:wght@300&display=swap" rel="stylesheet">


	<link href="/css/background.css" rel="stylesheet" />
	<link href="/css/navbarStyle.css" rel="stylesheet" />
	<link href="/css/footerStayle.css" rel="stylesheet" />
	<link href="/css/articleStyles.css" rel="stylesheet" />
    <link rel="stylesheet" href="styleSheet.css" type="text/css">

    </head>
    <header>

<?php

include("../nav-bar.php");
?>

</header>
<body>
    <h1>
         Example Page for Linear Regression
        </h1>
    <p>
        Linear Regression is a method to find an optimum line to a cloud of points appearingly in linear relation ship.<br><br>
        <i>Lineer Regresyon aralarında doğrusal bir ilişki olduğu görülen bir nokta bulutuna en uygun doğruyu bulma yöntemidir.</i>
        </p>
    <div clas="mainBlock">
        <table id="inputTable">
            <tr>
            <th>
                X Axis
            </th>
            <th>
                Y Axis
            </th>
            </tr>
            <tr>
            <th>
                0
            </th>
            <th>
                0.4
            </th>
            </tr>
           <tr>
            <th>
                1
            </th>
            <th>
                1.2
            </th>
            </tr>
            <tr>
            <th>
                2
            </th>
            <th>
                1.6
            </th>
            </tr>
            <tr>
            <th>
                3
            </th>
            <th>
                3.4
            </th>
            </tr>
            <tr>
            <th>
               4
            </th>
            <th>
               3.8
            </th>
            </tr>
            <tr>
            <th>
               5
            </th>
            <th>
                6.2
            </th>
            </tr>
            <tr>
            <th>
               6
            </th>
            <th>
                6.8
            </th>
            </tr>
            <tr>
            <th>
               7
            </th>
            <th>
                7.6
            </th>
            </tr>
            </table>
        </div>
        <div id="canvasDiv">
            <canvas class="cnvs" id="graphCanvas" width="600PX" height="350PX">
            </canvas>
        </div>
        <table id="line">
        <tr>
        <th>
        Value of W
        </th>
        <th>
        Value of b
        </th>
        <th>
        Loss
        </th>
        </tr>
        <tr>
        <th>
        <input type="range" id="wParameter" name="volW" min="-1" max="5" step="0.0001">
        </th>
        <th>
        <input type="range" id="bParameter" name="volB" min="-5" max="10" step="0.0001">
        </th>
        <th>
        Mean Squared Loss Function
        </th>
        </tr>
        <tr>
        <th>
        <input type="number" id="inputW">
        </th>
        <th>
        <input type="number" id="inputB">
        </th>
        <th id="lossOutput">
        -
        </th>
        </tr>
    </table>
    <div>
    <p class="mathEq">f(x) = w * x + b </p>
    </div>
    <button id="lineDrawButton" type="button" onclick="line.setDrawing()">draw line manually</button>
    <button id="lineRegression" type="button" onclick="line.startRegression()">calculate linear regression</button>
    <p id="differantials"></p>
    <br>
    <p>We are looking for the optimum line. Let the equation of the line be as w.x + b. So we are to find the best values of w and b. But first we should find a way to calculate how loose the line is. Square loss method is ideal for this.</p>
    <p><i>Optimum doğruyu arıyoruz. Doğru denklemimiz w.x + b olsun. W ve b'nin en iyi değerlerini bulacağız. Ama önce doğrunun ne kadar hatalı olduğunu hesaplayacak bir yol bulmalıyız. En küçük kareler yöntemi bunun için ideal bir yöntemdir.</i> </p>
    <p><i>hata fonksiyonu: kayıp = (denklemden elde edilen sonuç - gerçek değer)^2  şeklinde bulunur. Farkın karesinin alınması hatanın negatif çıkmaması içindir. Her bir girdi için hata hesaplanıp toplamı alınarak girdi sayısına bölündüğünde buna "mean squared loss" denir: karesi alınmış ortalama hata. </i></p>
    <p> loss = (1/n) * &#8721 (f(xi) - yi)^2 </p>
    <br>
        <script type="text/javascript" src="linearRegression.js"></script>
    
    </body>
    <footer>

        <section id="references">
            <div>Icons made by <a rel="nofollow" href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div>Icons made by <a rel="nofollow" href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div>Icons made by <a rel="nofollow" href="https://www.flaticon.com/authors/geekclick" title="GeekClick">GeekClick</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </section>
    
    
    
    
    </footer>
    <script type="text/javascript" src="/Scripts/setLanguagge.js"></script>
    
    </html>
