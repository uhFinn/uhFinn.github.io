import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://rfymowrvjowmkryddjdb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeW1vd3J2am93bWtyeWRkamRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2MTQ0NjAsImV4cCI6MjAyODE5MDQ2MH0.llQhhtMizg9fTgeV3hYhl14CYJOCW4MLijp8egsKl9M')

const form = document.querySelector("form");
const rego = document.getElementById("rego");
const message = document.getElementById("message");

const resultBox = document.getElementById("results");

form.addEventListener("submit", async (e) => {

    e.preventDefault();
    resultBox.innerHTML = "";

    let supa = supabase.from('Vehicles').select('*');

    if(rego.value !== "") {
        supa.ilike('VehicleID', `%${rego.value}%`);
    } else {
        message.textContent = "Error";
        return;
    }

    let { data: Vehicles, error } = await supa;
    if(Vehicles.length !== 0) {
        for(let i = 0; i < Vehicles.length; i++) {
            let vehicle = Vehicles[i];

            const newDiv = document.createElement('div');

            newDiv.innerHTML = `vehicleid: ${vehicle.VehicleID}<br>
            make: ${vehicle.Make}<br>
            model: ${vehicle.Model}<br>
            colour: ${vehicle.Colour}<br>
            ownerid: ${vehicle.OwnerID}`;
            newDiv.classList.add('result');

            resultBox.appendChild(newDiv);
        }
    } else message.textContent = "No Results Found!"
});