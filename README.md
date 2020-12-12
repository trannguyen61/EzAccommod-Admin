# Nuxt-Vuetify App Boilerplate

## Folder structure

| Folder name        | Children           | Goal  |
| ------------- |:-------------:| -----:|
| /api     | apiUrl | API URL |
|       | /services      | Return Axios evocation. Services are loaded in Nuxt as plugins (see more at /plugins/services.js). |
| /assets | /scss      |    |
|  | /images      |    |
| /consts | consts      |    |
| /components | .vue      |  Vue component  |
| /helpers | ApiHandler      |  Builder handling API calls.  |
|  | CustomError      |  Throw custom error while handling API response to be catched by ApiHandler.  |
|  | ResponseHelper      |  Builder handling API responses.   |
| /layouts | .vue      |  Nuxt layout. Contains views.  |
| /pages | .vue      | View. Rendered inside layout.   |
| /plugins |    |  Plugins run before instantiating Vue root. Plugins are declared inside nuxt.config.js  |
| /static |       |     |
| /store |      | Vuex   |

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
