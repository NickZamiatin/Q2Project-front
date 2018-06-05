window.addEventListener('load', () => {
    console.log('ready')
    const baseUrl = 'http://localhost:3087/cookings'

    const newRecepi = () => {
        console.log('return add button ')
        
    }


    const allRecepi = () => {
        document.querySelector('#app').innerHTML = `
          <div class="container">
              <div id="buttons">
                  <button type="button" class="btn btn-outline-warning btn-lg id="new_recepi">ADD</button>
              </div>
          </div>
          <div class="row">
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
                cookings.data.forEach(cooking => {
                    const trEl = document.createElement('tr');
                    trEl.innerHTML = ` <th scope="row">
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
                                    <button type="button" class="btn btn-outline-warning"> add</button>
                                    <button type="button" class="btn btn-outline-warning">delete </button>
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

    const showCooking = () => {
        console.log('return show')
    }
    const editCooking = () => {
        console.log('return edit')
    }
    const deleteCooking = () => {
        console.log('return deelte')
    }

    document.querySelector('#app').addEventListener('click', allRecepi)
    allRecepi();

})