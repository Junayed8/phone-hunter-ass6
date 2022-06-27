 const searchField= document.getElementById('search-field');
 const phoneDetails= document.getElementById('phone-details');

//  loading data from api....//

const loadData= phoneName => {
 const url= `
 https://openapi.programming-hero.com/api/phones?search=${phoneName}
 `;
 fetch(url)
 .then(res=> res.json())
 .then(data=> displaySearchResults(data));
}
loadData();

// display search results..//
const displaySearchResults= data=> {
  const cardContainer= document.getElementById('card-container');
  // no item message...//
  if(data.status==false){
    const noItem= document.createElement('h3');
    noItem.innerText='No Item Available';
    cardContainer.appendChild(noItem);
  }
  // showing item..//
  else{
    const phones= data.data;
    phones.forEach(phone => {
      const item = phones.indexOf(phone);
      // first 20 results..//
      if(item< 20){
        const resultCard= document.createElement('div');
        resultCard.classList.add('col-12');
        resultCard.classList.add('col-lg-4');
        resultCard.innerHTML=`
        <div class="card">
               <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">Brand:${phone.brand}.</p>
              <a onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">More info</a>
          </div>
       </div>
        `;
        cardContainer.appendChild(resultCard);
      }
    });
  }
}
// More info about phone..//
const loadPhoneDetails= slug=>{
  const url=`
  https://openapi.programming-hero.com/api/phone/${slug}
  `;
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhoneDetails(data));
}

// ..displaying more details...//
const displayPhoneDetails= (data) => {
 
  phoneDetails.innerHTML='';
  phoneDetails.innerHTML=`
  <div class="card text-center">
      <div class="card-header">${data.data.brand}
      </div>

      <div class="card-body">
        <h5 class="card-title">${data.data.name}</h5>
        <img class="mb-2" src='${data.data.image}'>
        <h6>Hardwire info</h6>
        <hr>
        <p> Chipset: ${data.data.mainFeatures.chipset}</p>  
        <p> Display: ${data.data.mainFeatures.displaySize}</p>  
        <p> Memory: ${data.data.mainFeatures.memory}</p>  
        <p> Storage: ${data.data.mainFeatures.storage}</p>
        <hr>
        <h6>Others Features</h6>
        <p>WLAN:${data.data.others.WLAN}</p>
        <p>Bluetooth:${data.data.others.Bluetooth}</p>
        <p>GPS:${data.data.others.GPS}</p>
        <p>Radio:${data.data.others.Radio}</p>
      </div> 
  </div>   

  `;
}

// Button handler..//
const searchBtn= document.getElementById('search-button');
searchBtn.addEventListener('click',()=>{
  phoneDetails.innerHTML='';
  const phoneName= searchField.value;
  loadData(phoneName);
});