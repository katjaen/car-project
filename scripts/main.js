import { cars, brandColors, sharedAccesories } from "./carsData.js"

let selectedCarId = null
let defaultPickupDate = null
let selectedCarData = {
	brand: null,
	model: null,
	year: null,
	enginePower: null,
	mileage: null,
	price: null,
	image: null,
	accessories: [],
}

const allCarsSection = document.getElementById("available-cars")
const orderSection = document.getElementById("car-order-1")
const datePicker = document.getElementById("pickupdate")
const accessoriesList = document.getElementById("accessories-list")
const orderSummaryList = document.getElementById("summary-list")
const confirmButton = document.getElementById("form-confirm-btn")
const backButton = document.getElementById("back-btn-1")

/////////////////////////////////
///////  render all cars  ///////
/////////////////////////////////
function renderCars() {
	const carGrid = document.querySelector(".cars-container--grid")

	cars.forEach(car => {
		const cleanModel = car.model.replace(/[^a-zA-Z0-9-_]/g, "")
		const cleanId = car.id

		const carCard = document.createElement("div")
		carCard.classList.add("car-card")
		carCard.id = `car-${cleanId}`

		const brand = document.createElement("p")
		brand.classList.add("brand")
		brand.id = `brand-${cleanModel}-${cleanId}`
		brand.textContent = car.brand

		const model = document.createElement("h2")
		model.classList.add("model")
		model.id = `model-${cleanModel}-${cleanId}`
		model.textContent = car.model

		const image = document.createElement("img")
		image.src = car.image
		image.alt = `${car.brand} ${car.model} car`

		const carDetailsContainer = document.createElement("div")
		carDetailsContainer.classList.add("car-details-container")

		const brandModel = document.createElement("p")
		brandModel.classList.add("brand-model")
		brandModel.textContent = `${car.brand} ${car.model}`

		const year = document.createElement("p")
		year.classList.add("year")
		year.id = `year-${cleanModel}-${cleanId}`
		year.textContent = car.year

		const enginePower = document.createElement("p")
		enginePower.classList.add("engine-power")
		enginePower.id = `engine-power-${cleanModel}-${cleanId}`
		enginePower.textContent = car.enginePower

		const mileage = document.createElement("p")
		mileage.classList.add("mileage")
		mileage.id = `mileage-${cleanModel}-${cleanId}`
		mileage.textContent = car.mileage

		const price = document.createElement("p")
		price.classList.add("price")
		price.id = `price-${cleanModel}-${cleanId}`
		price.textContent = car.price

		const purchaseButton = document.createElement("button")
		purchaseButton.classList.add("btn--white")
		purchaseButton.textContent = "Want to have it?"
		purchaseButton.id = `purchase-button-${cleanId}`
		purchaseButton.setAttribute(
			"aria-label",
			"Click here to open the purchase form"
		)

		purchaseButton.addEventListener("click", () => purchaseButtonClick(car.id))

		carDetailsContainer.append(
			brandModel,
			year,
			enginePower,
			mileage,
			price,
			purchaseButton
		)
		carCard.append(brand, model, image, carDetailsContainer)
		carGrid.appendChild(carCard)
	})
}
renderCars()

///////////////////////////////////////////////
///////  choose car and start ordering  ///////
///////////////////////////////////////////////
function purchaseButtonClick(carId) {
	console.log("Button clicked for car ID:", carId)

	selectedCarId = carId
	console.log("Selected car ID:", selectedCarId)

	const carDetails = cars.find(car => car.id === parseInt(selectedCarId))
	console.log("Selected car details:", carDetails)

	selectedCarData = {
		brand: carDetails.brand,
		model: carDetails.model,
		year: carDetails.year,
		enginePower: carDetails.enginePower,
		mileage: carDetails.mileage,
		price: carDetails.price,
		image: carDetails.image,
		accessories: carDetails.accessoriesByModel.concat(sharedAccesories),
	}

	localStorage.setItem("selectedCarId", selectedCarId)
	localStorage.setItem("selectedCar", JSON.stringify(carDetails))

	allCarsSection.classList.replace("cars-sc", "display-none")
	orderSection.classList.replace("display-none", "cars-sc")

	renderChosenCar()
}

///////////////////////////////////
///////  render chosen car  ///////
///////////////////////////////////
function renderChosenCar() {
	const chosenCarCard = document.querySelector(".car-container--chosen")
	chosenCarCard.innerHTML = ""

	selectedCarId = localStorage.getItem("selectedCarId")

	if (!selectedCarId) {
		console.error("No car chosen")
		return
	} else {
		// renderowanie wybranego samochodu

		const selectedCarDetails = JSON.parse(localStorage.getItem("selectedCar"))

		const cleanModel = selectedCarDetails.model.replace(/[^a-zA-Z0-9-_]/g, "")
		const cleanId = selectedCarDetails.id

		const carCard = document.createElement("div")
		carCard.classList.add("car-card--chosen")
		carCard.id = `car-${cleanId}`

		const brand = document.createElement("p")
		brand.classList.add("brand")
		brand.id = `chosen-${cleanModel}-brand-${cleanId}`
		brand.textContent = selectedCarDetails.brand

		const model = document.createElement("h2")
		model.classList.add("model")
		model.id = `chosen-model-${cleanId}`
		model.textContent = selectedCarDetails.model

		const image = document.createElement("img")
		image.src = selectedCarDetails.image
		image.alt = `${selectedCarDetails.brand} ${selectedCarDetails.model} car`

		const carDetailsContainer = document.createElement("div")
		carDetailsContainer.classList.add("car-details-container--chosen")

		const year = document.createElement("p")
		year.classList.add("year")
		year.id = `chosen-${cleanModel}-year-${cleanId}`
		year.textContent = selectedCarDetails.year

		const enginePower = document.createElement("p")
		enginePower.classList.add("engine-power")
		enginePower.id = `chosen-${cleanModel}-engine-power-${cleanId}`
		enginePower.textContent = selectedCarDetails.enginePower

		const mileage = document.createElement("p")
		mileage.classList.add("mileage")
		mileage.id = `chosen-${cleanModel}-mileage-${cleanId}`
		mileage.textContent = selectedCarDetails.mileage

		const price = document.createElement("p")
		price.classList.add("price")
		price.id = `chosen-${cleanModel}-price-${cleanId}`
		price.textContent = selectedCarDetails.price

		const phoneButton = document.createElement("button")
		phoneButton.classList.add("phone-button", "btn--white")
		phoneButton.setAttribute("aria-label", "Click here to call us")

		const iconSpan = document.createElement("span")
		iconSpan.classList.add("ti", "ti-mobile")
		phoneButton.appendChild(iconSpan)

		const link = document.createElement("a")
		link.href = "tel:+48000000000"
		link.textContent = "Call us for more info"
		phoneButton.appendChild(link)

		carDetailsContainer.append(year, enginePower, mileage, price, phoneButton)
		carCard.append(brand, model, image, carDetailsContainer)
		chosenCarCard.appendChild(carCard)
	}
}

// Ustawienie domyślnej daty odbioru zamówienia na 14 dni od dnia dzisiejszego
const currentDate = new Date()
currentDate.setDate(currentDate.getDate() + 14)
defaultPickupDate = currentDate.toISOString().split("T")[0]
datePicker.value = defaultPickupDate
datePicker.min = defaultPickupDate

///////////////////////////////////
///////  back to all cars   ///////
///////////////////////////////////
backButton.addEventListener("click", () => {
	// Usunięcie zapamiętanego selectedCarId z localStorage
	localStorage.removeItem("selectedCarId")

	// Usunięcie klasy "display-none" dla allCarsSection
	allCarsSection.classList.replace("display-none", "cars-sc")

	// Dodanie klasy "display-none" dla orderSection
	orderSection.classList.replace("cars-sc", "display-none")

	localStorage.removeItem("selectedCarId")
	localStorage.removeItem("selectedCar")
	localStorage.removeItem("selectedAccessories")
})
