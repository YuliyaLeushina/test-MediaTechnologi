// выпадающее меню
const el = document.querySelectorAll('.menu__item');

el.forEach((item) => {
    item.addEventListener('mouseenter', function(){
        if(this.children.length > 1){
            this.children[1].classList.add('_show-header-el');
            this.classList.add('_red');
        } else{
            return false;
        }
    });
    item.addEventListener('mouseleave',function(){
        if(this.children.length > 1){
            this.children[1].classList.remove('_show-header-el')
            this.classList.remove('_red');
        }
    });
})
// смена города в хедере
const locations = document.querySelector('.header__link-locations');
const radioGroup = document.querySelectorAll('.radio__group');


for (const input of radioGroup){
    input.addEventListener('input', function(){
        locations.textContent = input.textContent;
    })
}
//Фильтр
let input, filter;
    input = document.getElementById('myInput');


  input.addEventListener('input', function(){
    if(input.value || input.value === '') {
        filterCity(input.value);
    }
  })

function filterCity(value) {
    radioGroup.forEach((city) => {

        filter = value.toUpperCase();

        if (city.textContent.toUpperCase().indexOf(filter) > -1) {
            city.style.display = "";
        } else {
            city.style.display = "none";
        }
    })
}
// поиск города по апи

const apiBtn = document.querySelector('.popup__btn-location');

  apiBtn.addEventListener('click', function(){
      var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
      var token = "1f0c02c89314eb1ce03256887629fe1515ecf7a6";
      var query = "46.226.227.20";

      var options = {
          method: "GET",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": "Token " + token
          }
      }

      fetch(url + query, options)
          .then((response) => response.json())
          .then(result => {
              if(result){
                  input.value = result.location.data.city;
                  filterCity(input.value);
              }

          })
          .catch(error => console.log("error", error));
  })
