const columns = document.querySelectorAll('.column')

setColors(true);

document.addEventListener('keydown', event => {
	event.preventDefault()
	if (event.code.toLowerCase() === 'space') {
		setColors()
	}
})

document.addEventListener('click', event => {
	const type = event.target.dataset.type

	if (type === 'lock') {
		const node = event.target.tagName.toLowerCase() === 'i'
			? event.target
			: event.target.children[0]
		
		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type === 'copy') {
		const text = event.target.textContent
		copyToClickboard(text.toUpperCase())
	}
})


function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split('-')
			.map(color => '#' + color)
	}
	return []
}

function updateColorsHash(colors = []) {
	document.location.hash = colors.map(color => color.toString().substring(1)).join('-')
}	

function copyToClickboard(text) {
	return navigator.clipboard.writeText(text)
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.5 ? 'black' : 'white'
}

// function generateColor() {
// 	const hexCodes = '0123456789ABCDEF'
	
// 	let color = ''
// 	for (let i = 0; i < 6; i++){
// 		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
// 	}
// 	return '#' + color
// }

function setColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : []

	columns.forEach((column, index) => {
		const isLocked = column.querySelector('i').classList.contains('fa-lock')
		const text = column.querySelector('h2')
		const button = column.querySelector('button')

		if (isLocked) {
			colors.push(text.textContent)
			return
		}

		const color = isInitial
			? colors[index]
				? colors[index]
				: chroma.random()
			: chroma.random()

		if (!isInitial) {
			colors.push(color)
		}
		
		
		text.textContent = color
		column.style.background = color

		setTextColor(text, color)
		setTextColor(button, color)
	})

	updateColorsHash(colors)
}
