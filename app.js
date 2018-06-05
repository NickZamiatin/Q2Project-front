window.addEventListener('load', () => {
    console.log('ready')
    const baseUrl = 'http://localhost:3087/cooking'

    const createRecepi = () => {
        event.preventDefault();
        const name = document.querySelector('#name').value;
        const ingredients = document.querySelector('#ingredients').value;
        const preparation_time = document.querySelector('#preparation_time').value;
        const country = document.querySelector('#country').value;
        const cooking_img_url = document.querySelector('#cooking_img_url').value;
        const gluten_free = document.querySelector('#gluten_free').value;
        axios.post(baseUrl, {
                name,
                ingredients,
                preparation_time,
                country,
                cooking_img_url,
                gluten_free
            })
            .then(result => {
                showCooking(result.data)
            })
            .catch(error => {
                console.error(error)
            })

    }



    const newRecepi = () => {
        console.log('return add button ')
        // document.querySelector('#main-container').innerHTML = ""
        document.querySelector('#app').innerHTML = `
                         <div class="input">

                         <button  class="btn btn-outline-warning btn-lg" type="submit" id='main-page' >Main page </button>
                         <br/>
                         <br/>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="btn btn-warning" id="inputGroup-sizing-default" >Name</span>
                        </div>
                        <input type="text" id="name" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                        <div class="input-group-prepend">
                            <span class="btn btn-warning" id="inputGroup-sizing-default" >Ingredients</span>
                        </div>
                        <input type="text" id="ingredients" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="btn btn-warning" id="inputGroup-sizing-default"  >Prep time</span>
                        </div>
                        <input type="text"  id="preparation_time" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                        <div class="input-group-prepend">
                            <span class="btn btn-warning" id="inputGroup-sizing-default" >Country</span>
                        </div>
                        <input type="text"  id="country" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="btn btn-warning" id="inputGroup-sizing-default" >Gluten free</span>
                        </div>
                        <input type="text" id="gluten_free" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                        <div class="input-group-prepend">
                            <span class="btn btn-warning" id="inputGroup-sizing-default">URL</span>
                        </div>
                        <input type="text"  id="cooking_img_url" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <button  class="btn btn-outline-warning btn-lg" type="submit"  id="create-recepi">Create</button>
                </div>
         `;
        document.querySelector('#main-page').addEventListener('click', allRecepi)

        document.querySelector('#create-recepi').addEventListener('click', createRecepi);
    }


    const allRecepi = () => {
        document.querySelector('#app').innerHTML = `
          <div class="container">
              <div id="buttons">
                  <button type="button" class="btn btn-outline-warning btn-lg" id="new_recepi">ADD</button>
              </div>
          </div>
          <div class="row" id="main-container">
              <div class="col-12">
                  <table class="table table-hover table-dark">
                      <div class="zagolovok">
                          <thead>
                              <tr>
                                  <th scope="col"></th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Ingredients</th>
                                  <th scope="col">Prep time</th>
                                  <th scope="col">Country</th>
                                  <th scope="col">Gluten free</th>
                                  <th scope="col"> Action</th>

                              </tr>
                          </thead>
                           <tbody id="recepi-tbody">
                    </tbody>
                      </div>
        `;
        document.querySelector('#new_recepi').addEventListener('click', newRecepi)
        axios.get(baseUrl)
            .then(cookings => {
                console.log('Response array first item', cookings.data[0]);
                cookings.data.forEach(cooking => {
                    const trEl = document.createElement('tr');
                    trEl.innerHTML = ` <th scope="row"  >
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                                        <label class="form-check-label" for="inlineCheckbox1"></label>
                                    </div>
                                </th>
                                <td>
                                    <button type="button" class="btn btn-warning" id=show-${cooking.id}>${cooking.name}</button>
                                </td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button id="btnGroupDrop1" type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Show all ingredients
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                            <p class="dropdown-item" href="#">${cooking.ingredients}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-warning">${cooking.preparation_time}</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-warning">${cooking.country}</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-warning">${cooking.gluten_free}</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-outline-warning" id=edit-${cooking.id}> add</button>
                                    <button type="button" class="btn btn-outline-warning" id=delete-${cooking.id}>delete </button>
                                </td>`;
                    document.querySelector('#recepi-tbody').appendChild(trEl);
                    document.querySelector(`#show-${cooking.id}`).addEventListener('click', () => {
                        showCooking(cooking);
                    })
                    document.querySelector(`#edit-${cooking.id}`).addEventListener('click', () => {
                        editCooking(cooking);
                    })
                    document.querySelector(`#delete-${cooking.id}`).addEventListener('click', () => {
                        deleteCooking(cooking.id);
                    })
                });
            })
            .catch(error => {
                console.error(error)
            });
    }

    const showCooking = cooking => {
        console.log('return show')
        document.querySelector('#app').innerHTML = `        
        <div class="container">
                <div class="row justify-content-md-center">
                    <div class="row">
                        <div class="col" id="home-butt">
                            <button class="btn btn-outline-warning btn-lg" type="submit" id='main-page'>Main page </button>
                        </div>
                        <br>
                        <br>
                    </div>
                    <div class="row">
                        <div class="col" id="img-show">
                            <img src="${cooking.cooking_img_url}/&w=1050&q=560"
                                alt="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col" id="information">
                            <div class="card border-warning lg-3" style="max-width: 38rem;">
                                <div class="card-header">${cooking.name}}</div>
                                <div class="card-body text-warning">
                                    <h5 class="card-title">Ingredients : ${cooking.ingredients} </h5>
                                    <h5 class="card-title">Prep time : ${cooking.preparation_time}</h5>
                                    <h5 class="card-title"> Country : ${cooking.country}</h5>
                                    <h5 class="card-title">Gluten free : ${cooking.gluten_free}</h5>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                

            </div>`;
             document.querySelector('#main-page').addEventListener('click', allRecepi)
    }
    const editCooking = () => {
        console.log('return edit')
    }
    const deleteCooking = id => {
        console.log('delete move', id)
        axios.delete(`${baseUrl}/${id}`)
            .then(result => {
                allRecepi();
            })
            .catch(error => {
                console.error(error);
            })
    }

    allRecepi();

})