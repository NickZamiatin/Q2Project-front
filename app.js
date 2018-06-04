


window.addEventListener('load', () => {
    console.log('ready')
    const baseUrl = 'http://localhost:3087/cookings'

    const newRecepi = () => {
        console.log('Display new recepi ')
        document.querySelector('#app').innerHTML = `
    <form>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" class="form-control"/>
        </div>
        <div class="form-group">
            <label for="year">Year</label>
            <input type="text" id="year" class="form-control"/>
        </div>

        <div class="form-group">
            <label for="director">Director</label>
            <input type="text" id="director" class="form-control"/>
        </div>
        <div class="form-group">
            <label for="rating">Rating</label>
            <input type="text" id="rating" class="form-control"/>
        </div>
        <div class="form-group">
            <label for="poster_url">Post URL</label>
            <input type="text" id="poster_url" class="form-control"/>
        </div>
        <button type="submit" class="btn btn-primery" id="create-movie">Create</button>
    </form>
    `
        document.querySelector('#create-movie').addEventListener('click', createMovie);
    }
})
