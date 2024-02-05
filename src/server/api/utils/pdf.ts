import { FullPlan, Plan } from "../types";
import * as pdf from 'html-pdf';

const removeFirstWord = (str: string) => {
    const words = str.split(' '); 
    words.shift(); 
    return words.join(' '); 
}

const getUTCTime = (date: Date): string => {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Format hours and minutes to be two digits
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Determine AM or PM suffix
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour time
    const twelveHourTime = (hours % 12) || 12;

    // Format 12-hour time to be two digits
    const formattedTwelveHourTime = twelveHourTime.toString().padStart(2, '0');

    // Construct the formatted time string
    return `${formattedTwelveHourTime}:${formattedMinutes}${amPm}`;
}

const htmlHead = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TravelBuddy.AI</title>
    <style>
        body, html {
            font-family: Arial, sans-serif; /* Standard font for better compatibility */
            margin: 0;
            padding: 0;
        }

        .scrollable-content {
            background-color: #FFF;
            padding: 20px;
        }

        .icon img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%; /* Adjust width as needed */
            height: auto; /* Maintain aspect ratio */
            border: 2px solid black;
        }

        #intro {
            font-size: 16px;
            margin: 20px 0;
        }

        .days {
            display: flex;
            align-items: center;
            gap: 20px;
            font-size: 18px;
        }

        .block {
            margin-bottom: 30px;
        }

        .block h1, .block h2, .block h3 {
            margin: 5px 0;
        }

        .block img {
            width: 40%; /* Adjust width as needed, making images smaller */
            height: auto; /* Maintain aspect ratio */
            margin-top: 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
    <div class="scrollable-content">
        <div class="icon">    
            <img id="icon" src="https://travelbuddy-public-images.s3.ap-southeast-1.amazonaws.com/travelbuddy.jpg">
        </div> ` 
        

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TravelBuddy.AI</title>
    <style>
        body, html {
            font-family: Arial, sans-serif; /* Standard font for better compatibility */
            margin: 0;
            padding: 0;
        }

        .scrollable-content {
            background-color: #f0f0f0;
            padding: 20px;
        }

        .icon img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%; /* Adjust width as needed */
            height: auto; /* Maintain aspect ratio */
            border: 2px solid black;
        }

        #intro {
            font-size: 16px;
            margin: 20px 0;
        }

        .days {
            display: flex;
            align-items: center;
            gap: 20px;
            font-size: 18px;
        }

        .block {
            margin-bottom: 30px;
        }

        .block h1, .block h2, .block h3 {
            margin: 5px 0;
        }

        .block img {
            width: 40%; /* Adjust width as needed, making images smaller */
            height: auto; /* Maintain aspect ratio */
            margin-top: 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
    <div class="scrollable-content">
        <div class="icon">    
            <img id="icon" src="https://travelbuddy-public-images.s3.ap-southeast-1.amazonaws.com/travelbuddy.jpg">
        </div>  
        
        <div id="intro">
            Travel Destination: Seoul, Korea<br>
            Travel Date: 3rd Feb 2024 - 6th Feb 2024<br>
            Budget: $1800 - $2000/pax
        </div>

        <!-- Repeat this structure for each day -->
        <div class="day-block">
            <div class="days">
                <h1> DAY 1</h1> 
                <h2> 6th Feb 2024</h2>
            </div>

            <div class="block">
                <h1> 08:00 - 09:00 </h1> 
                <h2> Check in at Hotel</h2>
                <h3> -> Sotetsu Fresa Inn Seoul Myeong-dong</h3>
                <img src="https://sotetsu-hotels.com/fresa-inn/datas/images/2021/12/26/7676f1553cbc2f3f552643151764c5dcb3ac886b.jpg">
            </div>
            
            <!-- ... other blocks ... -->
        </div>

        <!-- ... other day-blocks ... -->
    </div>
</body>
</html>
`;

const getItemBlock = (
    location:string,
    startTime: Date,
    endTime: Date,
    activity: string,
    imgUrl: string
): string => {
    return `<div class="block">
    <h1> ${getUTCTime(startTime)} - ${getUTCTime(endTime)} </h1> 
    <h2> ${activity}</h2>
    <h3> -> ${location}</h3>
    <img src="${imgUrl}">
    </div>`
}

const getDayBlock = (
    day: number,
    date: Date
): string => {
    let str =  `<div class="day-block">
    <div class="days">
        <h1> DAY ${day}</h1> 
        <h2> ${removeFirstWord(date.toDateString())}</h2>
    </div>`;

    return str + '</div>'
}


export const convertToPDF = async (plan: FullPlan): Promise<string> => {
    let htmlData = htmlHead + `<div id="intro">
    Travel Destination: ${plan.city}<br>
    Travel Date: ${removeFirstWord(new Date(plan.startDate).toDateString())} - ${removeFirstWord(new Date(plan.endDate).toDateString())}<br>
    Budget: $${plan.startBudget} - $${plan.endBudget}/pax`
    //REMOVED A DIV HERE
// <!-- Repeat this structure for each day -->
//         <div class="day-block">
//             <div class="days">
//                 <h1> DAY 1</h1> 
//                 <h2> 6th Feb 2024</h2>
//             </div>

//             <div class="block">
//                 <h1> 08:00 - 09:00 </h1> 
//                 <h2> Check in at Hotel</h2>
//                 <h3> -> Sotetsu Fresa Inn Seoul Myeong-dong</h3>
//                 <img src="https://sotetsu-hotels.com/fresa-inn/datas/images/2021/12/26/7676f1553cbc2f3f552643151764c5dcb3ac886b.jpg">
//             </div>
            
//             <!-- ... other blocks ... -->
//         </div>

//         <!-- ... other day-blocks ... -->
//     </div>
// </body>
// </html>`
let dayCounter = 0;

const planItems = plan.items;

planItems.map((item)=>{
    if(item.day != dayCounter){
        htmlData += `</div>`
        htmlData += getDayBlock(item.day,item.startDate)

        dayCounter++
    }
    htmlData += getItemBlock(item.location,item.startDate,item.endDate,item.activity,item.imgUrl)
})

htmlData += `</div></div>
 </body>
 </html>`

    
    return new Promise((resolve, reject) => {

        pdf.create(htmlData, {
            format:'A4'
        }).toBuffer((err, buffer) => {
            if (err) {
                console.error(err);
                reject(err); // Reject the Promise if there's an error
            } else {
                const base64String = buffer.toString('base64');
                resolve(base64String); // Resolve the Promise with the base64 string
            }
        });
    });
};