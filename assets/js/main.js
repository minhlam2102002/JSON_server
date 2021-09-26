const listCourse = document.querySelector('#list-courses')
const courseAPI = 'http://localhost:3000/courses'
const createBtn = document.querySelector('#create')

function start() {
    getCourse(renderCourse)
    handleCreateForm()
}

start()

function getCourse(callback) {
    fetch(courseAPI)
    .then(function(response) {
        return response.json()
    })
    .then(callback) 
}

function handlePostCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseAPI, options)
        .then(function(response) {
            return response.json() 
        })
        .then(function(data) {
            listCourse.innerHTML += createCourseHTML(data)
        }) 
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(courseAPI + '/' + id, options)
        .then(function(response) {
            return response.json() 
        })
        .then(function() {
            const courseItem =document.querySelector('.course-item-' + id)
            if(courseItem) {
                courseItem.remove()
            }
        }) 
}

function createCourseHTML(course) {
    return `
    <li class="course-item-${course.id}">
        <h4>${course.name}</h4>
        <p>${course.description}</p>
        <button onclick="handleDeleteCourse(${course.id})">Delete</button>
    </li>
    `
}

function renderCourse(courses) {
    var htmls = courses.map(function(course) {
        return createCourseHTML(course)
    })
    listCourse.innerHTML = htmls.join('') 
}

function handleCreateForm() {
    createBtn.onclick = function() {
        const name = document.querySelector('input[name="name"').value
        const description = document.querySelector('input[name="description"').value

        const formData = {
            name,
            description
        }
        handlePostCourse(formData)
    }
}