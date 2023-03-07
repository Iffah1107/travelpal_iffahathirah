function searchMeal() {
  // Get the user input for the meal name
  const mealName = document.getElementById('meal-name').value;

  // Make a request to the search endpoint of the API with the user input as the query parameter
  const request = new XMLHttpRequest();
  request.open('GET', `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  request.onload = function () {
    // Check if the request was successful (status code 200)
    if (request.status === 200) {
      // Get the JSON data from the response
      const data = JSON.parse(request.responseText);

      // Check if any meals were found
      if (data.meals) {
        // Extract the information you need from the data
        const mealName = data.meals[0].strMeal;
        const mealCategory = data.meals[0].strCategory;
        const mealInstructions = data.meals[0].strInstructions;
        const mealImageURL = data.meals[0].strMealThumb;
        const mealYoutube = data.meals[0].strYoutube;
        const mealEmbedLink = mealYoutube.replace("watch?v=", "embed/");

        /*const videoSrc = data.meals[0].strYoutube.replace('watch?v=', 'embed/');
        const video = document.createElement('iframe');
        video.src = videoSrc;
        document.body.appendChild(video);*/

        // Get the list of all the ingredients for the meal
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = data.meals[0][`strIngredient${i}`];
          if (ingredient) {
            const measure = data.meals[0][`strMeasure${i}`];
            ingredients.push(`${ingredient} (${measure})`);
          } else {
            break;
          }
        }
        //  <h2 style="font-weight: bolder">${mealName}</h2>
        // Create HTML elements to display the information and the image
        const mealInfo = document.getElementById('meal-info');
        mealInfo.innerHTML = `
                <br>
                <div class="border" class="col-sm-4">
                <br>
                <p style="font-weight: bolder">Category: ${mealCategory}</p>
                <br>
                <p style="font-weight: bolder"> Instructions: </p>
                <p style="font-weight: bolder">${mealInstructions}</p>
                <p style="font-weight: bolder">Ingredients :</p>
                <p style="font-weight: bolder"> ${ingredients.join(', ')}</p>
                </div>
                <br>
                <div class="border" >
                <p style="font-weight: bolder"> Youtube Tutorial: </p>
                <iframe width="460" height="215" src="https://www.youtube.com/embed/${mealEmbedLink.slice(-11)}" frameborder="0" allowfullscreen></iframe>
                <p style="font-weight: bolder"> Image : </p>
                <img style="width:30%" height="20%" src="${mealImageURL}">  
                </div>
         
                `;

      } else {
        // If no meals were found, display an error message
        const mealInfo = document.getElementById('meal-info');
        mealInfo.innerHTML = '<p>No meals found with that name</p>';
      }
    } else {
      // If the request was not successful, display an error message
      const mealInfo = document.getElementById('meal-info');
      mealInfo.innerHTML = `<p>Error fetching data from API: ${request.statusText}</p>`;
    }
  };
  request.onerror = function () {
    // If the request failed, display an error message
    const mealInfo = document.getElementById('meal-info');
    mealInfo.innerHTML = '<p>Error fetching data from API</p>';
  };
  request.send();
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}