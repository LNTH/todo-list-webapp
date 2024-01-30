const icons = ['pool', 'smoking_rooms', 'accessibility', 'wc', 'room_service']
const colors = ['red', 'green', 'blue', 'orange', 'purple']

let currentIconIdx = 0
const iconElement = document.querySelector('#insert_desc_icon')

function animateIcon() {

    if (currentIconIdx >= icons.length) {
        currentIconIdx = 0
    } else {
        currentIconIdx += 1
    }
    
    iconElement.textContent = icons[currentIconIdx]
    iconElement.style.color = colors[currentIconIdx]
}

setInterval(animateIcon, 500)
