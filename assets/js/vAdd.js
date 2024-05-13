import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://rfymowrvjowmkryddjdb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeW1vd3J2am93bWtyeWRkamRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2MTQ0NjAsImV4cCI6MjAyODE5MDQ2MH0.llQhhtMizg9fTgeV3hYhl14CYJOCW4MLijp8egsKl9M')

const vehicleForm = document.getElementById("vehicleForm");
const vehicleData = {
    rego: { e: document.getElementById("rego"), n: "Registration" },
    make: { e: document.getElementById("make"), n: "Make" },
    model: { e: document.getElementById("model"), n: "Model" },
    colour: { e: document.getElementById("colour"), n: "Colour" },
    owner: { e: document.getElementById("owner"), n: "Owner ID" }
}

const personDIV = document.getElementById("personDiv");
const ownerForm = document.getElementById("ownerForm");
const ownerData = {
    personid: { e: document.getElementById("personid"), n: "ID" },
    name: { e: document.getElementById("name"), n: "Name" },
    address: { e: document.getElementById("address"), n: "Address" },
    dob: { e: document.getElementById("dob"), n: "Date of Birth" },
    license: { e: document.getElementById("license"), n: "License Number" },
    expire: { e: document.getElementById("expire"), n: "License Expiration Date" }
}

const pageImage = document.getElementById("pageImage");
const message = document.getElementById("message");


vehicleForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let invalid = [];
    for(const key in vehicleData) {
        const node = vehicleData[key];
        if(node.e.value === "") {
            invalid.push(node.n);
        }
    }

    if(invalid.length === 0) {
        let { data: People, error } = await supabase
            .from('People')
            .select('*')
            .eq('Name', vehicleData.owner.e.value);

        if(People.length !== 0) {
            const { data, error } = await supabase
                .from('Vehicles')
                .insert([{
                    VehicleID: vehicleData.rego.e.value,
                    Make: vehicleData.make.e.value,
                    Model: vehicleData.model.e.value,
                    Colour: vehicleData.colour.e.value,
                    OwnerID: People[0].PersonID
                },])
                .select()

            message.textContent = `Vehicle added successfully`;
        } else {
            // Owner doesn't exist, add them:
            personDIV.style.display = "inline-block";
            pageImage.src = "./assets/img/owl.png";
        }

    } else {
        message.textContent = `Error : Vehicle ${invalid.join(", ")} cannot be empty!`
    }
});

ownerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let invalid = [];
    for(const key in ownerData) {
        const node = ownerData[key];
        if(node.e.value === "") {
            invalid.push(node.n);
        }
    }

    if(invalid.length === 0) {
        const { data, error } = await supabase
            .from('People')
            .insert([{
                PersonID: Number(ownerData.personid.e.value),
                Name: ownerData.name.e.value,
                Address: ownerData.address.e.value,
                DOB: ownerData.dob.e.value,
                LicenseNumber: ownerData.license.e.value,
                ExpiryDate: ownerData.expire.e.value
            },])
            .select()

        if(!error) {
            const { data, error } = await supabase
                .from('Vehicles')
                .insert([{
                    VehicleID: vehicleData.rego.e.value,
                    Make: vehicleData.make.e.value,
                    Model: vehicleData.model.e.value,
                    Colour: vehicleData.colour.e.value,
                    OwnerID: Number(ownerData.personid.e.value)
                },])
                .select()

            if(!error) {
                personDIV.style.display = "none";
                pageImage.src = "./assets/img/cappybara.png";

                message.textContent = `Vehicle added successfully`;
            }
        } else {
            message.innerHTML = "ERROR : An issue occurred whilst attempting to insert owner data.<br>Please check your inputs and try again."
        }

    } else {
        message.textContent = `Error : Owner ${invalid.join(", ")} cannot be empty!`
    }
});

/*form.addEventListener("submit", async (e) => {

    let supa = supabase.from('Vehicles').select('*');

    if(rego.value !== "") {
        supa.ilike('VehicleID', `%${rego.value}%`)
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
});*/