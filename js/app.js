function getAll(url, entity) {
  fetch(url + '/' + entity)
    .then(response => response.json())
    .then((data) => {
      fetch('/template/list/' + entity + '.html')
        .then((response) => response.text())
        .then((template) => {
          let rendered = Mustache.render(template, data);
          document.getElementById('content').innerHTML = rendered;
        });
    })
}

function getById(query, url, entity) {
  fetch(url + '/' + entity + '/' + query.id)
    .then(response => response.json())
    .then((data) => {
      fetch('/template/detail/' + entity + '.html')
        .then((response) => response.text())
        .then((template) => {
          let rendered = Mustache.render(template, data);
          document.getElementById('content').innerHTML = rendered;
        });
    })
}

function home() {
  fetch('/template/home.html')
    .then((response) => response.text())
    .then((template) => {
      let rendered = Mustache.render(template, {});
      document.getElementById('content').innerHTML = rendered;
    });
}

const moviesApi = "https://tarea5-distribuidos-backend.netlify.app/.netlify/functions";
const directorsApi = "https://tarea5-distribuidos-backend.netlify.app/.netlify/functions";
const producersApi = "https://tarea5-distribuidos-backend.netlify.app/.netlify/functions";

function init() {
  const router = new Navigo('/', {
    hash: true
  });
  router.on({
    '/movies': () => {
      getAll(moviesApi, 'movies');
    },
    '/directors': () => {
      getAll(directorsApi, 'directors');
    },
    '/producers': () => {
      getAll(producersApi, 'producers');
    },
    '/movieById/:id': ({ data, params, queryString }) => {
      getById(data, moviesApi, 'movies');
    },
    '/directorById/:id': ({ data, params, queryString }) => {
      getById(data, directorsApi, 'directors');
    },
    '/producerById/:id': ({ data, params, queryString }) => {
      getById(data, producersApi, 'producers');
    }
  });
  router.on(() => home());
  router.resolve();
}

window.onload = function () {
  init();
};