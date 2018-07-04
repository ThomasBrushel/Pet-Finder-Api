// Validate Zipcode
export function isValidZip(zip) {
	return /^\d{5}(-\d{4})?$/.test(zip)
}

// Display alert message
export function showAlert(message, className) {
	// Create div
	const div = document.createElement("div");
	// Add Classes
	div.className = `alert alert-${className}`;
	// Add the text
	div.appendChild(document.createTextNode(message));
	// Get container
	const container = document.querySelector(".container");
	// Get form
	const form = document.querySelector('#pet-form');
	// Insert Alert
	container.insertBefore(div, form);

	setTimeout(() => document.querySelector('.alert').remove(), 3000);
}