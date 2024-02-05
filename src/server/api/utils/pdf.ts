import { Plan } from "../types";

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset = "UTF-8">
    <meta http-equiv="X-UA-Compatible" content = "IE=edge">
    <meta name = "viewport" content = "width=device-width, initial-scale=1.0">
    <title>TravelBuddy.AI</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Afacad&family=Allura&family=Martel&display=swap" rel="stylesheet">
    <style>
        body, html{
            margin: 0;
            padding: 0;
        }

        .scrollable-content{            
            min-height: 100px;
            background-color: #f0f0f0;
            padding: 20px;
        }

        #icon{
            display: block;
            margin-left: auto;
            margin-right: auto;
            border: 2px solid black;
        }

        #intro{
            font-size: 20px;
            font-weight: bold;
            position: relative;
            left: -180px;
        }

        .days{
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .days h1{
            font-size: 80px;
        }

        .days h2{
            font-size: 30px;
        }

        .days h1, .days h2{
            margin: 0;
        }

        .block h1{
            font-size: 30px;
            font-style: italic;
            position: absolute;
            top: 350px;
            left: 50px;
        }

        .block h2{
            font-size: 30px;
            position: absolute;
            top: 345px;
            left: 240px;
        }

        .block h3{
            font-size: 30px;
            position: absolute;
            top: 375px;
            left: 20px;
        }

        .block img{
            position: absolute;
            top: 450px;
        }

        #BLOCK{
            margin-bottom: 100px;
        }
    </style>
</head>

<body>
    <div class = "scrollable-content">

        <div class = "icon">    
            <img id = "icon" height = "110px" src = "icon.jpeg">
        </div>  
        
        <div class = "intro">
            <pre id = "intro">
                Travel Destination: Seoul, Korea
                Travel Date: 3rd Feb 2024 - 6th Feb 2024
                Budget: $1800 - $2000/pax
            </pre>
        </div>

        <div id = "BLOCK">
            <div class = "days">
                <h1> DAY 1</h1> 
                <h2> 6th Feb 2024</h2>
            </div>

            <div class = "block1">
                <h1> 08:00 - 09:00 </h1> 
                <h2> Check in at Hotel</h2>
                <h3> -> Sotetsu Fresa Inn Seoul Myeong-dong</h3>
                <img height = "350px" src = "https://sotetsu-hotels.com/fresa-inn/datas/images/2021/12/26/7676f1553cbc2f3f552643151764c5dcb3ac886b.jpg">
            </div>
            
            <div class = "block2">
                <h1> 09:00 - 10:00 </h1> 
                <h2> Breakfast (5min walk, 400m)</h2>
                <h3> -> Isaac Toast & Coffee Myeong-dong</h3>
                <img height = "350px" src = "https://cf.creatrip.com/original/blog/12753/6nege9p9fqn6wbzs6xp3babosicz40r5.png?d=500&q=80&f=webp">
            </div>
        </div>

        <div id = "BLOCK">
            <div class = "days">
                <h1> DAY 2</h1> 
                <h2> 7th Feb 2024</h2>
            </div>

            <div class = "block1">
                <h1> 08:00 - 09:00 </h1> 
                <h2> Breakfast (7min walk, 500m)</h2>
                <h3> -> Myeongdong Yanggwa</h3>
                <img height = "350px" src = "https://sotetsu-hotels.com/fresa-inn/datas/cache/images/2023/10/23/383x280_ea1e9d427fb5664c32c517a73e421e58_94936d9d7f6ef0b51c8355ae9c097c86c738f37a.jpg">
            </div>
            
            <div class = "block2">
                <h1> 10:00 - 20:00 </h1> 
                <h2> Lotte World (45min train ride)</h2>
                <h3> -> Theme Park that has both indoor and outdoor rides</h3>
                <img height = "350px" src = "https://www.dragonhilllodge.com/application/files/8614/9511/3307/DHL_korea_LWpark_722.jpg">
            </div>
        </div>

    </div>
</body>

</html>`;

export const convertToPDF = (plan: Plan)=>{
    
}