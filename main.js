$(document).ready(function(){

	//*****************************
	//Language Chart
	//*****************************

	var chart = new CanvasJS.Chart("chartContainer",{
		backgroundColor: "transparent",
		title:{
			text: "My Languages"
		},
		toolTip: {
			content: "{name}",
			fontSize: 20
		},
		data: [
		{
			type: "pie",
			indexLabelPlacement: "inside",
			indexLabelFontSize: 20,
			showInLegend: false,
			legendText: "{indexLabel}",
			dataPoints: [
				{y: 72, indexLabel: "HTML5", color: "#E44D26", name: "HTML"},
				{y: 72, indexLabel: "CSS3", color: "#3C99DC", name: "CSS"},
				{y: 72, indexLabel: "JS", color: "#F0DB4F", name: "Javascript"},
				{y: 72, indexLabel: "PHP", color: "#B0B3D6", name: "PHP"},
				{y: 72, indexLabel: "mySQL", color: "#00758F", name: "mySQL"}
			]
		}
		]
	});
	chart.render();

	//********************************
	// Scrolling Waypoints
	//********************************

	$('.basic-waypoint').waypoint(function(direction){
		$('.basic-waypoint').addClass('animate__fadeInLeft');
	}, {
		offset: ('50%')
	});

	$('.icon-waypoint').waypoint(function(direction){
		$('.icon-waypoint').addClass('animate__fadeIn');
	}, {
		offset: ('50%')
	});

	$('.icon-p-waypoint').waypoint(function(direction){
		$('.icon-p-waypoint').addClass('animate__fadeInUp');
	}, {
		offset: ('70%')
	});

	$('.me-l-waypoint').waypoint(function(direction){
		$('.me-l-waypoint').addClass('animate__fadeInLeft');
	}, {
		offset:('70%')
	});

	$('.me-r-waypoint').waypoint(function(direction){
		$('.me-r-waypoint').addClass('animate__fadeInRight');
	}, {
		offset:('70%')
	});

	$('.portfolio-waypoint').waypoint(function(direction){
		$('.portfolio-waypoint').addClass('animate__fadeInLeft');
	}, {
		offset:('50%')
	});

	$('.portfolio-project-waypoint').waypoint(function(direction){
		$('.portfolio-project-waypoint').addClass('animate__fadeIn');
	}, {
		offset:('50%')
	});

	$('.nav-waypoint').waypoint(function(direction){
		$('.nav-waypoint').addClass('sticky-top');
	});


	//***************************
	// Contact Form
	//***************************

	document.getElementById('status').innerHTML = "Sending...";
	formData = {
	'name'     : $('input[name=name]').val(),
	'email'    : $('input[name=email]').val(),
	'subject'  : $('input[name=subject]').val(),
	'message'  : $('textarea[name=message]').val()
	};


	$.ajax({
		url : "mail.php",
		type: "POST",
		data : formData,
		success: function(data, textStatus, jqXHR)
		{

			$('#status').text(data.message);
			if (data.code) //If mail was sent successfully, reset the form.
			$('#contact-form').closest('form').find("input[type=text], textarea").val("");
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			$('#status').text(jqXHR);
		}
	});

});


function validateForm() {
  var name =  document.getElementById('name').value;
  if (name == "") {
      document.querySelector('.status').innerHTML = "Name cannot be empty";
      //$('.contact-container').addClass('animate__shakeX');
      animateCSS('.contact-container', 'shakeX');
      return false;
  }
  var email =  document.getElementById('email').value;
  if (email == "") {
      document.querySelector('.status').innerHTML = "Email cannot be empty";
      animateCSS('.contact-container', 'shakeX');
      return false;
  } else {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(email)){
          document.querySelector('.status').innerHTML = "Email format invalid";
          animateCSS('.contact-container', 'shakeX');
          return false;
      }
  }
  var subject =  document.getElementById('subject').value;
  if (subject == "") {
      document.querySelector('.status').innerHTML = "Subject cannot be empty";
      animateCSS('.contact-container', 'shakeX');
      return false;
  }
  var message =  document.getElementById('message').value;
  if (message == "") {
      document.querySelector('.status').innerHTML = "Message cannot be empty";
      animateCSS('.contact-container', 'shakeX');
      return false;
  }
  document.querySelector('.status').innerHTML = "Sending...";
}


//***************************
// Add animation, then remove after animation ends
//***************************
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });