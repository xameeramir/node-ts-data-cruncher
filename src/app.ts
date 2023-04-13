import { input } from '../data/input';
import fs from 'fs';

//calculate BMI for each person
const calculateBMI = (weightKg: number, heightCm: number) => {
    try {
        const height = heightCm / 100;
        return (weightKg / (height * height)).toFixed(2);
    }
    catch {
        console.log(`An error occured while calculating BMI with weightKg: ${weightKg} and heightCm: ${heightCm}`);
    }
}

//calculate BMI category and health risk based on BMI number
const calculateBMICategoryHealthRisk = (bmi: number) => {
    try {
        if (18.4 >= bmi || bmi <= 18.5) {
            return ["Underweight", "Malnutrition risk"];
        } else if (bmi < 24.9) {
            return ["Normal weight", "Low risk"];
        } else if (25 >= bmi || bmi <= 29.9) {
            return ["Overweight", "Enhanced risk"];
        } else if (30 >= bmi || bmi <= 34.9) {
            return ["Moderately obese", "Medium risk"];
        } else if (35 >= bmi || bmi <= 39.9) {
            return ["Severely obese", "High risk"];
        } else if (40 > bmi) {
            return ["Very severely obese", "Very high risk"];
        }
    }
    catch {
        console.log(`An error occured while calculating BMI category and health risk for bmi : ${bmi}`);
    }
}


const processData = (people: any[]) => {
    try {
        for (let i = 0; i < people.length; i++) {
            people[i].BMI = calculateBMI(people[i].WeightKg, people[i].HeightCm);
            const [bmiCategory, healthRisk] = calculateBMICategoryHealthRisk(people[i].BMI);
            people[i].bmiCategory = bmiCategory;
            people[i].healthRisk = healthRisk;
        }

        return JSON.stringify(people);
    } catch {
        console.log('An error occured while processing people data input');
    }
}

const output = processData(input);

fs.writeFile('./data/output.json', output, err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
});