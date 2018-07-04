import fetchJsonp from 'fetch-jsonp';
import { isValidZip, showAlert } from './validate';

const petForm = document.querySelector("#pet-form");

petForm.addEventListener("submit", fetchAnimals);

function fetchAnimals(e) {
	e.preventDefault();
	//Get user input
	const animal = document.querySelector("#animal").value;
	const zip = document.querySelector("#zip").value;

	//Validate Zip
	if (!isValidZip(zip)) {
		showAlert("Please Enter a Valid Zipcode", "danger");
		return;
	}

	fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=5a2c1215a754a2bc9b7fe7b6c47c1ce6&animal=${animal}&location=${zip}&callback=callback`, {
			jsonpCallbackFunction: 'callback'
		})
		.then(res => res.json())
		.then(data => showAnimals(data.petfinder.pets.pet))
		.then(err => console.log(err));
}

function callback(data) {
	console.log(data);
}

// Show Listings of pets
function showAnimals(pets) {
	const results = document.querySelector("#results");

	//Clear first
	results.innerHTML = "";
	// loop through pets
	pets.forEach((pet) => {
		console.log(pet);
		const div = document.createElement('div');
		div.classList.add('card', 'card-body');
		div.innerHTML = `
			<div class="container">
				<div class="col-6">
					<h4>${pet.name.$t} (${pet.age.$t})</h4>
					${pet.breeds.breed.$t ? `<p>Breed: ${pet.breeds.breed.$t}</p>` : ``}
					<p>${pet.contact.city.$t} ${pet.contact.state.$t} ${pet.contact.zip.$t}</p>
						${pet.contact.phone.$t ? `<p>Phone: ${pet.contact.phone.$t}</p>` : ``}
						${pet.contact.email.$t ? `<p>Email: ${pet.contact.email.$t}</p>` : ``}
						<p>Shelter ID: ${pet.shelterId.$t}</p>
				</div>
				<div class="col-6">
				  <img src="${pet.media.photos.photo[3].$t}"/>
				</div>
			</div>
		`;
		results.appendChild(div);
	});
}