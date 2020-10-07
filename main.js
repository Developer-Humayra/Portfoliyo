/*
Yes I let everyone see my firebase credentials, why did you asked?
*/
var config = {
	apiKey: "AIzaSyAx-GMJnaEZeslT7eOUg5cJexbhCN5caUw",
	authDomain: "messages-93ae7.firebaseapp.com",
	databaseURL: "https://messages-93ae7.firebaseio.com",
	projectId: "messages-93ae7",
	storageBucket: "messages-93ae7.appspot.com",
	messagingSenderId: "746022405342",
	appId: "1:746022405342:web:78d3e415ceb85195e82e4f"
}
firebase.initializeApp(config)

var messagesRef = firebase.database().ref('messages')





function addObserver(el, ops) {
	var observer = new IntersectionObserver(function (entries, observer) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
				observer.unobserve(entry.target);
			}
		});
	}, ops);
	observer.observe(el);
}

function onScroll(selector, ops = { rootMargin: "0px 0px -100px 0px" }) {
	var els = document.querySelectorAll(selector);
	for (var i = 0; i < els.length; i++) {
		var el = els[i];
		if (!('IntersectionObserver' in window)) {
			el.classList.add('active')
			continue
		}
		addObserver(el, ops);
	}
}

function $(v) {
	return document.querySelector(v)
}



var projectsContainer = $('.projects')
for (var i = 0; i < projects.length; i++) {
	var p = projects[i]
	projectsContainer.innerHTML += '<div class="project scroll-reveal"><div class="content-box" style="background-image: url(\'images/projects/' + p.img + '\')"><div class="content"><p>' + p.desc + '</p></div></div><a href="' + p.link + '" target="_blank" class="btn primary block tile">visit site</a></div>'
}



var submitBtn = $('#send');
var uid = $('#uid');
var email = $('#email');
var msg = $('#msg');
var err = $('.form-err');
submitBtn.onclick = function () {
	if (!uid.value.trim() || !email.value.trim() || !msg.value.trim()) {
		err.innerText = "Fill in all fields"
		return
	}
	err.innerText = ""
	this.innerHTML = '<i class="fas fa-spinner"></i>'
	saveMessage(uid.value.trim(), email.value.trim(), msg.value.trim());
	this.innerHTML = 'sent <i class="fas fa-check"></i>'
	uid.value = ""
	email.value = ""
	msg.value = ""
	setTimeout(function () {
		submitBtn.innerHTML = 'Submit'
	}, 1000)
}


function saveMessage(uid, email, msg) {
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		uid: uid,
		email: email,
		msg: msg
	})
}


window.addEventListener('DOMContentLoaded', function () {
	onScroll('.scroll-reveal');

	initCubeSlider({
		el: '.recipe-slider',
		slides: ["projects/main/recipe/1.jpg", "projects/main/recipe/2.jpg", "projects/main/recipe/3.jpg", "projects/main/recipe/4.jpg", "projects/main/recipe/5.jpg", "projects/main/recipe/6.jpg"],
		controls: true,
		row: 3,
		col: 2,
		size: 30,
		unit: '%',
		interval: 3500
	})
	initCubeSlider({
		el: '.quiz-slider',
		size: 30,
		unit: '%',
		slides: ["main/quiz/1.jpg", "projects/main/quiz/2.jpg", "projects/main/quiz/3.jpg", "projects/main/quiz/4.jpg", "projects/main/quiz/5.jpg", "images/projects/main/quiz/6.jpg"],
		controls: true,
		interval: 3000
	})
	initCubeSlider({
		el: '.diary-slider',
		slides: ["main/diary/1.jpg", "projects/main/diary/2.jpg", "projects/main/diary/3.jpg", "projects/main/diary/4.jpg", "projects/main/diary/5.jpg", "images/projects/main/diary/6.jpg"],
		row: 1,
		col: 1,
		size: 300,
		transition: 500,
	})

	setTimeout(function () {
		document.body.removeChild($('#loader'))
	}, 500)
})