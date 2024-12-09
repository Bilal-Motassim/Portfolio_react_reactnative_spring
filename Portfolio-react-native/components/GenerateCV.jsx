import { View, Text, Button } from 'react-native';
import React from 'react';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const GenerateCV = ({data, pic}) => {
    const generateEducationHTML = (educationSet) => {
        return educationSet.map(edu => `
          <div class="education-item">
            <h4 style="font-weight: 900;margin-bottom: 0;">${edu.school}</h4>
            <span style="font-weight:700;">${edu.degree}<br></span>
            <span>${edu.startmonth} ${edu.startyear} - ${edu.endmonth} ${edu.endyear}</span>
          </div>
        `).join('');
    };
    
    const generateExperienceHTML = (experienceList) => {
        return experienceList.map(exp => `
          <div>
            <h4 style="font-weight: 900;margin-bottom: 0;">${exp.title}</h4>
            <span style="font-weight:700;">${exp.company}<br></span>
            <span>${exp.startmonth} ${exp.startyear} - ${exp.currentwork ? 'Present':`${exp.endmonth} ${exp.endyear}`}</span>
            <p style="margin: 0;font-size: 14px;">${exp.description =! null ? exp.description : ''}</p>
          </div>
        `).join('');
    };
    
    const generateSkillsHTML = (skillList) => {
        return skillList.map(skill => `
            <li style="margin-bottom: 10px;">${skill.skill}</li>
        `).join('');
    }

    const html = `
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV Generator</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }
            .container{
            margin-right: 50px;
            margin-left: 50px;
            margin-top: 50px;
            margin-bottom: 50px;
            }
            img{
                width: 130px;
            }
            .header{
                display: flex;
                margin-bottom: 20px;
            }
            .header .header-container{
                margin-left: 45px;
                width: 100%;
            }
            .name{
            font-size: 36px;
            color: #5a64ff;
            }
            section{
            border-top: 5px solid #5a64ff;
            padding-top: 5px;
            }
            .section-header{
            font-size: 18px;
            font-weight: 800;
            margin-right: 45px;
            }
            .education-item:last-child{
            margin-bottom: 10px;
            }
            .education-container {
            display: flex;
            }
            .education-content{
            width: 80%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="data:image/png;base64,${pic}" alt="">
                <div class="header-container">
                    <h1 class="name">${data.firstName} ${data.lastName}</h1>
                    <div>
                        <i class="fa fa-envelope" style="margin-right: 10px;color: #5a64ff;"></i>
                        <span>${data.email}</span>
                    </div>
                </div>
            </div>
        <section style="display: flex;justify-content: space-around;">
            <h1 class="section-header">SUMMARY<br>STATEMENT</h1>
            <div>
                <p>${data.about}</p>
            </div>
        </section>
        <section style="display: flex;">
            <h1 class="section-header">CORE<br>QUALIFICATION</h1>
            <div>
                <ul style="column-count: 2;column-gap: 50px">
                    ${generateSkillsHTML(data.skillList)}
                </ul> 
            </div>
        </section>
        <section class="education-container">
            <h1 class="section-header">EDUCATION</h1>
            <div class="education-container">
            ${generateEducationHTML(data.educationSet)}
            </div>
        </section>
        <section class="education-container">
            <h1 class="section-header">WORK<br>EXPERIENCE</h1>
            <div class="education-content">
            ${generateExperienceHTML(data.experienceList)}
            </div>
        </section>
        </div>
    </body>
    </html>`;

    

    // const print = async () => {
    //     await Print.printAsync({
    //         html,
    //         printerUrl: selectedPrinter?.url, // iOS only
    //     });
    // };

    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

  return (
    <View>
      <Button onPress={printToFile} title='CV'></Button>
    </View>
  )
}

export default GenerateCV