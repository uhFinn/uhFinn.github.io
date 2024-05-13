import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://rfymowrvjowmkryddjdb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeW1vd3J2am93bWtyeWRkamRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2MTQ0NjAsImV4cCI6MjAyODE5MDQ2MH0.llQhhtMizg9fTgeV3hYhl14CYJOCW4MLijp8egsKl9M')
// After install the supabase-js module

/*
// SQL: select student_id from students where username = 'grey07';
const { data, error } = await supabase
    .from('students')
    .select('student_id')
    .eq('username', 'grey07')
 */

const form = document.querySelector("form");
const name = document.getElementById("name");
const license = document.getElementById("license");
const message = document.getElementById("message");

const resultBox = document.getElementById("results");

form.addEventListener("submit", async (e) => {

// Create a single supabase client for interacting with your database

    e.preventDefault();
    resultBox.innerHTML = "";

    let supa = supabase.from('People').select('*');

    if((name.value === "" && license.value === "") || (name.value !== "" && license.value !== "")) {
        message.textContent = "Error";
        return;
    }

    if(name.value !== "") {
        supa.ilike('Name', `%${name.value}%`)
    }
    if(license.value !== "") {
        supa.ilike('LicenseNumber', `%${license.value}%`)
    }

    let { data: People, error } = await supa;
    if(People.length !== 0) {
        for(let i = 0; i < People.length; i++) {
            let person = People[i];

            const newDiv = document.createElement('div');

            newDiv.innerHTML = `personid: ${person.PersonID}<br>
            name: ${person.Name}<br>
            Address: ${person.Address}<br>
            DOB: ${person.DOB}<br>
            LicenseNumber: ${person.LicenseNumber}<br>
            ExpiryDate: ${person.ExpiryDate}`;
            newDiv.classList.add('result');

            resultBox.appendChild(newDiv);
        }
        message.textContent = "Search successful"
    } else message.textContent = "No result found"

    /*if (name.value !== "" || license.value !== "") {
        // Some form of content
        let query = supabase.from('People').select()
        if (name.value !== "") {
            query = query.eq('Name', name.value);
        }
        if (license.value !== "") {
            query = query.eq('LicenseNumber', license.value);
        }

        const {data, error} = await query;
        console.log(data)
    }*/


/*
        const { data, error } = await supabase
            .from('People')
            .insert([
                { PersonID: 7, Name: 'Finn Scully', Address: "Germany", DOB: "2005-04-01", LicenseNumber: "JA285DE", ExpiryDate: "2026-07-30" },
            ])
            .select()

        console.log(data);



        let { data: People, error } = await supabase
            .from('People')
            .select('*')

        console.log(People);
 */
});