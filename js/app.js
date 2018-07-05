import fetchJsonp from 'fetch-jsonp';

const petForm = document.querySelector("#pet-form");

petForm.addEventListener("submit", fetchAnimals);

function fetchAnimals(e) {
	e.preventDefault();
	//Get user input
	const animal = document.querySelector("#animal").value;
	const zip = document.querySelector("#zip").value;

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
	let output = '<div class="container">';
	pets.forEach((pet) => {
		console.log(pet);
		output += `
				<div class="col-6">
					<img src="${pet.media.photos.photo[3].$t}"/>
					<div class="card-bottom">
						<h3>${pet.name.$t} (${pet.age.$t})</h3>
						${pet.breeds.breed.$t ? `<p>Breed: ${pet.breeds.breed.$t}</p>` : ``}
						<p>${pet.contact.city.$t} ${pet.contact.state.$t} ${pet.contact.zip.$t}</p>
							${pet.contact.phone.$t ? `<p>Phone: <a href="tel:${pet.contact.phone.$t}">${pet.contact.phone.$t}</a></p>` : ``}
							${pet.contact.email.$t ? `<p>Email: <a href="mailto:${pet.contact.email.$t}">${pet.contact.email.$t}</a></p>` : ``}
							<p>Shelter ID: ${pet.shelterId.$t}</p>
					</div>
				</div>
		`;
	});
	document.getElementById('results').innerHTML = output;
}