const apiKey

		=
	   
		'AIzaSyCNboz6Aa270DX9PO93HXwV5b0IR4ySVR8'; // Replace with your API key
	   const spreadsheetId = '1dDZQXHSteMp1PFi9d4EZAYlZ9UQhXPgRt2gGfNjLkFA'; // Replace with your spreadsheet ID
	   const anySheetName = 'Demo Any%'; // Replace with your sheet name
	   const allSheetName = 'Demo 100%';
	   
	   fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${anySheetName}!A2:E?key=${apiKey}`)
		 .then(response => response.json())
		 .then(data => anyDataLoaded(data))
		 .catch(error => console.error('Error:', error));
	   
	   fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${allSheetName}!A2:E?key=${apiKey}`)
		 .then(response => response.json())
		 .then(data => allDataLoaded(data))
		 .catch(error => console.error('Error:', error));
	   
	   
	   function anyDataLoaded(data) {// organizes the data for the tables
		   let results = data;
		   let bigLine = ``;
	   
		   if(results.values != undefined){
			   let allSubmissions = sortData(results.values);
	   
			   bigLine += makeRow(allSubmissions);
			   document.querySelector("#anyPercent").innerHTML += bigLine;
		   }
	   }
	   
	   function allDataLoaded(data) {// organizes the data for the tables
		   let results = data;
		   let bigLine = ``;
	   
		   if(results.values != undefined){
			   let allSubmissions = sortData(results.values);
	   
			   bigLine += makeRow(allSubmissions);
			   document.querySelector("#allPercent").innerHTML += bigLine;
		   }
	   }
	   
	   function sortData(results)
	   {
		   let submissions = [];
		   results.forEach(row => {
			   submissions.push({
				   username: row[0],
				   time: row[1],
				   date: row[2],
				   version: row[3],
				   videoLink: row[4]
			   })
		   });
	   
		   submissions = submissions.sort((a,b)=>a.time-b.time);
		   return submissions;
	   }
	   
	   function makeRow(results) {// makes the line of code to inject into the html
		   let line;
		   let bigLine = ``;
		   for (let i = 0; i < results.length; i++) {
			   let result = results[i];
	   
			   let playerName = result.username;
			   let playerTime = result.time;
			   let playerHours = parseInt(playerTime/3600);
               if(playerHours < 10)
               {
                    playerHours = "0" + playerHours;
               }
			   playerTime -= playerHours * 3600;
			   let playerMinutes = parseInt(playerTime/60);
               if(playerMinutes < 10)
               {
                    playerMinutes = "0" + playerMinutes;
               }
			   playerTime -= (playerMinutes * 60);
			   playerTime = playerTime.toFixed(2);
               if(playerTime < 10)
               {
                    playerTime = "0" + playerTime;
               }
			   let date = result.date;
			   let gameVersion = result.version;
			   let videoLink = result.videoLink;
	   
			   line = `<tr><td>${i + 1}</td>`;
			   line += `<td>${playerName}</td>`;
			   line += `<td>${playerHours}:${playerMinutes}:${playerTime}</td>`;
			   line += `<td>${date}</td>`;
			   line += `<td>${gameVersion}</td>`;
			   line += `<td><a href="${videoLink}">Link</td></tr>`;
			   bigLine += line;
		   }
		   return bigLine;
	   }