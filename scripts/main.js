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
selectedCarData.accessories =
	selectedCarData.accessories.concat(sharedAccesories)

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

		const brandColor = brandColors[car.brand]
		if (brandColor) {
			carCard.style.setProperty("--car-bg", brandColor)
		}
	})
}
renderCars()

///////////////////////////////////////////////
///////  choose car and start ordering  ///////
///////////////////////////////////////////////
const purchaseButtons = document.querySelectorAll('[id^="purchase-button-"]')
purchaseButtons.forEach(button => {
	button.addEventListener("click", () => purchaseButtonClick(button.id))
})

function purchaseButtonClick(buttonId) {
	console.log("Button clicked:", buttonId)

	selectedCarId = buttonId.replace("purchase-button-", "")
	console.log("Selected car ID:", selectedCarId)

	const carDetails = cars.find(car => car.id === parseInt(selectedCarId))
	console.log("Selected car details:", carDetails)

	// Zaktualizuj selectedCarData na podstawie danych wybranego samochodu
	selectedCarData = {
		brand: carDetails.brand,
		model: carDetails.model,
		year: carDetails.year,
		enginePower: carDetails.enginePower,
		mileage: carDetails.mileage,
		price: carDetails.price,
		image: carDetails.image,
		accessories: [...sharedAccesories, ...carDetails.accessoriesByModel],
	}

	// Debugging - wyświetlenie ID wybranego samochodu w konsoli
	console.log(selectedCarId)

	allCarsSection.classList.replace("cars-sc", "display-none")
	orderSection.classList.replace("display-none", "cars-sc")

	renderChosenCar()
	renderAccessoriesList()
	renderOrderSummary()
}

///////////////////////////////////
///////  render chosen car  ///////
///////////////////////////////////
function renderChosenCar() {
	const chosenCarCard = document.querySelector(".car-container--chosen")
	chosenCarCard.innerHTML = ""

	if (selectedCarId !== null) {
		const cleanModel = selectedCarData.model.replace(/[^a-zA-Z0-9-_]/g, "")
		const cleanId = selectedCarId

		const carCard = document.createElement("div")
		carCard.classList.add("car-card--chosen")
		carCard.id = `car-${cleanId}`

		const brand = document.createElement("p")
		brand.classList.add("brand")
		brand.id = `chosen-${cleanModel}-brand-${cleanId}`
		brand.textContent = selectedCarData.brand

		const model = document.createElement("h2")
		model.classList.add("model")
		model.id = `chosen-model-${cleanId}`
		model.textContent = selectedCarData.model

		const image = document.createElement("img")
		image.src = selectedCarData.image
		image.alt = `${selectedCarData.brand} ${selectedCarData.model} car`

		const carDetailsContainer = document.createElement("div")
		carDetailsContainer.classList.add("car-details-container--chosen")

		const year = document.createElement("p")
		year.classList.add("year")
		year.id = `chosen-${cleanModel}-year-${cleanId}`
		year.textContent = selectedCarData.year

		const enginePower = document.createElement("p")
		enginePower.classList.add("engine-power")
		enginePower.id = `chosen-${cleanModel}-engine-power-${cleanId}`
		enginePower.textContent = selectedCarData.enginePower

		const mileage = document.createElement("p")
		mileage.classList.add("mileage")
		mileage.id = `chosen-${cleanModel}-mileage-${cleanId}`
		mileage.textContent = selectedCarData.mileage

		const price = document.createElement("p")
		price.classList.add("price")
		price.id = `chosen-${cleanModel}-price-${cleanId}`
		price.textContent = selectedCarData.price

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

		const brandColor = brandColors[selectedCarData.brand]

		if (brandColor) {
			chosenCarCard.style.setProperty("--car-bg", brandColor)
		}

		carDetailsContainer.append(year, enginePower, mileage, price, phoneButton)
		carCard.append(brand, model, image, carDetailsContainer)
		chosenCarCard.appendChild(carCard)
	} else {
		console.error("No selected car id found.")
	}
}

// Ustawienie domyślnej daty odbioru zamowienia na 14 dni od dnia dzisiejszego
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

/////////////////////////////////////////
///////  render accesories list   ///////
/////////////////////////////////////////
function renderAccessoriesList() {
	accessoriesList.innerHTML = ""

	selectedCarData.accessories.forEach(accessory => {
		const listItem = document.createElement("li")
		listItem.classList.add("accessory")
		listItem.dataset.id = accessory.id

		const accessoryNameLabel = document.createElement("span")
		accessoryNameLabel.textContent = `${accessory.name}`
		listItem.appendChild(accessoryNameLabel)

		if (accessory.id === "addColor") {
			// Dodanie kolor-pickera
			const colorLabel = document.createElement("label")
			colorLabel.htmlFor = "color-picker"
			colorLabel.textContent = " | pick your choice: "
			listItem.appendChild(colorLabel)

			const colorInput = document.createElement("input")
			colorInput.type = "color"
			colorInput.id = `color-picker-${accessory.id}` // Unikalne id
			colorInput.dataset.colorVariable = "--individualcar" // kolor domyślny
			colorInput.value = getComputedStyle(
				document.documentElement
			).getPropertyValue("--individualcar") // kolor domyślny
			listItem.appendChild(colorInput)

			// obsługa wyboru koloru
			colorInput.addEventListener("input", function () {
				const color = this.value
				const colorVariable = this.dataset.colorVariable
				document.documentElement.style.setProperty(colorVariable, color)
			})

			// cena dla "Individual Color"
			const individualColorPrice = selectedCarData.accessories.find(
				acc => acc.id === "addColor"
			).price
			const priceLabel = document.createElement("span")
			priceLabel.classList.add("medium")
			priceLabel.textContent = ` | +${individualColorPrice}€ `
			listItem.appendChild(priceLabel)
		} else {
			const priceLabel = document.createElement("span")
			priceLabel.classList.add("medium")
			priceLabel.textContent = ` | +${accessory.price}€ `
			listItem.appendChild(priceLabel)
		}

		const addButton = document.createElement("button")
		addButton.id = `acc-btn-${accessory.id}`
		addButton.classList.add("add-btn")
		addButton.textContent = "+"
		listItem.appendChild(addButton)

		accessoriesList.appendChild(listItem)
	})

	// dodawanie usuwanie akcesoriów z zamówienia
	accessoriesList.addEventListener("click", function (event) {
		const clickedButton = event.target.closest("button")
		if (
			clickedButton &&
			(clickedButton.classList.contains("add-btn") ||
				clickedButton.classList.contains("remove-btn"))
		) {
			event.preventDefault()
		}

		if (event.target.classList.contains("add-btn")) {
			// pobieramy informacje o wybranym akcesorium
			const accessoryId = event.target.parentNode.dataset.id
			const accessoryName =
				event.target.parentNode.querySelector("span").textContent
			const accessoryPriceText = event.target.parentNode
				.querySelector(".medium")
				?.textContent.replace(/[^\d.]/g, "")
			const accessoryPrice = parseFloat(accessoryPriceText)

			// dodajemy akcesorium do summary list
			const selectedAccessoryLi = document.createElement("li")
			selectedAccessoryLi.textContent = `${accessoryName} | ${accessoryPrice}€`
			selectedAccessoryLi.id = `selected-acc-${accessoryId}`
			if (accessoryId === "addColor") {
				selectedAccessoryLi.classList.add("chosen-color") // Dodanie klasy .chosen-color
			}
			orderSummaryList.appendChild(selectedAccessoryLi)

			event.target.textContent = "–"
			event.target.classList.replace("add-btn", "remove-btn")

			event.target.parentNode.classList.add("selected-acc")
		} else if (event.target.classList.contains("remove-btn")) {
			event.preventDefault()

			// pobieramy informacje o usuwanym akcesorium
			const accessoryId = event.target.parentNode.dataset.id

			const selectedAccessoryLi = document.getElementById(
				`selected-acc-${accessoryId}`
			)
			if (selectedAccessoryLi) {
				orderSummaryList.removeChild(selectedAccessoryLi)
			}
			event.target.textContent = "+"
			event.target.classList.replace("remove-btn", "add-btn")
			event.target.parentNode.classList.remove("selected-acc")
		}
	})
}

function renderOrderSummary() {
	orderSummaryList.innerHTML = ""

	const selectedCarModel = document.createElement("li")
	selectedCarModel.textContent = `${selectedCarData.brand} ${selectedCarData.model} | ${selectedCarData.price}€`
	orderSummaryList.appendChild(selectedCarModel)

	// Sprawdzamy, czy pole "fullName" jest uzupełnione
	const fullName = document.getElementById("fullname").value.trim()
	if (fullName) {
		const nameItem = document.createElement("li")
		nameItem.textContent = `Name: ${fullName}`
		orderSummaryList.appendChild(nameItem)
	}

	// Renderujemy wartości z formularza
	// Kod renderowania danych z formularza został tutaj pominięty

	// Obliczamy i dodajemy sumę Total Price
	// updateOrderSummary()
}
