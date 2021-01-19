const ChartJSImage = require('chart.js-image');
var express = require('express');
var router = express.Router();
var query = `SELECT log.task,team.name as team, datetime(log.date,'localtime') as date, log.status, log.desc, user.user \
                FROM log, team, user \
                where log.user = user.id and team.id = user.team \
                and strftime("%m","now") = strftime("%m",log.date) \
                and strftime("%d","now") = strftime("%d",log.date)`;

router.get('/', function (req, res, next) {
    
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(__dirname + '/../repo.db');
    var response = "response : ";
    db.serialize(function () {
        db.all(query,[], function (err, data) {
            if (err) {
                console.log(err);
            }
            var counter=0;
            console.log(++counter);
            result();
            console.log(++counter);
            res.send(++counter + "");
            console.log(++counter);
        });
    });
    db.close();
});

module.exports = router;












function result() {
var myChart = new ChartJSImage().chart({
  type: 'bar',
  data: {
    labels: ["2015-01", "2015-02", "2015-03", "2015-04", "2015-05", "2015-06", "2015-07", "2015-08", "2015-09", "2015-10", "2015-11", "2015-12"],
    datasets: [{
      label: '# of Tomatoes',
      data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [  
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    scales: {
      xAxes: [{
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
          gridLines: {
          offsetGridLines: true // à rajouter
        }
      },
      {
        position: "top",
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
        gridLines: {
          offsetGridLines: true // et matcher pareil ici
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
})
.width(900)
.height(600);



//return myChart.toURL(); // String: https://image-charts.com/chart.js/2.8.0?icac=documentation&chart=%7Btype%3A%27line%27%2Cdata%3A%7Blabels%3A%5B%27January%27%2C%27February%27%2C%27March%27%2C%27April%27%2C%27May%27%2C%27June%27%2C%27July%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27My+First+dataset%27%2CborderColor%3A%27rgb%28255%2C+99%2C+132%29%27%2CbackgroundColor%3A%27rgba%28255%2C+99%2C+132%2C+.5%29%27%2Cdata%3A%5B57%2C90%2C11%2C-15%2C37%2C-37%2C-27%5D%7D%2C%7Blabel%3A%27My+Second+dataset%27%2CborderColor%3A%27rgb%2854%2C+162%2C+235%29%27%2CbackgroundColor%3A%27rgba%2854%2C+162%2C+235%2C+.5%29%27%2Cdata%3A%5B71%2C-36%2C-94%2C78%2C98%2C65%2C-61%5D%7D%2C%7Blabel%3A%27My+Third+dataset%27%2CborderColor%3A%27rgb%2875%2C+192%2C+192%29%27%2CbackgroundColor%3A%27rgba%2875%2C+192%2C+192%2C+.5%29%27%2Cdata%3A%5B48%2C-64%2C-61%2C98%2C0%2C-39%2C-70%5D%7D%2C%7Blabel%3A%27My+Third+dataset%27%2CborderColor%3A%27rgb%28255%2C+205%2C+86%29%27%2CbackgroundColor%3A%27rgba%28255%2C+205%2C+86%2C+.5%29%27%2Cdata%3A%5B-58%2C88%2C29%2C44%2C3%2C78%2C-9%5D%7D%5D%7D%2Coptions%3A%7Bresponsive%3Atrue%2Ctitle%3A%7Bdisplay%3Atrue%2Ctext%3A%27Chart.js+Line+Chart+-+Stacked+Area%27%7D%2Ctooltips%3A%7Bmode%3A%27index%27%7D%2Chover%3A%7Bmode%3A%27index%27%7D%2Cscales%3A%7BxAxes%3A%5B%7BscaleLabel%3A%7Bdisplay%3Atrue%2ClabelString%3A%27Month%27%7D%7D%5D%2CyAxes%3A%5B%7Bstacked%3Atrue%2CscaleLabel%3A%7Bdisplay%3Atrue%2ClabelString%3A%27Value%27%7D%7D%5D%7D%7D%7D&bkg=white&width=700&height=390&icretina=1&ichm=922e17b749b1ab7fab2a14cb742029dc46e50e658457913a9f548793910d2a0d
myChart.toFile('/tmp/chart.png'); // Promise<()>
//return myChart.toDataURI(); // Promise<String> : data:image/png;base64,iVBORw0KGgo...
//return myChart.toBuffer(); //
//return myChart.toDataURI();
}

/*
#(echo "From: mohsen@gmail.com";echo "To:way2mohsun@gmail.com";echo "Subject: Hi"; echo "Content-Type: text/html"; echo;echo "salam"; echo;) | sendmail -t


sendmail -t <<EOT
TO: way2mohsun@gmail.com
FROM: test@YYY.com
SUBJECT: Embed image test
MIME-Version: 1.0
Content-Type: multipart/related;boundary="XYZ"

--XYZ
Content-Type: text/html; charset=ISO-8859-15
Content-Transfer-Encoding: 7bit

<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-15">
</head>
<body bgcolor="#ffffff" text="#000000">
<img src="cid:part1.06090408.01060107" alt="">-->

<a>

</body>
</html>

--XYZ
Content-Type: image/jpeg;name="chart.png"
Content-Transfer-Encoding: base64
Content-ID: <part1.06090408.01060107>
Content-Disposition: inline; filename="chart.png"

$(base64 chart.png)
--XYZ--
EOT
*/




